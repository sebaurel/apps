import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { faEdit, faHeart } from '@fortawesome/free-solid-svg-icons';


import { environment } from "../../../../environments/environment";
import { EnumService } from 'src/app/services/enum.service';
import { Categorie } from 'src/app/model/categorie.model';
import { Aliment } from 'src/app/model/aliment.model';
import { AlimentService } from 'src/app/services/aliment.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faEdit = faEdit;
  faHeart = faHeart;
  pathUpload: string = environment.PATH_UPLOAD;
  photoPath: string = environment.PATH_UPLOAD + "default.png";
  @Input() loggedIn: boolean;

  @Input() categoriesSelected: number[];
  @Output() categoriesSelectedChange: EventEmitter<number[]> = new EventEmitter<number[]>()

  categories$: Observable<Categorie>;// on recupere toutes les categories en base

  alimentsSelected : Aliment[] = new Array<Aliment>();
  aliments: Aliment[] = []; // on recupere tout les aliments en base trier
  @Input() alimentsId: number[];
  @Output() alimentsIdChange: EventEmitter<number[]> = new EventEmitter<number[]>()
  @Input() seulementLesAliments: boolean = false;
  @Output() seulementLesAlimentsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  utiliserFrigo: boolean = false;
  frigoActifOk: string = "frigoNonActif";
  photoThumbPathFrigo: String = environment.PATH_UPLOAD + "default-aliment.png";

  
  constructor(
    private alimentService: AlimentService,
    private categorieService: EnumService
  ) {

    this.categories$ = this.categorieService.getCategories();

    this.alimentService.getAliments().subscribe(aliments => {
      aliments.forEach(aliment => {
        this.alimentService.pushAliment(aliment, this.aliments)
      });
    });  
  }

  ngOnInit() { }

  categorieChanged(){
    this.categoriesSelectedChange.emit(this.categoriesSelected);
  }

  FrigoChanged(aliments: Aliment[]){
    this.alimentsSelected = aliments;
  }

  FrigoModalClose(){
    this.frigoActifOk = "frigoActif";
    this.alimentsId = [];
    this.alimentsSelected.forEach(aliment => {
      this.alimentsId.push(aliment.id);
    });
    this.alimentsIdChange.emit(this.alimentsId);
    this.utiliserFrigo = true;
  }

  seulementLesAlimentsChanged(){
    if (this.seulementLesAliments) this.seulementLesAliments=false;
    else this.seulementLesAliments=true; //permet de ne pas inverser la selection des le premier click
    this.seulementLesAlimentsChange.emit(this.seulementLesAliments);
  };

  FrigoSwitch(){
    console.log("switch");
    this.alimentsId = [];
    if(!this.utiliserFrigo){//lorsque l'on click sur la fonction, le frigo est à actif, il faut donc l'inverser
      this.utiliserFrigo = true;
      this.frigoActifOk = "frigoActif";
      this.alimentsSelected.forEach(aliment => {
        this.alimentsId.push(aliment.id);
      });
    }else{
      this.utiliserFrigo = false;
      this.frigoActifOk = "frigoNonActif";
    }
    this.alimentsIdChange.emit(this.alimentsId);
  }

  spliceAliment(aliment: Aliment){
    this.alimentService.spliceAliment(aliment, this.alimentsSelected);
    this.FrigoModalClose();
  }

}


