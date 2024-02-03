import { Pv } from "./Pv-service.model";
import { Etape } from "./Etape-servicemodel"; // Make sure to import Etape model

export class ControleurDeQualite {
  idC: string = '';
  nom?: string = '';
  prenom?: string = '';
  username?: string = '';
  email: string = '';
  tel?: string = '';
  birthdate?: Date | null = null;
  department?: string = '';
  designation?: string = '';
  adresse?: string = '';
  region?: string = '';
  codePostal?: string = '';
  password: string = '';
  pvs?: Pv[] = [];

}
