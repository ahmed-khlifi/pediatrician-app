import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { VisitVeterinaire } from "./VisitVeterinaire";
import { Vaccine } from "./Vaccine";

@Entity()
export class Prise {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => VisitVeterinaire, (visit) => visit.prises)
    visit!: VisitVeterinaire;

    @ManyToOne(() => Vaccine, (vaccine) => vaccine.prises)
    vaccine!: Vaccine;

    @Column()
    date!: Date;

    @Column({ nullable: true })
    notes?: string;
}