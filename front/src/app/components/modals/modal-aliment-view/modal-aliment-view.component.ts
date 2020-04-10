import { Component, OnInit, Input } from '@angular/core';
import { Aliment } from 'src/app/model/aliment.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-aliment-view',
  templateUrl: './modal-aliment-view.component.html',
  styleUrls: ['./modal-aliment-view.component.scss']
})
export class ModalAlimentViewComponent implements OnInit {

  @Input() aliment: Aliment; // recupere laliments de la fenetre parent.

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
  }
  open(content) {
    this.modalService.open(content)
  }
}
