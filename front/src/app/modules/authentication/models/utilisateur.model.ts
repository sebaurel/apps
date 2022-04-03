import { Recette } from "../../recette/models/recette.model";
import { Aliment } from "../../recette/models/aliment.model";
import { Photo } from "../../shared-components/models/photo.model";

export class Utilisateur {
    id: number;
    pseudo: string='';
    lastName: string='';
    firstName: string='';
    email: string='';
    password: string='';
    birthday: Date;
    photo: Photo;
    descriptif: String;
    favoris: Recette[];
    frigo:Aliment[];
    role: String;
    reCaptcha: String;
  }
