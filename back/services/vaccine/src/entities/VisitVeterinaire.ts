import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./Pet";
import { Prise } from "./Prise";
import { UserApp } from "./UserApp";

@Entity()
export class VisitVeterinaire {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Pet, (pet) => pet.visits)
  pet!: Pet;

  @ManyToOne(() => UserApp, (user) => user.visits)
  owner!: UserApp;

  @ManyToOne(() => UserApp, (user) => user.visits)
  veterinaire!: UserApp;

  @OneToMany(() => Prise, (prise) => prise.visit)
  prises!: Prise[];
}