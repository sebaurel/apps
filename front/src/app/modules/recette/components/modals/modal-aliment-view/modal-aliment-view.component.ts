import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Aliment } from '../../../models/aliment.model';

@Component({
  selector: 'app-modal-aliment-view',
  templateUrl: './modal-aliment-view.component.html',
  styleUrls: ['./modal-aliment-view.component.scss']
})
export class ModalAlimentViewComponent implements OnInit {

  @Input() aliment: Aliment; // récupère l'aliments de la fenêtre parent.
  @Input() recherche: boolean; // récupère la mise en valeur de l'aliment s'il est recherché.

  photoThumbPath: String;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    if (this.aliment.photo){
      this.photoThumbPath = environment.PATH_UPLOAD + "" + this.aliment.photo.id+".png"; 
    }else{
      this.photoThumbPath = environment.PATH_UPLOAD + "default-aliment.png";
    }
    console.log(this.recherche);
  }
  open(content) {
    this.modalService.open(content)
  }
}
