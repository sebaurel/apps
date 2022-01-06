import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ContainerComponent } from "./components/container/container.component";
import { UrlPermission } from "./jwtAuthorization/url.permission";
import { ProfilFormComponent } from './components/profil-form/profil-form.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RecetteFormComponent } from './components/recette-form/recette-form.component';
import { RecettesComponent } from './components/recettes/recettes.component';
import { AlimentFormComponent } from './components/aliment-form/aliment-form.component';
import { HomeComponent } from './components/home/home.component';
import { RecetteComponent } from './components/recette/recette.component';
import { ConfirmationGuard } from './gards/confirmation.guard';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
import { PrintRecetteComponent } from './components/transverse/print-recette/print-recette.component';
import { ContactComponent } from './components/contact/contact.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleComponent } from './components/article/article.component';

export const routes: Routes = [

  { path: 'login',
    component: ContainerComponent,
    children: [{ path: '', component: LoginComponent, outlet: 'connected' }]
  },

  { path: 'registerconfirm/:tokenConfirmation', component: RegisterConfirmComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: ContainerComponent,
    children: [{ path: '', component: HomeComponent, outlet: 'connected' }]
  },
  {
    path: 'article/new',
    component: ContainerComponent,
    children: [{ path: '', component: ArticleFormComponent, canDeactivate: [ConfirmationGuard], outlet: 'connected' }]
  },
  {
    path: 'article/:id',
    component: ContainerComponent,
    children: [{ path: '', component: ArticleComponent, outlet: 'connected' }]
  },
  {
    path: 'recettes',
    component: ContainerComponent,
    children: [{ path: '', component: RecettesComponent, outlet: 'connected' },],
  },
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
    path: 'contact',
    component: ContainerComponent,
    children: [{ path: '', component: ContactComponent, outlet: 'connected' }]
  },  
  { 
    path: 'print/:id',
    outlet: 'print',
    component: PrintRecetteComponent
  },

// otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
