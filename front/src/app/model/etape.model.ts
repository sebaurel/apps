import { Photo } from "./photo.model";
import { Recette } from "./recette.model";

export class Etape {
    id: number;
    titre: string;
    photo: Photo;
    descriptif: HTMLAreaElement;
    recette: Recette;
    ordre: number;
  }
	