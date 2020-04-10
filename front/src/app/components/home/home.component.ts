import { Component, OnInit } from '@angular/core';
import { RecetteService } from 'src/app/services/recette.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Recette } from 'src/app/model/recette.model';

@Component({
  selector: 'app-ingredient',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pathUpload: string = environment.PATH_UPLOAD;
  randomRecettes$: Observable<Recette>;
  
  photoPath: string;
  photoPathThumb: string;

  constructor(
    private recetteService: RecetteService
  ) {
    
    this.randomRecettes$ = recetteService.getRandomRecette();

   }

  ngOnInit() {

  }

}
