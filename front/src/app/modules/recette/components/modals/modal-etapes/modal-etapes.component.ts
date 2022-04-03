import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Etape } from '../../../models/etape.model';
import { Photo } from 'src/app/modules/shared-components/models/photo.model';
//import { FormValidator } from 'src/app/util/form.util';

@Component({
  selector: 'app-modal-etapes',
  templateUrl: './modal-etapes.component.html',
  styleUrls: ['./modal-etapes.component.scss']
})
export class ModalEtapesComponent implements OnInit {

  photo: Photo;
  photoThumbPath: String = environment.PATH_UPLOAD + "default-thumb.png";
  photoThumbPathDefault: string = environment.PATH_UPLOAD + "default-thumb.png";
  progress: { percentage: number } = { percentage: 0 };
  photoOld: Photo;

  @Input() etapes: Etape[];
  @Input() etape: Etape;
  @Input() editEtape: boolean;
  @Output() confirmExit: EventEmitter<boolean> = new EventEmitter<boolean>();


  formEtape: FormGroup;
  submittedEtape: boolean = false;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {

    this.formEtape = this.formBuilder.group({
      titreEtape: ['', Validators.required],
      descriptifEtape: ['']
    })
    
    if(this.editEtape){

      this.formEtape.setValue({
        titreEtape: this.etape.titre,
        descriptifEtape: this.etape.descriptif,
      })
      
      if (this.etape.photo) {
        this.etape.photo = this.etape.photo;
        this.photoThumbPath = environment.PATH_UPLOAD + this.etape.photo.id + "-thumb.png";
      }
    }
  
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {});
  }

  addEtape(): void{
    this.submittedEtape = true;

    if (this.formEtape.valid) {
      if (this.editEtape){
        let index = this.etapes.indexOf(this.etape);
        this.etapes.splice(index, 1);

        if (this.photo) {
          this.etape.photo = this.photo;
        }
        this.etape.titre = this.formEtape.get('titreEtape').value;
        this.etape.descriptif = this.formEtape.get('descriptifEtape').value;//.replace(/(?:\r\n|\r|\n)/g, "<br>");
        
      }else{
        if (this.photo) {
          this.etape.photo = this.photo;
        }
        this.etape.descriptif = this.formEtape.get('descriptifEtape').value;//.replace(/(?:\r\n|\r|\n)/g, "<br>");
        this.etape.titre = this.formEtape.get('titreEtape').value;
        this.submittedEtape = false;
        this.formEtape.setValue({
          titreEtape: '',
          descriptifEtape: '',
        })
      }
      this.etapes.push(JSON.parse(JSON.stringify(this.etape)));
      this.progress = { percentage: 0 };

      this.confirmExit.emit(true);
      
    }

  }

  spliceEtape(etape: Etape){
    let index = this.etapes.indexOf(etape);
    this.etapes.splice(index, 1);
    this.confirmExit.emit(true);
  }
  
}

