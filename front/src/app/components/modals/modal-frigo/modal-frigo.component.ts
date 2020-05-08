import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Aliment } from 'src/app/model/aliment.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlimentService } from 'src/app/services/aliment.service';
import { environment } from 'src/environments/environment';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-frigo',
  templateUrl: './modal-frigo.component.html',
  styleUrls: ['./modal-frigo.component.scss']
})
export class ModalFrigoComponent implements OnInit {

  @Input() loggedIn: boolean;
  @Input() alimentsSelectedModal: Aliment[]; //le tableau des aliments affichés
  @Output() close: EventEmitter<Aliment> = new EventEmitter<Aliment>(); //evenement de fermeture qui entraine l'appel au WS de filtre
  @Output() change: EventEmitter<Aliment[]> = new EventEmitter<Aliment[]>(); //evenement de changement qui actualise la liste du partent mais qui n'entraine pas l'appel au WS de filtre
  photoThumbPath: String = environment.PATH_UPLOAD + "default-aliment.png";
  pathUpload:String = environment.PATH_UPLOAD;
  aliments$: Observable<Aliment[]>;
  aliment: Aliment;

  alimentsId: number[] = []; // Pour envoyer les id des aliments au back afin de sauvegarder le frigo
  currentUser: Utilisateur;

  formAliments: FormGroup = this.formBuilder.group({
    alimentsSelecteur: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private alimentService: AlimentService,
    private utilisateurService: UtilisateurService
  ) { 
    
  }

  ngOnInit() {
  }

  open(content) {
    this.aliments$ = this.alimentService.getAliments().pipe(map(data => {
      data.sort((a, b) => a.nom.localeCompare(b.nom));
    return data;}   ));

    this.modalService.open(content).result.then((result) => {
      this.close.emit();
    }, (reason) => {});

    
  }

  ModalFrigoChange(){
    this.change.emit(this.alimentsSelectedModal);
  }

  addNewAlimentSelected(aliment: Aliment){
    this.alimentService.pushAliment(aliment, this.alimentsSelectedModal); //on l'ajoute dans l'aliment selected

    //this.alimentsId.push(aliment.id); //On l'ajoute a la liste des aliments à sauvegarder /!\ cet ajout est faite directement dans la fonction de sauvegarde
  }


  spliceAlimentSelected(aliment: Aliment){
    this.alimentService.spliceAliment(aliment, this.alimentsSelectedModal);
    this.ModalFrigoChange();

    //let indexAlimentsId = this.alimentsId.indexOf(aliment.id); // /!\ cet ajout est faite directement dans la fonction de sauvegarde
    //this.alimentsId.splice(indexAlimentsId, 1);

    //this.alimentService.pushAliment(aliment, this.aliments);
  }

  /*pushAliment(aliment: Aliment, array: Array<Aliment>){
    array.push(aliment);
  }*/

  sauvegardeFrigo() {

    this.alimentsSelectedModal.forEach(aliment => { //on rempli la liste des id a sauvegarder
        this.alimentsId.push(aliment.id);
      });
    if (confirm("En enregistrant ce frigo, vous écraserez celui précédement enregistré")){
      this.utilisateurService.enregistreFrigo(this.utilisateurService.getCurrentUserLogged().email, this.alimentsId)
      .subscribe(data => {
        localStorage.setItem("currentUser", JSON.stringify(data));
      });
    }
  }

  viderFrigo(){
    this.alimentsSelectedModal.splice(0, this.alimentsSelectedModal.length);
  }

  recupereFrigo(){
    this.viderFrigo();
    JSON.parse(localStorage.getItem('currentUser')).frigo.forEach((aliment:Aliment) => {
      this.alimentService.pushAliment(aliment, this.alimentsSelectedModal);
    });
    this.formAliments.setValue({
      alimentsSelecteur: this.alimentsSelectedModal,
    });//ng-select ne se rafraichit pas !! obligé de faire un setvalue sur le formulaire
  }
}
