import { VisitVeterinaire } from "./visit-veterinaire";

export type UserRole = 'OWNER' | 'VETERINAIRE';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  visits?: VisitVeterinaire[];
}
