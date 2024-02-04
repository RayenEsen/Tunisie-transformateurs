import { Transformateur } from "./Transformateur-service.model";

export class Magnetique {
  idMagnetique?: number;
  numero?: number;
  f1c1m?: number | null;
  f1c1p?: number | null;
  f2c2m?: number | null;
  f2c2p?: number | null;
  f3c3m?: number | null;
  f3c3p?: number | null;
  c4m?: number | null;
  c4p?: number | null;
  nom!: string;
  transformateur?: Transformateur | null;
}
