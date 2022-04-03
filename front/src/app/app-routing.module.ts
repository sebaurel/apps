import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from "./components/container/container.component";
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: ContainerComponent,
    children: [{ path: '', component: HomeComponent, outlet: 'connected' }]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
  
];

export const routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
