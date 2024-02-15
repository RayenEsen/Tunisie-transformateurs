import { Transformateur } from "./Transformateur-service.model";

export class Remplissage {

idRemplissage!: number; // Auto-generated primary key
numero!: number;
datet?: Date; // Assuming DateOnly is serialized as string
pressiond?: number;
pressionf?: number;
hd?: number;
hf?: number;
cnc?: number;
controleur?: string;
observations?: string;
transformateur?: Transformateur;
}

