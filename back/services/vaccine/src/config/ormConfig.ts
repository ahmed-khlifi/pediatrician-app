import { DataSource } from "typeorm";
import { Vaccine } from "../entities/Vaccine";
import { Prise } from "../entities/Prise";
import { UserApp } from "../entities/UserApp";
import { Pet } from "../entities/Pet";
import { VisitVeterinaire } from "../entities/VisitVeterinaire";

export const AppDataSource = new DataSource({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'pet',
    synchronize: true,
    logging: false,
    entities: [UserApp, Pet, VisitVeterinaire, Vaccine, Prise],

});