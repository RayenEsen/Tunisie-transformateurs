import { Conseption } from "./Conseption-service.model";

export class ConseptionValues {
  valueId!: number;
  idConseption!: number;
  nom: string = "";
  prevue?: number
  mesuree?: number
  image?: ArrayBuffer; // Add image property of type ArrayBuffer
  conseption?: Conseption
}
