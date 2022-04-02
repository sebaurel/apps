import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from 'src/app/services/print.service';
import { environment } from 'src/environments/environment';
import { Recette } from '../../models/recette.model';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-print-recette',
  templateUrl: './print-recette.component.html',
  styleUrls: ['./print-recette.component.scss']
})
export class PrintRecetteComponent implements OnInit {
  idRecette: number;
  recette: Recette;
  pathUpload:string = environment.PATH_UPLOAD;
  constructor(
    route: ActivatedRoute,
    printService: PrintService,
    recetteService: RecetteService,
    ) {
    this.idRecette = route.snapshot.params['id'];
    recetteService.getRecette(this.idRecette).subscribe(
      (recette : Recette) => {
        this.recette = recette;
        printService.onDataReady()
      }
    );
   }

  ngOnInit(): void { }

  
}
