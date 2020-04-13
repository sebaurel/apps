import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-desktop',
  templateUrl: './sidebar-desktop.component.html',
  styleUrls: ['./sidebar-desktop.component.scss']
})
export class SidebarDesktopComponent{

  @Input() categoriesSelected: number[];
  @Output() categoriesSelectedChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() alimentsId: number[];
  @Output() alimentsIdChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() seulementLesAliments: boolean = false;
  @Output() seulementLesAlimentsChange:  EventEmitter<boolean> = new EventEmitter<boolean>();

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
}
