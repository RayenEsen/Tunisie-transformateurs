import { Transformateur } from "./Transformateur-service.model";

export class Montage {
  idMagnetique?: number;
  numero?: number;
  c1m?: number | null;
  c1p?: number | null;
  c2m?: number | null;
  c2p?: number | null;
  c3m?: number | null;
  c3p?: number | null;

  nom!: string;
  transformateur?: Transformateur | null;
}
