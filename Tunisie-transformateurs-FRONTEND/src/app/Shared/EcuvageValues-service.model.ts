import { Transformateur } from '../Shared/Transformateur-service.model';

export class EcuvageValues {
  idEcuvageValues!: number; // Auto-generated primary key
  numero!: number; // Foreign key referencing Transformateur

  v1: number= 0;
  v2: number= 0;
  v3: number= 0;
  v4: number= 0;
  v5: number= 0;
  v6: number= 0;
  v7: number= 0;
  v8: number= 0;
  v9: number= 0;

  transformateur?: Transformateur;
}
