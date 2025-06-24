import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VisitVeterinaire } from "./VisitVeterinaire";

@Entity()
export class UserApp {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    role!: 'OWNER' | 'VETERINAIRE';

    @OneToMany(() => VisitVeterinaire, (visit) => visit.owner)
    visits!: VisitVeterinaire[];
}