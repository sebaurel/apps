import { Ingredient } from './ingredient.model';
import { Photo } from './photo.model';
import { Utilisateur } from './utilisateur.model';
import { Etape } from './etape.model';
import { Categorie } from './categorie.model';
import { Commentaire } from './commentaire.model';

export class Recette {
    id: number;
    titre: string;
    descriptif: string;
    ingredients: Ingredient[];
    photo: Photo;
    photos: Photo[];
    utilisateur: Utilisateur;
    etapes: Etape[];
    categorie: Categorie;
    date: Date;
    favori: string;
    publier: boolean;
    commentaires: Commentaire[];
  }