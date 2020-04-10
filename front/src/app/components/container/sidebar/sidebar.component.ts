import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/categorie.model';
import { Observable, Subject } from 'rxjs';
import { Aliment } from 'src/app/model/aliment.model';
import { environment } from 'src/environments/environment';
import { EnumService } from 'src/app/services/enum.service';
import { AlimentService } from 'src/app/services/aliment.service';
import { PageableService } from 'src/app/services/pageable.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  filtreSelecteds: number[] = [];
  categories$: Observable<Categorie>;
  loggedIn: boolean;

  isLoading: boolean = false;
  pageUrl = new Subject<string>();
  pageSize: string = "5";

  alimentsSelected : Aliment[] = new Array<Aliment>();
  aliments: Aliment[] = new Array<Aliment>(); // on recupere tous les aliments en base
  alimentsId: number[] = [];
  seulementLesAliments: boolean = false;
  utiliserFrigo: boolean = false;
  frigoActifOk: string = "frigoNonActif";
  photoThumbPathFrigo: String = environment.PATH_UPLOAD + "default-aliment.png";

  constructor(
    private categorieService: EnumService,
    private alimentService: AlimentService,
    private pageableService: PageableService

  ) { 
    this.categories$ = this.categorieService.getCategories();

  }

  ngOnInit() {
  }
  filtreChanged(filtre: Categorie){
    this.isLoading = true;
    /*if (this.filtreSelecteds.includes("TOUTE")){
      let indexToute = this.filtreSelecteds.indexOf("TOUTE");
      this.filtreSelecteds.splice(indexToute, 1);
    }*/
    
    if (this.filtreSelecteds.includes(filtre.id)){
      filtre.actif="";
      let index = this.filtreSelecteds.indexOf(filtre.id);
      this.filtreSelecteds.splice(index, 1);
    }else{
      filtre.actif="actif";
      this.filtreSelecteds.push(filtre.id);
    }
    //if (this.filtreSelecteds.length == 0) this.filtreSelecteds.push("TOUTE");
    this.pageableService.rechargement(this.pageUrl, "0", this.pageSize);

    this.alimentService.getAliments().subscribe(aliments => {
      aliments.forEach(aliment => {
        this.alimentService.pushAliment(aliment, this.aliments)
      });
    });

  }

  FrigoChanged(){
    console.log("changed");
    this.isLoading = true;
    this.frigoActifOk = "frigoActif";
    this.alimentsId = [];
    this.alimentsSelected.forEach(aliment => {
      this.alimentsId.push(aliment.id);
    });
    this.pageableService.rechargement(this.pageUrl, "0", this.pageSize);
    this.utiliserFrigo = true;
  }

  seulementLesAlimentsChanged(){
    this.isLoading = true;
    if (this.seulementLesAliments) this.seulementLesAliments=false;
    else this.seulementLesAliments=true; //permet de ne pas inverser la selection des le premier click
    this.pageableService.rechargement(this.pageUrl, "0", this.pageSize);
  };

  FrigoSwitch(){
    this.isLoading = true;
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
    this.pageableService.rechargement(this.pageUrl, "0", this.pageSize);
  }

  spliceAliment(aliment: Aliment){
    this.isLoading = true;
    this.alimentService.pushAliment(aliment, this.aliments);

    this.alimentService.spliceAliment(aliment, this.alimentsSelected);
    this.FrigoChanged();
  }
}
