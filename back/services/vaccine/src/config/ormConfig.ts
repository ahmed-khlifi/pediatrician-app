import { DataSource } from "typeorm";
import { Pet } from "../entities/Pet";
import { Prise } from "../entities/Prise";
import { UserApp } from "../entities/UserApp";
import { Vaccine } from "../entities/Vaccine";
import { VisitVeterinaire } from "../entities/VisitVeterinaire";


export const AppDataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'pet',
    synchronize: true,
    logging: false,
    entities: [UserApp, Pet, VisitVeterinaire, Vaccine, Prise],

});