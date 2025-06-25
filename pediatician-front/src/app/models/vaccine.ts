import { Prise } from "./prise";

export interface Vaccine {
  id: number;
  name: string;
  description: string;
  prises?: Prise[];
}
