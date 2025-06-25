import { VisitVeterinaire } from "./visit-veterinaire";

export interface Pet {
  id: number;
  name: string;
  type: string;
  race: string;
  age: number;
  petImage: string;
  visits?: VisitVeterinaire[];
}
