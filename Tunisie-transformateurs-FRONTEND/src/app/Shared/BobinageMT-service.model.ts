import { Transformateur } from "./Transformateur-service.model";

export class BobinageMT {
  idBobinageMT!: number;
  numero!: number;
  bt1?: number | null;
  bt2?: number | null;
  bt3?: number | null;
  prevue?: number | null;
  nom!: string;
  transformateur?: Transformateur | null;
}
