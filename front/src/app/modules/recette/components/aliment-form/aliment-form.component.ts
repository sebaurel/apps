import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from 'src/app/modules/shared-components/models/photo.model';
import { environment } from 'src/environments/environment';
import { Aliment } from '../../models/aliment.model';
import { AlimentService } from '../../services/aliment.service';

@Component({
  selector: 'app-aliment-form',
  templateUrl: './aliment-form.component.html',
  styleUrls: ['./aliment-form.component.scss']
})
export class AlimentFormComponent implements OnInit {

  aliment: Aliment = new Aliment;
  
  aliments$: Observable<Aliment[]>;
  photo: Photo = new Photo();
  photoThumbPath: String = environment.PATH_UPLOAD + "default-thumb.png";
  alimentSelected: boolean = false;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    private alimentService: AlimentService,
  ) {}
  

  ngOnInit() {
    this.aliments$ = this.alimentService.getAliments().pipe(map((data) => {data.sort((a, b) => {return a.nom < b.nom ? -1 : 1;}); return data;}));
  }

  onSelect(){
    this.alimentSelected = true;

    if (this.aliment.photo) {
      this.photo = this.aliment.photo;
      this.photoThumbPath = environment.PATH_UPLOAD + this.photo.id+"-thumb.png";
    } else {
      this.photo = new Photo();
      //this.photoThumbPath = environment.PATH_UPLOAD + "default-thumb.png";
    }
  }

  onSubmitFormAliment(formAliment: NgForm){
    if (this.alimentSelected){
      if (this.aliment.photo != this.photo) this.aliment.photo = this.photo;
      this.alimentService.putAliment(this.aliment).subscribe(data => {this.resetFormAliment()});
    } else { 
      this.aliment.photo = this.photo;
      this.alimentService.postAliment(this.aliment).subscribe(data => {this.resetFormAliment()});
    };
    //formAliment.resetForm();
  }
  
  resetFormAliment(){
    this.aliment = new Aliment(); 
    this.photo = new Photo();
    this.ngOnInit();
    this.progress.percentage = 0;
  }

  deleteAliment(){
    if (confirm("Vous êtes sur le point de supprimer l'aliment "+this.aliment.nom+"\n\rCette action est irreversible")) {
      this.alimentService.deleteAliment(this.aliment.id).subscribe(
        () => {
          alert(this.aliment.nom+" supprimé");
          this.aliment = new Aliment();
          this.ngOnInit()
        },
        error => {
          alert("Impossible de supprimer "+this.aliment.nom+". Il est utilisé dans au moins une recette");
        }
      );
      this.alimentSelected = false;
    }
  }

}
