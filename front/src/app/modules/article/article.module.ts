import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleComponent } from './components/article/article.component';
import { SidebarArticleComponent } from './components/sidebar/sidebar-article.component';
import { SidebarArticleDesktopComponent } from './components/sidebar/sidebar-desktop/sidebar-article-desktop.component';
import { SidebarArticleMobileComponent } from './components/sidebar/sidebar-mobile/sidebar-article-mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedComponentsModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [
    SidebarArticleComponent,
    SidebarArticleMobileComponent,
    SidebarArticleDesktopComponent,
    ArticleFormComponent,
    ArticleComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    NgSelectModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class ArticleModule { }
