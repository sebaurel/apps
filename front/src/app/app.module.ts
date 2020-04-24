import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { routing} from './app-routing.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper'; 
import { MatIconModule } from '@angular/material/icon'; 
import { DragDropModule } from '@angular/cdk/drag-drop';

import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ContainerComponent } from './components/container/container.component';
import { AuthService } from './services/auth.service';
import { UrlPermission } from './jwtAuthorization/url.permission';
import { UtilisateurService } from './services/utilisateur.service';
import { PreviousRouteService } from './services/previous-route.service';
import { RecetteFormComponent } from './components/recette-form/recette-form.component';
import { JwtInterceptor } from './jwtAuthorization/jwt.interceptor';
import { RecetteComponent } from './components/recette/recette.component';
import { HomeComponent } from './components/home/home.component';
import { AlimentFormComponent } from './components/aliment-form/aliment-form.component';
import { FooterComponent } from './components/container/footer/footer.component';
import { RecettesComponent } from './components/recettes/recettes.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ModalAlimentComponent } from './components/modals/modal-aliment/modal-aliment.component';
import { ModalAlimentViewComponent } from './components/modals/modal-aliment-view/modal-aliment-view.component';
import { SpinnerComponent } from './components/transverse/spinner/spinner.component';
import { ModalFrigoComponent } from './components/modals/modal-frigo/modal-frigo.component';
import { ConfirmationGuard } from './gards/confirmation.guard';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { HeaderComponent } from './components/container/header/header.component';
import { NavigationComponent } from './components/container/header/navigation/navigation.component';
import { NavMobileComponent } from './components/container/header/navigation/nav-mobile/nav-mobile.component';
import { NavDesktopComponent } from './components/container/header/navigation/nav-desktop/nav-desktop.component';
import { ErrorInterceptor } from './jwtAuthorization/error.interceptor';
import { CommentaireComponent } from './components/commentaire/commentaire.component';
import { ModalCommentaireComponent } from './components/modals/modal-commentaire/modal-commentaire.component';
import { SidebarComponent } from './components/container/sidebar/sidebar.component';
import { SidebarMobileComponent } from './components/container/sidebar/sidebar-mobile/sidebar-mobile.component';
import { SidebarDesktopComponent } from './components/container/sidebar/sidebar-desktop/sidebar-desktop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalIngredientComponent } from './components/modals/modal-ingredient/modal-ingredient.component';
import { ModalEtapesComponent } from './components/modals/modal-etapes/modal-etapes.component';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
import { PhotoUploadComponent } from './components/transverse/photo-upload/photo-upload.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrintRecetteComponent } from './components/transverse/print-recette/print-recette.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ProfilFormComponent } from './components/profil-form/profil-form.component';
import { ModalMotdepassComponent } from './components/modals/modal-motdepass/modal-motdepass.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    RegisterComponent,
    ContainerComponent,
    RecetteFormComponent,
    RecetteComponent,
    HomeComponent,
    AlimentFormComponent,
    FooterComponent,
    RecettesComponent,
    PaginatorComponent,
    ModalAlimentComponent,
    ModalAlimentViewComponent,
    SpinnerComponent,
    ModalFrigoComponent,
    HeaderComponent,
    NavigationComponent,
    NavMobileComponent,
    NavDesktopComponent,
    CommentaireComponent,
    ModalCommentaireComponent,
    SidebarComponent,
    SidebarMobileComponent,
    SidebarDesktopComponent,
    ModalIngredientComponent,
    ModalEtapesComponent,
    RegisterConfirmComponent,
    PhotoUploadComponent,
    PrintRecetteComponent,
    ContactComponent,
    ProfilComponent,
    ProfilFormComponent,
    ModalMotdepassComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    routing,
    NgbModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    NgSelectModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    DragDropModule,
    FontAwesomeModule
  ],
  providers: [
    PreviousRouteService,
    AuthService,
    UrlPermission,
    UtilisateurService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ConfirmationGuard,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
