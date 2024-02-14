import { Transformateur } from '../Shared/Transformateur-service.model';

export class Ecuvage {
  idMagnetique!: number; // Auto-generated primary key
  numero!: number;
  conformite?: string;
  observation?: string;

  transformateur?: Transformateur;
}
