import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { faEdit, faHeart, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { EnumService } from 'src/app/services/enum.service';
import { environment } from 'src/environments/environment';
import { Categorie } from '../../models/categorie.model';
import { Aliment } from '../../models/aliment.model';
import { AlimentService } from '../../services/aliment.service';

@Component({
  selector: 'app-sidebar-recette',
  templateUrl: './sidebar-recette.component.html',
  styleUrls: ['./sidebar-recette.component.scss']
})
export class SidebarRecetteComponent implements OnInit {
  faSearch: IconDefinition = faSearch;
  pathUpload: string = environment.PATH_UPLOAD;
  photoPath: string = environment.PATH_UPLOAD + "default.png";
  @Input() loggedIn: boolean;
  @Input() inPageMesRecettes:boolean;

  @Input() categoriesSelected: number[];
  @Output() categoriesSelectedChange: EventEmitter<number[]> = new EventEmitter<number[]>();

  categories$: Observable<Categorie[]>;//  on recupere toutes les categories en base

  alimentsSelected: Aliment[] = new Array<Aliment>();
  @Input() alimentsId: number[];
  @Output() alimentsIdChange: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Input() seulementLesAliments: boolean = false;
  @Output() seulementLesAlimentsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() brouillons: boolean = false;
  @Output() brouillonsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  utiliserFrigo: boolean = false;
  frigoActifOk: string = "frigoNonActif";
  photoThumbPathFrigo: String = environment.PATH_UPLOAD + "default-aliment.png";


  constructor(
    private alimentService: AlimentService,
    private categorieService: EnumService
  ) {

    
  }

  ngOnInit() {    
    this.categories$ = this.categorieService.getCategories();
  }

  categorieChanged() {
    this.categoriesSelectedChange.emit(this.categoriesSelected);
  }

  FrigoChanged(aliments: Aliment[]) {
    this.alimentsSelected = aliments;
  }

  FrigoModalClose() {
    this.frigoActifOk = "frigoActif";
    this.alimentsId = [];
    this.alimentsSelected.forEach(aliment => {
      this.alimentsId.push(aliment.id);
    });
    this.alimentsIdChange.emit(this.alimentsId);
    this.utiliserFrigo = true;
  }

  seulementLesAlimentsChanged() {
    if (this.seulementLesAliments) this.seulementLesAliments = false;
    else this.seulementLesAliments = true; //permet de ne pas inverser la selection des le premier click
    this.seulementLesAlimentsChange.emit(this.seulementLesAliments);
  };

  brouillonsChanged() {
    if (this.brouillons) this.brouillons = false;
    else this.brouillons = true; //permet de ne pas inverser la selection des le premier click
    this.brouillonsChange.emit(this.brouillons);
  };

  FrigoSwitch() {
    //console.log("switch");
    this.alimentsId = [];
    if (!this.utiliserFrigo) {//lorsque l'on click sur la fonction, le frigo est à actif, il faut donc l'inverser
      this.utiliserFrigo = true;
      this.frigoActifOk = "frigoActif";
      this.alimentsSelected.forEach(aliment => {
        this.alimentsId.push(aliment.id);
      });
    } else {
      this.utiliserFrigo = false;
      this.frigoActifOk = "frigoNonActif";
    }
    this.alimentsIdChange.emit(this.alimentsId);
  }

  spliceAliment(aliment: Aliment) {
    this.alimentService.spliceAliment(aliment, this.alimentsSelected);
    this.FrigoModalClose();
  }

}


