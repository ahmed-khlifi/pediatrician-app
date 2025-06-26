import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VisitVeterinaire } from "./VisitVeterinaire";

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string; // Ex: chien, chat

  @Column()
  race!: string;

  @Column()
  age!: number;

  @Column({ nullable: true })
  petImage!: String;

  @OneToMany(() => VisitVeterinaire, (visit) => visit.pet)
  visits!: VisitVeterinaire[];
}