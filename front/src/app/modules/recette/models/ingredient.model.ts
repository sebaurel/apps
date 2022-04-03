import { Aliment } from "./aliment.model";
import { Recette } from "./recette.model";
import { Unite } from "./unite.model";


export class Ingredient {
    id: number;
    quantite: number;
    unite: Unite;
    commentaire: String;
    aliment: Aliment;
    recette: Recette;
    ordre: number;
    recherche?: boolean = false;
  }