import { ControleurDeQualite } from "./Controlleur-service.model";
import { Transformateur } from "./Transformateur-service.model";

export class Etape {
  id_E: number = 0;
  numero : number = 0;
  nom : string = '';
  dateDebut: Date | undefined;
  dateFin: Date | undefined;
  controleurs?: ControleurDeQualite[]; // Many-to-many relationship with ControleurDeQualite
  transformateur?: Transformateur
}
