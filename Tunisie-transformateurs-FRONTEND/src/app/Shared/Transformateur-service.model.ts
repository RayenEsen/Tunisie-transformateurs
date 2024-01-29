import { Pv } from "./Pv-service.model";

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
  libelle: string ="";
  frequency: number = 0;
  pv?: Pv;
}
