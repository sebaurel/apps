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

import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { UrlPermission } from './jwtAuthorization/url.permission';
import { UtilisateurService } from './services/utilisateur.service';
import { PreviousRouteService } from './services/previous-route.service';
import { JwtInterceptor } from './jwtAuthorization/jwt.interceptor';
import { ConfirmationGuard } from './gards/confirmation.guard';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { HeaderComponent } from './components/container/header/header.component';
import { FooterComponent } from './components/container/footer/footer.component';
import { NavMobileComponent } from './components/container/header/navigation/nav-mobile/nav-mobile.component';
import { NavDesktopComponent } from './components/container/header/navigation/nav-desktop/nav-desktop.component';
import { ErrorInterceptor } from './jwtAuthorization/error.interceptor';
import { SidebarComponent } from './components/container/sidebar/sidebar.component';
import { SidebarMobileComponent } from './components/container/sidebar/sidebar-mobile/sidebar-mobile.component';
import { SidebarDesktopComponent } from './components/container/sidebar/sidebar-desktop/sidebar-desktop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuillModule  } from 'ngx-quill';

import { ArticleModule } from './modules/article/article.module';
import { RecetteModule } from './modules/recette/recette.module';
import { ContactModule } from './modules/contact/contact.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { NavigationComponent } from './components/container/header/navigation/navigation.component';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent, 
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    NavMobileComponent,
    NavDesktopComponent,
    SidebarComponent,
    SidebarMobileComponent,
    SidebarDesktopComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    routing,
    NgbModule,
    NgSelectModule, 
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    DragDropModule,
    FontAwesomeModule,
    //ContactModule,
    //ArticleModule,
    //RecetteModule,
    //AuthenticationModule
  ],
  providers: [
    PreviousRouteService,
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
