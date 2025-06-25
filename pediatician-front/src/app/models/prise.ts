import { Vaccine } from "./vaccine";
import { VisitVeterinaire } from "./visit-veterinaire";

export interface Prise {
  id: number;
  date: string; // ISO string from GraphQL
  notes?: string;
  visit?: VisitVeterinaire;
  vaccine?: Vaccine;
}
