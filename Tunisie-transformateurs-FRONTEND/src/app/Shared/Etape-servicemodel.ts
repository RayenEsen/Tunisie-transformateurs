import { ControleurDeQualite } from "./Controlleur-service.model";
import { Transformateur } from "./Transformateur-service.model";

export class Etape {
  id_Etape : number = 0;
  etapeNumero: number = 0;
  numero : number = 0;
  nom : string = '';
  operateur1 : string  = "";
  operateur2 : string  = "";
  dateDebut: Date | undefined;
  dateFin: Date | undefined;
  idC?:string;

  controleur?: ControleurDeQualite ;
  transformateur?: Transformateur
}
