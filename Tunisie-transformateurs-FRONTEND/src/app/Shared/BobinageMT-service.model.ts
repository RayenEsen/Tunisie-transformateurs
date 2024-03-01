import { ControleurDeQualite } from "./Controlleur-service.model";
import { Transformateur } from "./Transformateur-service.model";

export class BobinageMT {
  idBobinageMT!: number;
  numero!: number;
  bt1?: number | null;
  bt2?: number | null;
  bt3?: number | null;
  prevue?: number | null;
  cnc?: string;
  nom!: string;

  transformateur?: Transformateur | null;
}
