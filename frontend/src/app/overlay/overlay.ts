import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  imports: [],
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss',
})
export class Overlay implements OnInit {
  ngOnInit(): void {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Incoming webhook data:', data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
}
