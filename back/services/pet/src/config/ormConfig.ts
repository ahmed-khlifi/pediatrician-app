import { DataSource } from "typeorm";
import { Pet } from "../entities/Pet";
import { Prise } from "../entities/Prise";
import { UserApp } from "../entities/UserApp";
import { Vaccine } from "../entities/Vaccine";
import { VisitVeterinaire } from "../entities/VisitVeterinaire";

export const AppDataSource = new DataSource({
    type: 'mariadb',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'pet',
    synchronize: true,
    logging: false,
    entities: [UserApp, Pet, VisitVeterinaire, Vaccine, Prise],
});