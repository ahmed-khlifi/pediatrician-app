import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Prise } from "./Prise";

@Entity()
export class Vaccine {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @OneToMany(() => Prise, (prise) => prise.vaccine)
    prises!: Prise[];
}