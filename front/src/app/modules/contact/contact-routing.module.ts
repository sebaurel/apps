import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContainerComponent,
    children: [{ path: '', component: ContactComponent, outlet: 'connected' }]
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
