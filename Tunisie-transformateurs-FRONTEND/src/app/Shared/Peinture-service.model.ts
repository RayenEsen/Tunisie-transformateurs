import { Transformateur } from "./Transformateur-service.model";

export class Peinture {
  idPeinture!: number; // Auto-generated primary key
  numero!: number;
  datePeinture?: Date; // You can use Date type if DateOnly is not available
  fuite?: string;
  peinture?: string;
  isolateur?: string;
  marquage?: string;
  neutre?: string;
  terre?: string;
  commut?: string;
  soupage?: string;
  signature?: string;
  vanne?: string;
  relais?: string;
  doigt?: string;
  cosse?: string;
  observation?: string;
  transformateur?: Transformateur;
}
