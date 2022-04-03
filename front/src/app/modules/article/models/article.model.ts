import { Utilisateur } from "../../authentication/models/utilisateur.model";
import { Photo } from '../../../models/photo.model';

export class Article {
    id: number;
    title: string;
    body: string;
    date: Date;
    redacteur: Utilisateur;
    photo: Photo;
    valide: boolean;
  }