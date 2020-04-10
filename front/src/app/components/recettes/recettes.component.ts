import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, startWith, merge, switchMap, share } from 'rxjs/operators';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { faEdit, faHeart } from '@fortawesome/free-solid-svg-icons';

import { RecetteService } from '../../services/recette.service';
import { Recette } from '../../model/recette.model';

import { environment } from "../../../environments/environment";
import { Page } from 'src/app/util/pagination-page';
import { PageableService } from 'src/app/services/pageable.service';
import { EnumService } from 'src/app/services/enum.service';
import { Categorie } from 'src/app/model/categorie.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { Aliment } from 'src/app/model/aliment.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { AlimentService } from 'src/app/services/aliment.service';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.scss']
})
export class RecettesComponent implements OnInit {
  faEdit = faEdit;
  faHeart = faHeart;
  pathUpload: string = environment.PATH_UPLOAD;
  photoPath: string = environment.PATH_UPLOAD + "default.png";

  filterForm: FormGroup;
  pages: Observable<Page<Recette>>;

  pageUrl = new Subject<string>();
  pageSize: string = "5";
  pageNavigate: string;

  categoriesSelected: number[] = [];
  categories$: Observable<Categorie>;// on recupere toutes les categories en base

  urls: UrlSegment[];
  url1er: string = "";
  url2nd: string = "";
  nbRecette: number;
  favori: string = "false";//creation d'un faux boolean pour le passer dans l'url
  currentUser: Utilisateur = JSON.parse(localStorage.getItem('currentUser'));
  currentUserMailEditRecette: string = null;
  admin: boolean = false;
  currentUserEmail: string = null;
  loggedIn: boolean = false;
  isLoading: boolean = false;

  alimentsSelected : Aliment[] = new Array<Aliment>();
  aliments: Aliment[] = []; // on recupere tout les aliments en base trier
  alimentsId: number[] = [];
  seulementLesAliments: boolean = false;
  utiliserFrigo: boolean = false;
  frigoActifOk: string = "frigoNonActif";
  photoThumbPathFrigo: String = environment.PATH_UPLOAD + "default-aliment.png";

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private utilisateurService: UtilisateurService,
    private alimentService: AlimentService,
    private pageableService: PageableService,
    private categorieService: EnumService
  ) {
    this.isLoading = true;
    this.filterForm = new FormGroup({
      search: new FormControl()
    });

    this.categories$ = this.categorieService.getCategories();
    this.pages = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      startWith(this.filterForm.value),
      merge(this.pageUrl),
      switchMap(urlOrFilter => this.recetteService.list(this.currentUserEmail, this.categoriesSelected, this.alimentsId, this.favori, this.seulementLesAliments, urlOrFilter)),
      share()
    );    
  }


  ngOnInit() {

    this.urls = this.route.parent.snapshot.url;
    this.url1er = this.urls[0].path;
    if (this.urls[1]) this.url2nd = this.urls[1].path;

    if (this.url1er == "mesrecettes"){
      this.currentUserEmail = this.currentUser.email;
    } 
    if (this.url1er == "mesfavoris") {
      this.currentUserEmail = this.currentUser.email;
      this.favori = "true"
    }

      


    if (this.currentUser != null){
      this.loggedIn = true;
      if (this.currentUser.role == "ADMIN") this.admin = true;
      this.currentUserMailEditRecette = this.currentUser.email;

      this.pages.subscribe((recettesPageable: any) => {
        this.isLoading = false;
        this.nbRecette = recettesPageable.totalElements;
        recettesPageable.content.forEach((recette : Recette) => {
          this.currentUser.favoris.forEach((favori: any) => {
            if (recette.id == favori.id_recette || recette.id == favori.id){
              recette.favori = "actif";
            }
          })
        })
      });
    }else{
      this.pages.subscribe((recettesPageable: any) => {
        this.isLoading = false;
        this.nbRecette = recettesPageable.totalElements;

      });
      this.currentUser = new Utilisateur
      this.loggedIn = false;
    }

    this.alimentService.getAliments().subscribe(aliments => {
      aliments.forEach(aliment => {
        this.alimentService.pushAliment(aliment, this.aliments)
      });
    });
  }

  onPageChanged(pageSelected: string) {
    this.isLoading = true;
    this.pageNavigate = pageSelected;
    this.pageableService.rechargement(this.pageUrl, this.pageNavigate, this.pageSize);
  }

  onPageSizeChanged(pageSizeSelected: string) {
    this.isLoading = true;
    this.pageSize = pageSizeSelected;
    this.pageableService.rechargement(this.pageUrl, "0", this.pageSize);
  }

  categorieChanged(){
    this.isLoading = true;
    this.pageableService.rechargement(this.pageUrl, "0", this.pageSize);
  }

  FrigoChanged(aliments: Aliment[]){
    this.alimentsSelected = aliments;
  }

  FrigoModalClose(aliments: Aliment[]){
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

    this.alimentService.spliceAliment(aliment, this.alimentsSelected);
    this.FrigoModalClose(this.alimentsSelected);
  }

  addDeleteFavori(recette: Recette){
    if (recette.favori == "actif"){
      recette.favori = "";
      this.utilisateurService.deleteFavori(this.currentUser.email, JSON.stringify(recette.id))
      .subscribe(data => {
        localStorage.setItem("currentUser", JSON.stringify(data));
      });

    }else{
      recette.favori = "actif";
      this.utilisateurService.addFavori(this.currentUser.email, JSON.stringify(recette.id))
      .subscribe(data => {
        localStorage.setItem("currentUser", JSON.stringify(data));
      });
    }
  }
}


