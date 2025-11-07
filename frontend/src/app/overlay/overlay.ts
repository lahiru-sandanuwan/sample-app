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
  maxUltPoints: number;
  currUltPoints: number;
}

@Component({
  selector: 'app-overlay',
  imports: [CommonModule, PlayerCard],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss',
})
export class Overlay implements OnInit {
  LEFT = 'left';
  RIGHT = 'right';
  leftPlayers: Player[] = [
    {
      name: 'Chronicle',
      health: 100,
      weapon: 'Stinger',
      agent: 'Thorne',
      team: 'red',
      armour: 'Light',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
    {
      name: 'Kaajak',
      health: 100,
      weapon: 'Sheriff',
      agent: 'Stealth',
      team: 'red',
      armour: 'Heavy',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
    {
      name: 'Boaster',
      health: 69,
      weapon: 'Stinger',
      agent: 'Wraith',
      team: 'red',
      armour: 'Regen',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
    {
      name: 'Alfajer',
      health: 25,
      weapon: 'Classic',
      agent: 'Sprinter',
      team: 'red',
      armour: '',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
    {
      name: 'Crashies',
      health: 88,
      weapon: 'Stinger',
      agent: 'BountyHunter',
      team: 'red',
      armour: 'Heavy',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
  ];

  rightPlayers: Player[] = [
    {
      name: 'bang',
      health: 33,
      weapon: 'Vandal',
      agent: 'Wushu',
      team: 'green',
      armour: 'Heavy',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
    {
      name: 'Zellsis',
      health: 100,
      weapon: 'Phantom',
      agent: 'Killjoy',
      team: 'green',
      armour: 'Light',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
    {
      name: 'zekken',
      health: 75,
      weapon: 'Operator',
      agent: 'Clay',
      team: 'green',
      armour: 'Light',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
    {
      name: 'johnqt',
      health: 100,
      weapon: 'Spectre',
      agent: 'Gumshoe',
      team: 'green',
      armour: 'Heavy',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
    {
      name: 'NARRATE',
      health: 10,
      weapon: 'Classic',
      agent: 'Hunter',
      team: 'green',
      armour: '',
      maxUltPoints: Math.floor(Math.random() * 3) + 6,
      currUltPoints: Math.floor(Math.random() * 3) + 4,
    },
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
