import { Utilisateur } from "./utilisateur.model";

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
  }