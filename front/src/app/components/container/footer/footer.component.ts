import { Component, OnInit } from '@angular/core';
import { RecetteService } from 'src/app/services/recette.service';
import { Observable } from 'rxjs';
import { Recette } from 'src/app/model/recette.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  pathUpload: string = environment.PATH_UPLOAD;
  lastRecette$: Observable<Recette>;
   
  constructor(
    private recetteService: RecetteService
  ) {
    this.lastRecette$ = recetteService.getLastRecette();
  }

  ngOnInit() {
  }

}
