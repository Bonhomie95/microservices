import config from '../../config/index.js';
import { DataSource } from 'typeorm';
const DB_CONFIG = {
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true,
    entities: [
        "./dist/database/entity/*.js"
    ],
    migrations: [
        './src/database/migrations/*.js'
    ]
};
export const DB = new DataSource(DB_CONFIG);
