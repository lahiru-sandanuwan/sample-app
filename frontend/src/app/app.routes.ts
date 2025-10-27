import { Routes } from '@angular/router';
import { Overlay } from './overlay/overlay';

export const routes: Routes = [
  { path: '', redirectTo: 'overlay', pathMatch: 'full' },
  { path: 'overlay', component: Overlay },
];
