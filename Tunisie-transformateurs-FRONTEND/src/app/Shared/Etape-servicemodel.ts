import { Transformateur } from "./Transformateur-service.model";
export class Etape {
  id_Etape : number = 0;
  etapeNumero: number = 0;
  numero : number = 0;
  nom : string = '';
  dateDebut: Date | undefined;
  dateFin: Date | undefined;
  etat?: string = "";
  observation?: string = "";
  operateur1?: string = "";
  operateur2?: string = "";
  controleur: string = '';
  verificateur: string = '';
  resultat: string = '';
  traitement?: string = '';
  transformateur?: Transformateur;
}
