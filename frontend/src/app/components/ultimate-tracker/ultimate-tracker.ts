import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ultimate-tracker',
  imports: [],
  templateUrl: './ultimate-tracker.html',
  styleUrl: './ultimate-tracker.scss',
})
export class UltimateTracker {
  @Input() player: any;

  getArcSegments(): any[] {
    const gapSize = 0.08; // Constant gap size (8% of circle circumference)
    const totalGapSpace = this.player.maxUltPoints * gapSize;

    // Ensure we don't exceed total available space
    if (totalGapSpace >= 1) {
      return [];
    }

    const totalDashSpace = 1 - totalGapSpace;
    const dashSize = totalDashSpace / this.player.maxUltPoints;
    const segmentSpacing = dashSize + gapSize; // Total space per segment

    const segments = [];
    for (let i = 0; i < this.player.maxUltPoints; i++) {
      const isColored = i < this.player.currUltPoints;

      segments.push({
        color: isColored ? '#fff' : '#000', // Red for segments starting from top, purple for rest
        dashArray: `${dashSize} ${1 - dashSize}`, // Show only the dash part
        dashOffset: -i * segmentSpacing - 0.78, // Position each segment correctly, starting from top center
      });
    }

    return segments;
  }

  getUltimate(agent: string) {
    return `/assets/ultimates/${agent}Ultimate.webp`;
  }
}
