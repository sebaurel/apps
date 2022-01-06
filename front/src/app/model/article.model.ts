import { Utilisateur } from "./utilisateur.model";
import { Photo } from './photo.model';

export class Article {
    id: number;
    title: string;
    body: string;
    date: Date;
    redacteur: Utilisateur;
    photo: Photo;
    valide: boolean;
  }