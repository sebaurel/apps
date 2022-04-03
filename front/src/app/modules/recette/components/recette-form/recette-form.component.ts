import { Component, NgIterable, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/filter';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Recette } from '../../models/recette.model';
import { Ingredient } from '../../models/ingredient.model';
import { RecetteService } from '../../services/recette.service';
import { Etape } from '../../models/etape.model';
import { Categorie } from '../../models/categorie.model';
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import { CanComponentDeactivate } from 'src/app/modules/shared-components/gards/confirmation.guard';
import { Unite } from '../../models/unite.model';
import { environment } from 'src/environments/environment';
import { Utilisateur } from 'src/app/modules/authentication/models/utilisateur.model';
import { EnumService } from 'src/app/services/enum.service';
import { PreviousRouteService } from 'src/app/modules/shared-components/services/previous-route.service';
import { Aliment } from '../../models/aliment.model';
import { FormValidator } from 'src/app/util/form.util';
import { Photo } from 'src/app/modules/shared-components/models/photo.model';

@Component({
  selector: 'app-recetteForm',
  templateUrl: './recette-form.component.html',
  styleUrls: ['./recette-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecetteFormComponent implements OnInit, CanComponentDeactivate {

  faArrowsAltV = faArrowsAltV;

  recette: Recette = new Recette();
  publier: boolean = false;
  titrePage: String = "Nouvelle Recette"
  ingredients: Ingredient[] = [];
  ingredient: Ingredient = new Ingredient();

  categories:  Observable<NgIterable<Categorie>>;
  categorieSelected: Categorie;
  unites$: Observable<Unite>;
  etapes: Etape[] = [];
  newEtape: Etape = new Etape;

  pathUpload: string = environment.PATH_UPLOAD;
  photoThumbPath: string = environment.PATH_UPLOAD + "default-thumb.png";
  photoThumbPathDefaultEtape: string  = environment.PATH_UPLOAD + "default-thumb.png";//permet d'afficher la photo par default au lieu de celle de la recette
  photoThumbPathDefaultIngredient: string;
  progress: { percentage: number } = { percentage: 0 };
  
  currentUser: Utilisateur = JSON.parse(localStorage.getItem('currentUser'));
  admin: boolean = false;

  isLoading: boolean = false;
  confirmExit: boolean = false;
  returnUrls: string[];
  returnUrlslength: number;

  formRecette: FormGroup = this.formBuilder.group({
    titre:['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    categorie: ['', Validators.required],
    descriptif: ['', Validators.required]
  });

  formPublier: FormGroup;

  validationMessage = {
    'titre' : {
      'required': 'Le titre de la recette est obligatoire',
      'minlength': 'Le titre de la recette doit comporter plus de 2 caractères',
      'maxlength': 'Le titre de la recette doit comporter moins de 60 caractères'
    },
    'categorie':{
      'required': 'La catégorie de la recette est obligatoire'
    },
    'descriptif':{
      'required': 'Une description est obligatoire pour la recette, même petite ;-)'
    }
  };

  formErrors = {
    'titre': '',
    'categorie': '',
    'descriptif': '',
  };

  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private enumService: EnumService,
    private previousRouteService: PreviousRouteService,
  ) { 
    
  }

  
  ngOnInit() {
    
    if (this.currentUser.role == "ADMIN") this.admin = true;
    this.ingredient.aliment = new Aliment();
    this.ingredient.quantite = null;
    this.ingredient.unite = null;
    this.ingredient.commentaire = "";
      
    this.route.params.subscribe(params => {
      if (params['id']){// si l'on trouve un id dans les params alors on va chercher la recette en base
        this.isLoading = true;

        this.recetteService.getRecette(params['id'])
        .pipe(map((recetteReceive : Recette) => {
          this.recette.id = recetteReceive.id;

          if ( recetteReceive.utilisateur.email == this.currentUser.email || this.admin ){

            this.formRecette.setValue({
              titre: recetteReceive.titre,
              categorie: recetteReceive.categorie,
              descriptif: recetteReceive.descriptif
            });

            this.titrePage = recetteReceive.titre;
            this.recette.utilisateur = recetteReceive.utilisateur;
            this.recette.date = recetteReceive.date;
            this.publier = recetteReceive.publier;
            this.formPublier.setValue({
              switchPublier: recetteReceive.publier,
            });

            this.categorieSelected = recetteReceive.categorie;
            
            this.etapes = recetteReceive.etapes;

            this.ingredients = recetteReceive.ingredients;

            if (!recetteReceive.photo){
              this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
            }else{
              this.recette.photo = recetteReceive.photo;
              //console.log(JSON.stringify(this.recette.photo));
              this.photoThumbPath = environment.PATH_UPLOAD + recetteReceive.photo.id + "-thumb.png";
            }
          }else{
            this.recette.utilisateur = this.currentUser;
            this.recette.date = new Date();
            this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
          }

        })).subscribe(() => {
          this.isLoading = false;
          this.confirmExit = false;
        })
        
      }
      else{
          this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
      }
    }); 

    this.formRecette.valueChanges.subscribe(()=> {
      this.titrePage = this.formRecette.get('titre').value;
      this.confirmExit = true;
    })  

    this.formPublier = this.formBuilder.group({
      switchPublier:['']
    });

    this.formPublier.valueChanges.subscribe(()=> {
      this.publier = this.formPublier.get('switchPublier').value;
      this.confirmExit = true;
    })  

    this.categories = this.enumService.getCategories();
    this.unites$ = this.enumService.getUnites();

    this.returnUrls = this.previousRouteService.getPreviousUrl();
    this.returnUrlslength = this.previousRouteService.getPreviousUrl().length;

  }

  onSubmit(formRecette): void {

    FormValidator(this.formRecette, this.formErrors, this.validationMessage);

    if (this.formRecette.valid) {
      this.recette.titre = formRecette.get('titre').value;
      this.recette.descriptif = formRecette.get('descriptif').value;
      this.recette.categorie = formRecette.get('categorie').value;
      this.recette.ingredients = this.ingredients;
      //if (this.photo) this.recette.photo = this.photo;
      this.recette.etapes = this.etapes;
      this.recette.publier = this.publier;
      if (this.recette.id == null) {
        this.recetteService.postRecette(this.recette).subscribe(recetteSaved => {
          //this.router.navigate(['/recette/'+data.id]);
          this.recette.id = recetteSaved.id;
        });
      }else {
        this.recetteService.putRecette(this.recette).subscribe(x => {
            //this.router.navigate(['/recette/'+this.recette.id]);
        });
      }
      this.confirmExit = false;
    }
  }

  supprimerRecette(idRecette: number){
    if(confirm('Voulez-vous vraiment supprimer cette recette')){

      this.recetteService.deleteRecette(idRecette).subscribe(x => {
        if ( this.returnUrls[this.returnUrlslength -1] ==  '/recette/'+idRecette ) {
          if( this.returnUrls[this.returnUrlslength -2].includes('edit') ) {
            this.router.navigate(['/recette/new']);
          } else {
            this.router.navigate([this.returnUrls[this.returnUrlslength -2]]);
          }
        }else{
          this.router.navigate([this.returnUrls[this.returnUrlslength -1]]);
        }
      });
    } 
    this.confirmExit = false;
  }

  photoChange(photo: Photo){
    this.recette.photo = photo;
    this.confirmExit = true;
  }
    
  spliceIngredient(ingredientDelet: Ingredient): void{
    let index = this.ingredients.indexOf(ingredientDelet);
    this.ingredients.splice(index, 1);
    this.confirmExit = true;
  }

  spliceEtape(etape: Etape){
    let index = this.etapes.indexOf(etape);
    this.etapes.splice(index, 1);
    this.confirmExit = true;
  }

 
  confirmExitPage(){
    if (this.confirmExit) {
      return confirm("Attention, vous quittez cette page sans avoir enregistré votre recette !!");
    }else {
      return true;
    }
  }

  dropIngredient(event: CdkDragDrop<Ingredient[]>) {
    moveItemInArray(this.ingredients, event.previousIndex, event.currentIndex);
    this.confirmExit = true;
  }


  dropEtape(event: CdkDragDrop<Etape[]>) {
    moveItemInArray(this.etapes, event.previousIndex, event.currentIndex);
    this.confirmExit = true;
  }
}
