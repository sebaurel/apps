import { Utilisateur } from "../../authentication/models/utilisateur.model";
import { Photo } from './photo.model';

export class Commentaire {
    id: number;
    title: string;
    body: string;
    date: Date;
    redacteur: Utilisateur;
    idPhoto: number;
    idRecette: number;
    idUtilisateur: number;
    valide: boolean;
    photos: Photo[];
  }