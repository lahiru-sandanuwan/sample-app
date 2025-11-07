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
}
