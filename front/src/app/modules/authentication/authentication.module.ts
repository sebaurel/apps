import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilFormComponent } from './components/profil-form/profil-form.component';
import { ModalMotdepassComponent } from './modals/modal-motdepass/modal-motdepass.component';
import { ProfilComponent } from './components/profil/profil.component';
import { LoginComponent } from './components/login/login.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [
    RegisterConfirmComponent,
    RegisterComponent,
    ProfilFormComponent,
    ProfilComponent,
    LoginComponent,
    ModalMotdepassComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
