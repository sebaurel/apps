import { Photo } from "./photo.model";
import { Recette } from "./recette.model";
import { Aliment } from "./aliment.model";

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
