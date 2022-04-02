import { NgModule } from '@angular/core';
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
    ContentTextComponent
  ],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    NgbModule,
    NgSelectModule,
    FormsModule
  ]
})
export class SharedComponentsModule { }
