import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    synchronize: true,
    logging: false,
    database: 'pet',
    entities: []
});