import { Pv } from "./Pv-service.model";
import { Etape } from "./Etape-servicemodel"; // Make sure to import Etape model
import { Bobinage } from "./Bobinage-service.model";
import { BobinageMT } from "./BobinageMT-service.model";
import { Magnetique } from "./Magnetique-service.model";

export class Transformateur {
  numero: number = 0;
  marque: string = "";
  date: Date = new Date();
  type: string = "";
  client: string = "";
  norme: string = "";
  power: string = "";
  mtu1: number = 0;
  mtu2: number = 0;
  btu2: number = 0;
  bti2: number = 0;
  nbphase: number = 0;
  prises: string = "";
  couplage: string = "";
  cooling: string = "";
  libelle: string = "";
  accessoires: string = "";
  bornesembrochables: string  = "";
  frequency: number = 0;
  pv?: Pv;
  etapes?: Etape[]; // One-to-many relationship with Etape
  bobinage?: Bobinage[]; // One-to-many relationship with Etape
  bobinageMT?: BobinageMT[]; // One-to-many relationship with Etape
  magnetique?: Magnetique[]; // One-to-many relationship with Etape

}
