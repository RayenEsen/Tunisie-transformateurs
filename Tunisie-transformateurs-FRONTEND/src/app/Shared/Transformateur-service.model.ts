import { Pv } from "./Pv-service.model";
import { Etape } from "./Etape-servicemodel"; // Make sure to import Etape model
import { Bobinage } from "./Bobinage-service.model";
import { BobinageMT } from "./BobinageMT-service.model";
import { Magnetique } from "./Magnetique-service.model";

export class Transformateur {
  numero: number = 0;
  marque: string = "";


  date: Date = new Date();
  dateLivraison?: Date;
  dateFin?: Date;

  dateprevue?: Date;
  dateCloture?: Date;

  type: string = "";
  client: string = "";
  norme: string = "";
  power: string = "";
  mtu1: number = 0;
  mtu2: number = 0;
  btu2: number = 0;
  bti2: number = 0;
  nbphase: number = 0;
  quantite: number = 1;
  prises: string = "";
  couplage: string = "";
  cooling: string = "";
  libelle: string = "";
  accessoires: string = "";
  accessoires2: string = "";
  etat: string = "";
  galet: string = "";
  isolateur: string = "";

  perte_totale?: number;
  r1BT?:number;
  r1MT?:number;
  temperature?:number;

  capot: string = "";
  sans: string = "";
  borne: string = "";
  bornesembrochables: string  = "";
  frequency: number = 0;

  quantite2: number = 0;
  commande: number = 0;

  pv?: Pv;
  etapes?: Etape[]; // One-to-many relationship with Etape
  bobinages?: Bobinage[]; // One-to-many relationship with Etape
  bobinagesMT?: BobinageMT[]; // One-to-many relationship with Etape
  magnetique?: Magnetique[]; // One-to-many relationship with Etape
}
