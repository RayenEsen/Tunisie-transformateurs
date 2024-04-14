import { Transformateur } from "./Transformateur-service.model";


export class Liquide {
  btid!: number;
  numero!: number;
  a1: number = 0;
  a2: number = 0;
  a3: number = 0;
  a4: number = 0;
  a0: number = 0;
  resultat: number = 0;



  controleur1: string = "";
  verificateur: string = "";
  visa: string = "";
  date? : Date ;
  conclusion: string = "En Attente";
  vl: number = 0;


  transformateur?: Transformateur;
}

