import { Component, OnInit, Input, Output, EventEmitter, PLATFORM_ID, Inject, Injector } from '@angular/core';
import { Aliment } from 'src/app/model/aliment.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlimentService } from 'src/app/services/aliment.service';
import { NgForm } from '@angular/forms';
import { Photo } from 'src/app/model/photo.model';
import { environment } from "../../../../environments/environment";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal-aliment',
  templateUrl: './modal-aliment.component.html',
  styleUrls: ['./modal-aliment.component.scss']
})
export class ModalAlimentComponent implements OnInit{
  
  private modalService: NgbModal;

  @Output()
  alimentNew: EventEmitter<Aliment> = new EventEmitter<Aliment>();

  @Input() aliments: Aliment[]; // recupere le tableau des aliments de la fenetre parent pour comparer les noms.
  
  aliment:Aliment = new Aliment;
  alimentOk: boolean = true;
  closeResult: string;

  photo: Photo;
  photoThumbPath: String;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private alimentService: AlimentService,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object) {

      if(isPlatformBrowser(this.platformId)){
        this.modalService = this.injector.get(NgbModal);
      }
  }

  ngOnInit() {
    this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
  }
    
  open(content) {
    this.modalService.open(content).result.then();
  }
  /*open(content) {
      this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => { 
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });     
  }
  private getDismissReason(reason: any): string {
    
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    };

  }*/

 onSubmitFormAliment(formAliment: NgForm){

    this.aliments.forEach(alimentCompare  => {
      if(alimentCompare.nom == this.aliment.nom) {
        this.alimentOk = false;
      }
    });

    if (this.alimentOk){
      this.aliment.photo = this.photo;

      this.alimentService.postAliment(this.aliment).subscribe(alimentReturned => {
         this.alimentNew.emit(alimentReturned.body);//renvoie le nouvel aliment au composant parent pour l'inclure dans la liste des aliments disponibles
      });
    
      this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
      this.progress.percentage = 0;
      
    }else{
      alert("Cet aliment existe déjà !");
      this.alimentOk = true;
    }
  }

}
