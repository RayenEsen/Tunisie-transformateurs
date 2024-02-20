import { Transformateur } from "./Transformateur-service.model";

export class Peinture {
  idPeinture?: number;
  numerop!: number; // Auto-generated primary key
  numero!: number;
  datePentiure?: Date; // You can use Date type if DateOnly is not available
  fuite?: string;
  penture?: string;
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
  cnc?: string;
  transformateur?: Transformateur;
}
