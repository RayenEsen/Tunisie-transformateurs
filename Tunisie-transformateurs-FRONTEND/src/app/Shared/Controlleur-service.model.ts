import { Pv } from "./Pv-service.model";

export class ControleurDeQualite {
  idC: string = '';
  nom?: string ;
  prenom?: string ;
  username?: string;
  email: string = '';
  tel?: string;
  birthdate?: Date;
  department?: string;
  designation?: string;
  adresse?: string;
  region?: string;
  codePostal?: string;
  password: string = '';
  pvs?: Pv[] = [];
}
