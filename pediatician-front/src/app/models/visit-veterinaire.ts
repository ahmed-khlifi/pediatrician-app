import { Pet } from "./pet";
import { Prise } from "./prise";
import { User } from "./user";

export interface VisitVeterinaire {

  id: number;
  date: string; // ISO string
  description?: string;
  pet?: Pet;
  owner?: User;
  prises?: Prise[];

}
