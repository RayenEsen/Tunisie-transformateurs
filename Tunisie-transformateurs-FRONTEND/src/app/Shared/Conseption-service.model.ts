export interface Conseption {
  idConseption: number;
  numero: number;
  nom: string;
  date: string; // Assuming DateOnly is a string representation of date
  quantity?: number | null;
  conformiter: string;
  image?: ArrayBuffer | string | null; // Assuming byte[] maps to ArrayBuffer or string
}
