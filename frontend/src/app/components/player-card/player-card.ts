import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-card',
  imports: [CommonModule],
  templateUrl: './player-card.html',
  styleUrl: './player-card.scss',
})
export class PlayerCard {
  @Input() player: any;
  @Input() side: string = 'green';

  getAgentImage(agent: string) {
    return `/assets/agents/${agent}Icon.webp`;
  }

  getArmourImage(armour: string) {
    return `/assets/shields/${armour}.webp`;
  }
}
