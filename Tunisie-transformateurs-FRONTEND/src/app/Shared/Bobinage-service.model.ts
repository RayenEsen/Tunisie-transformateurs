import { ControleurDeQualite } from "./Controlleur-service.model";
import { Transformateur } from "./Transformateur-service.model";

export class Bobinage {
  idBobinage!: number;
  numero!: number;
  bt1?: number;
  bt2?: number;
  bt3?: number;
  prevue?: number;
  cnc?: number;
  nom: string = '';
  transformateur?: Transformateur; // Assuming Transformateur is another TypeScript class
}
