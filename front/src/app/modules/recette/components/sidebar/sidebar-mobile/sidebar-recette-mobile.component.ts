import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-recette-mobile',
  templateUrl: './sidebar-recette-mobile.component.html',
  styleUrls: ['./sidebar-recette-mobile.component.scss']
})
export class SidebarRecetteMobileComponent {

  @Input() categoriesSelected: number[];
  @Output() categoriesSelectedChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() alimentsId: number[];
  @Output() alimentsIdChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() seulementLesAliments: boolean = false;
  @Output() seulementLesAlimentsChange:  EventEmitter<boolean> = new EventEmitter<boolean>();
  
  activateSidebar: boolean;
  @Input() loggedIn:boolean;

  constructor() { }

  categoriesSelectedFonction(categoriesSelected){
    this.categoriesSelectedChange.emit(categoriesSelected);
  };

  seulementLesAlimentsFonction(seulementLesAliments){
    this.seulementLesAlimentsChange.emit(seulementLesAliments);
  };

  alimentsIdFonction(alimentsId){
    this.alimentsIdChange.emit(alimentsId);
  }

  openSidebarMobile() {
    this.activateSidebar = true;
  }
  closeSidebarMobile() {
    this.activateSidebar = false;
  }
  
}
