import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentaireComponent } from './components/commentaire/commentaire.component';
import { ContentTextComponent } from './components/content-text/content-text.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { PreviousRouteService } from './services/previous-route.service';
import { UrlPermission } from './jwtAuthorization/url.permission';
import { UtilisateurService } from './services/utilisateur.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwtAuthorization/jwt.interceptor';
import { ErrorInterceptor } from './jwtAuthorization/error.interceptor';
import { ConfirmationGuard } from './gards/confirmation.guard';
import { AuthService } from '../authentication/services/auth.service';



@NgModule({
  declarations: [
    PaginatorComponent,
    SpinnerComponent,
    CommentaireComponent,
    PhotoUploadComponent,
    ContentTextComponent
  ],
  exports:[
    PaginatorComponent,
    SpinnerComponent,
    CommentaireComponent,
    PhotoUploadComponent,
    ContentTextComponent,
  ],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    NgbModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
    PreviousRouteService,
    UrlPermission,
    UtilisateurService,
    { provide: AuthService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ConfirmationGuard,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
})
export class SharedComponentsModule { }
