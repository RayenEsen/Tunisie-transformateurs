import { ControleurDeQualite } from "./Controlleur-service.model";

export class Pfp {
  idpfp!: number; // Auto-generated primary key
  idC!: string;
  pathway: string = "";
  controleur?: ControleurDeQualite;
}
