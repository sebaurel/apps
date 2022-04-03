import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-recette-desktop',
  templateUrl: './sidebar-recette-desktop.component.html',
  styleUrls: ['./sidebar-recette-desktop.component.scss']
})
export class SidebarRecetteDesktopComponent{

  @Input() categoriesSelected: number[];
  @Output() categoriesSelectedChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() alimentsId: number[];
  @Output() alimentsIdChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() seulementLesAliments: boolean = false;
  @Output() seulementLesAlimentsChange:  EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() loggedIn:boolean;

  constructor() { }

  categoriesSelectedFonction(categoriesSelected: number[]){
    this.categoriesSelectedChange.emit(categoriesSelected);
  };

  seulementLesAlimentsFonction(seulementLesAliments: boolean){
    this.seulementLesAlimentsChange.emit(seulementLesAliments);
  };

  alimentsIdFonction(alimentsId: number[]){
    this.alimentsIdChange.emit(alimentsId);
  }
}
