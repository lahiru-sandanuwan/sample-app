import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss',
})
export class Overlay implements OnInit {
  leftPlayers: Player[] = [
    {
      name: 'Chronicle',
      health: 100,
      weapon: 'stinger',
      agent: 'cypher',
      team: 'red',
      armour: 'light',
    },
    { name: 'Kaajak', health: 100, weapon: 'sherif', agent: 'yoru', team: 'red', armour: 'heavy' },
    { name: 'Boaster', health: 69, weapon: 'stinger', agent: 'omen', team: 'red', armour: 'regen' },
    { name: 'Alfajer', health: 25, weapon: 'classic', agent: 'neon', team: 'red', armour: '' },
    {
      name: 'Crashies',
      health: 88,
      weapon: 'stinger',
      agent: 'fade',
      team: 'red',
      armour: 'heavy',
    },
  ];

  rightPlayers: Player[] = [
    { name: 'bang', health: 33, weapon: 'vandal', agent: 'jett', team: 'green', armour: 'heavy' },
    {
      name: 'Zellsis',
      health: 100,
      weapon: 'phantom',
      agent: 'killjoy',
      team: 'green',
      armour: 'light',
    },
    {
      name: 'zekken',
      health: 75,
      weapon: 'operator',
      agent: 'raze',
      team: 'green',
      armour: 'light',
    },
    {
      name: 'johnqt',
      health: 100,
      weapon: 'spectre',
      agent: 'cypher',
      team: 'green',
      armour: 'heavy',
    },
    { name: 'NARRATE', health: 10, weapon: 'classic', agent: 'sova', team: 'green', armour: '' },
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
