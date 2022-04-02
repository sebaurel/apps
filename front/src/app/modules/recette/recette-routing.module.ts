import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ConfirmationGuard } from 'src/app/gards/confirmation.guard';
import { UrlPermission } from 'src/app/jwtAuthorization/url.permission';
import { AlimentFormComponent } from './components/aliment-form/aliment-form.component';
import { PrintRecetteComponent } from './components/print-recette/print-recette.component';
import { RecetteFormComponent } from './components/recette-form/recette-form.component';
import { RecetteComponent } from './components/recette/recette.component';
import { RecettesComponent } from './components/recettes/recettes.component';

const routes: Routes = [
  
  {
    path: 'recettes',
    component: ContainerComponent,
    children: [{ path: '', component: RecettesComponent, outlet: 'connected' },],
  },
  
  {
    path: 'mesrecettes',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: RecettesComponent, outlet: 'connected' }]
  },
  {
    path: 'mesfavoris',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: RecettesComponent, outlet: 'connected' }]
  },
  {
    path: 'recette/edit/:id',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: RecetteFormComponent, canDeactivate: [ConfirmationGuard], outlet: 'connected' }]
  },
  {
    path: 'recette/new',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: RecetteFormComponent, canDeactivate: [ConfirmationGuard], outlet: 'connected' }]
  },
  {
    path: 'recette/aliment',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: AlimentFormComponent, outlet: 'connected' }]
  },
  {
    path: 'recette/:id',
    component: ContainerComponent,
    children: [{ path: '', component: RecetteComponent, outlet: 'connected' }]
  },
  { 
    path: 'print/:id',
    outlet: 'print',
    component: PrintRecetteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetteRoutingModule { }
