import { Etape } from "./Etape-servicemodel";

export class Rapport {

idRapport!: number; // Auto-generated primary key
Id_Etape!: number;

dater!: Date; // Assuming DateOnly is serialized as string
origine?: string;
description?: string;
analyse?: string;
action?: string;
responsable?: string;
delais?: string;
etat?: string;
efficacite?: string;
etape?: Etape;

}

