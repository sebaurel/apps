import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from 'src/app/model/ingredient.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Unite } from 'src/app/model/unite.model';
import { EnumService } from 'src/app/services/enum.service';
import { AlimentService } from 'src/app/services/aliment.service';
import { Aliment } from 'src/app/model/aliment.model';

@Component({
  selector: 'app-modal-ingredient',
  templateUrl: './modal-ingredient.component.html',
  styleUrls: ['./modal-ingredient.component.scss']
})
export class ModalIngredientComponent implements OnInit {
 
  @Output() confirmExit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() ingredients: Ingredient[];
  @Input() editIngredient: boolean;
  @Input() ingredient: Ingredient;
  
  formIngredient: FormGroup;

  unites$: Observable<Unite>;
  aliments: Aliment[] = [];
  
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alimentService: AlimentService,
    private enumService: EnumService,
  ) { 
    
  }

  ngOnInit() {

    this.formIngredient = this.formBuilder.group({
      aliment: ['', Validators.required],
      quantite: [''],
      unite: [''],
      commentaire: ['']
    })

    if (this.editIngredient){
      this.formIngredient.setValue({
        aliment: this.ingredient.aliment,
        quantite: this.ingredient.quantite,
        unite: this.ingredient.unite,
        commentaire: this.ingredient.commentaire
      });
    };
    
    this.alimentService.getAliments().subscribe(aliments => {
      aliments.forEach(aliment => {
        this.alimentService.pushAliment(aliment, this.aliments);
      });
    });
    
    this.unites$ = this.enumService.getUnites();

  }
  open(content) {
    this.modalService.open(content).result.then();
  }

  addIngredient(): void{

    if (this.formIngredient.valid) {
      this.ingredient.aliment = this.formIngredient.get('aliment').value;
      this.ingredient.quantite = this.formIngredient.get('quantite').value;
      this.ingredient.unite = this.formIngredient.get('unite').value;
      this.ingredient.commentaire = this.formIngredient.get('commentaire').value;
      if (!this.editIngredient){
        this.ingredients.push(JSON.parse(JSON.stringify(this.ingredient)));
      }
      this.confirmExit.emit(true);
      this.ingredient = new Ingredient();

    }
  }

  addAliment(newAliment: Aliment): void {
    this.alimentService.pushAliment(newAliment, this.aliments); //on recupere l'aliment de la fenetre modal pour l'ajouter à la liste des aliments disponibles
    this.formIngredient.setValue({
      aliment: newAliment,
      quantite: "",
      unite: "",
      commentaire: ""
    });//ng-select ne se rafraichit pas !! obligé de faire un setvalue sur le formulaire
  }

}
