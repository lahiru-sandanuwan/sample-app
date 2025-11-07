import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UltimateTracker } from '../ultimate-tracker/ultimate-tracker';

@Component({
  selector: 'app-player-card',
  imports: [CommonModule, UltimateTracker],
  templateUrl: './player-card.html',
  styleUrl: './player-card.scss',
})
export class PlayerCard {
  @Input() player: any;
  @Input() side: string = 'left';

  getAgentImage(agent: string) {
    return `/assets/agents/${agent}Icon.webp`;
  }

  getArmourImage(armour: string) {
    return `/assets/shields/${armour}.webp`;
  }

  getAbility1Image(agent: string) {
    return `/assets/ability1/${agent}Ability1.webp`;
  }

  getAbility2Image(agent: string) {
    return `/assets/ability2/${agent}Ability2.webp`;
  }

  getAbility3Image(agent: string) {
    return `/assets/grenades/${agent}Grenade.webp`;
  }

  getWeaponImage(weapon: string) {
    return `/assets/weapons/${weapon}Killfeed.webp`;
  }
}
