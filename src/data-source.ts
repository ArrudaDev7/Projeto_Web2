import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
//Importar variáveis de ambiente
import dotenv from 'dotenv';
//carregar as variáveis de ambiente do arquivo .env
dotenv.config()

// Definindo __dirname manualmente para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dialect = process.env.DB_DIALECT ?? "mysql";

export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "postgres",
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    synchronize: false,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [join(__dirname, "/migration/*.js")],
});