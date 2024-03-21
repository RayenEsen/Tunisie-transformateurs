import { Transformateur } from "./Transformateur-service.model";

export class Montage {
  idMagnetique?: number;
  numero?: number;
  c1m?: number | null;
  c1p?: number | null;
  cnc1?: string;

  c2m?: number | null;
  c2p?: number | null;
  cnc2?: string;

  c3m?: number | null;
  c3p?: number | null;
  cnc3?: string;

  nom!: string;
  transformateur?: Transformateur | null;
}
