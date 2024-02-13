import { Transformateur } from './Transformateur-service.model'; // Assuming the file name is 'transformateur.model.ts'

export class Electrique {
  idMagnetique!: number; // Auto-generated primary key
  numero!: number;
  p1?: number;
  p2?: number;
  p3?: number;
  p4?: number;
  p5?: number;
  cnc?: number;
  transformateur?: Transformateur;
}
