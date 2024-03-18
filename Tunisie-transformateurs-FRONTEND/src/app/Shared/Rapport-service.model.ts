import { Transformateur } from "./Transformateur-service.model";

export class Rapport {

idRapport!: number; // Auto-generated primary key
numero!: number;
dater!: Date; // Assuming DateOnly is serialized as string
origine?: string;
description?: string;
analyse?: string;
action?: string;
responsable?: string;
delais?: string;
etat?: string;
efficacite?: string;

transformateur?: Transformateur;
}

