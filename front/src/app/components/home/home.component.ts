import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Recette } from 'src/app/modules/recette/models/recette.model';
import { RecetteService } from 'src/app/modules/recette/services/recette.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pathUpload: string = environment.PATH_UPLOAD;
  randomRecettes$: Observable<Recette[]>;
  
  photoPath: string;
  photoPathThumb: string;

  constructor(
    private recetteService: RecetteService
  ) {
    
    this.randomRecettes$ = recetteService.getRandomRecette(3);

   }

  ngOnInit() {

  }

}
