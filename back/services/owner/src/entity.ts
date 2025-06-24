import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Owner {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;
}