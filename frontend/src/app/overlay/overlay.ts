import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCard } from '../components/player-card/player-card';

interface Player {
  name: string;
  health: number;
  weapon: string;
  agent: string;
  team: string;
  armour: string;
}

@Component({
  selector: 'app-overlay',
  imports: [CommonModule, PlayerCard],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss',
})
export class Overlay implements OnInit {
  arcCurves: number = 7; // Dynamic number of curves for the arc-ring
  coloredSegments: number = 3; // Number of segments to color differently

  leftPlayers: Player[] = [
    {
      name: 'Chronicle',
      health: 100,
      weapon: 'stinger',
      agent: 'Thorne',
      team: 'red',
      armour: 'Light',
    },
    {
      name: 'Kaajak',
      health: 100,
      weapon: 'sherif',
      agent: 'Stealth',
      team: 'red',
      armour: 'Heavy',
    },
    {
      name: 'Boaster',
      health: 69,
      weapon: 'stinger',
      agent: 'Wraith',
      team: 'red',
      armour: 'Regen',
    },
    { name: 'Alfajer', health: 25, weapon: 'classic', agent: 'Sprinter', team: 'red', armour: '' },
    {
      name: 'Crashies',
      health: 88,
      weapon: 'stinger',
      agent: 'BountyHunter',
      team: 'red',
      armour: 'Heavy',
    },
  ];

  rightPlayers: Player[] = [
    { name: 'bang', health: 33, weapon: 'vandal', agent: 'Wushu', team: 'green', armour: 'Heavy' },
    {
      name: 'Zellsis',
      health: 100,
      weapon: 'phantom',
      agent: 'Killjoy',
      team: 'green',
      armour: 'Light',
    },
    {
      name: 'zekken',
      health: 75,
      weapon: 'operator',
      agent: 'Clay',
      team: 'green',
      armour: 'Light',
    },
    {
      name: 'johnqt',
      health: 100,
      weapon: 'spectre',
      agent: 'Gumshoe',
      team: 'green',
      armour: 'Heavy',
    },
    { name: 'NARRATE', health: 10, weapon: 'classic', agent: 'Hunter', team: 'green', armour: '' },
  ];

  ngOnInit(): void {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Incoming webhook data:', data);
      // Update player data here if needed
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  getAgentImage(agent: string) {
    return `/agents/${agent}.webp`;
  }

  getArmourImage(armour: string) {
    return `/armour/${armour}.webp`;
  }

  getArcDashArray(): string {
    // Calculate dash array for dynamic number of curves with constant gaps
    const gapSize = 0.08; // Constant gap size (8% of circle circumference)
    const totalGapSpace = this.arcCurves * gapSize;

    // Ensure we don't exceed total available space
    if (totalGapSpace >= 1) {
      // If gaps would take all space, make minimal gaps
      return `0.01 ${gapSize}`;
    }

    const totalDashSpace = 1 - totalGapSpace;
    const dashSize = totalDashSpace / this.arcCurves;
    return `${dashSize} ${gapSize}`;
  }

  getArcSegments(): any[] {
    const gapSize = 0.08; // Constant gap size (8% of circle circumference)
    const totalGapSpace = this.arcCurves * gapSize;

    // Ensure we don't exceed total available space
    if (totalGapSpace >= 1) {
      return [];
    }

    const totalDashSpace = 1 - totalGapSpace;
    const dashSize = totalDashSpace / this.arcCurves;
    const segmentSpacing = dashSize + gapSize; // Total space per segment

    // Find which segment contains the top position (12 o'clock = 0.75 in normalized coords)
    const topPosition = 0.75;
    const topSegmentIndex = Math.floor(topPosition * this.arcCurves);

    const segments = [];
    for (let i = 0; i < this.arcCurves; i++) {
      // Calculate how many segments from the top this segment is
      const distanceFromTop = (i - topSegmentIndex + this.arcCurves) % this.arcCurves;
      const isColored = distanceFromTop < this.coloredSegments;

      segments.push({
        color: isColored ? '#ff6b6b' : '#6c5ce7', // Red for segments starting from top, purple for rest
        dashArray: `${dashSize} ${1 - dashSize}`, // Show only the dash part
        dashOffset: -i * segmentSpacing, // Position each segment correctly
      });
    }

    return segments;
  }
}
