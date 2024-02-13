import { Transformateur } from './Transformateur-service.model'; // Assuming the file name is 'transformateur.model.ts'

export class Partie2 {
  idMagnetique!: number; // Auto-generated primary key
  numero!: number;
  vp1?: number;
  cnc1?: number;
  vp2?: number;
  cnc2?: number;
  transformateur?: Transformateur;
}
