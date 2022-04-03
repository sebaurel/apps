import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecettesComponent } from './components/recettes/recettes.component';
import { SidebarRecetteComponent } from './components/sidebar/sidebar-recette.component';
import { SidebarRecetteMobileComponent } from './components/sidebar/sidebar-mobile/sidebar-recette-mobile.component';
import { SidebarRecetteDesktopComponent } from './components/sidebar/sidebar-desktop/sidebar-recette-desktop.component';
import { RecetteFormComponent } from './components/recette-form/recette-form.component';
import { RecetteComponent } from './components/recette/recette.component';
import { PrintRecetteComponent } from './components/print-recette/print-recette.component';
import { AlimentFormComponent } from './components/aliment-form/aliment-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalAlimentComponent } from './components/modals/modal-aliment/modal-aliment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlimentViewComponent } from './components/modals/modal-aliment-view/modal-aliment-view.component';
import { ModalEtapesComponent } from './components/modals/modal-etapes/modal-etapes.component';
import { ModalFrigoComponent } from './components/modals/modal-frigo/modal-frigo.component';
import { ModalIngredientComponent } from './components/modals/modal-ingredient/modal-ingredient.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { RecetteRoutingModule } from './recette-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    RecettesComponent,
    RecetteComponent,
    SidebarRecetteComponent,
    SidebarRecetteMobileComponent,
    SidebarRecetteDesktopComponent,
    RecetteFormComponent,
    PrintRecetteComponent,
    AlimentFormComponent,
    ModalAlimentComponent,
    ModalAlimentViewComponent,
    ModalEtapesComponent,
    ModalFrigoComponent,
    ModalIngredientComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FontAwesomeModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    RecetteRoutingModule,
    NgxPaginationModule,
    DragDropModule
  ],
  exports:[
    ModalAlimentViewComponent
  ]
})
export class RecetteModule { }
