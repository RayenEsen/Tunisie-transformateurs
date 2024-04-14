import { Transformateur } from '../Shared/Transformateur-service.model';
export class EchauffementBT {
  btid!: number;
  numero!: number;
  temp: number = 0;
  u: number= 0;
  rshunt: number= 0;
  ushunt: number= 0;
  type!: string ;
  resultat: number= 0;

  controleur1: string = "";
  verificateur: string = "";
  visa: string = "";
  date? : Date ;
  conclusion: string = "En Attente";
  vl: number = 0;
  transformateur?: Transformateur;
}
