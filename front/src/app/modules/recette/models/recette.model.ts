import { Ingredient } from './ingredient.model';
import { Utilisateur } from '../../authentication/models/utilisateur.model';
import { Etape } from './etape.model';
import { Categorie } from './categorie.model';
import { Commentaire } from '../../shared-components/models/commentaire.model';
import { Photo } from '../../shared-components/models/photo.model';

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