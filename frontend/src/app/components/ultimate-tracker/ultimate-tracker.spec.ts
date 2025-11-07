import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimateTracker } from './ultimate-tracker';

describe('UltimateTracker', () => {
  let component: UltimateTracker;
  let fixture: ComponentFixture<UltimateTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimateTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimateTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
