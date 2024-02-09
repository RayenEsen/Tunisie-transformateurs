import { ControleurDeQualite } from "./Controlleur-service.model";
import { Transformateur } from "./Transformateur-service.model";

export class Etape {
  id_Etape : number = 0;
  etapeNumero: number = 0;
  numero : number = 0;
  nom : string = '';

  dateDebut: Date | undefined;
  dateFin: Date | undefined;

  controleurs: ControleurDeQualite[] = [];
  transformateur?: Transformateur;
}
