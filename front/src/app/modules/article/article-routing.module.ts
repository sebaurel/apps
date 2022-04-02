import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ConfirmationGuard } from 'src/app/gards/confirmation.guard';
import { UrlPermission } from 'src/app/jwtAuthorization/url.permission';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleComponent } from './components/article/article.component';

const routes: Routes = [
  {
    path: 'article/new',
    component: ContainerComponent, canActivate: [UrlPermission],
    children: [{ path: '', component: ArticleFormComponent, canDeactivate: [ConfirmationGuard], outlet: 'connected' }]
  },
  {
    path: 'article/:id',
    component: ContainerComponent,
    children: [{ path: '', component: ArticleComponent, outlet: 'connected' }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
