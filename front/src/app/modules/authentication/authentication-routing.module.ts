import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ConfirmationGuard } from 'src/app/gards/confirmation.guard';
import { UrlPermission } from 'src/app/jwtAuthorization/url.permission';
import { LoginComponent } from './components/login/login.component';
import { ProfilFormComponent } from './components/profil-form/profil-form.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login',
    component: ContainerComponent,
    children: [{ path: '', component: LoginComponent, outlet: 'connected' }]
  },

  { path: 'registerconfirm/:tokenConfirmation', component: RegisterConfirmComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'compte',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: ProfilFormComponent, canDeactivate: [ConfirmationGuard], outlet: 'connected' }]
  },
  {
    path: 'compte/:id',
    component: ContainerComponent,
    children: [{ path: '', component: ProfilComponent, outlet: 'connected' }]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
