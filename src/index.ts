import "reflect-metadata";
//Importar a Biblioteca Express
import express from 'express';
//Importar variáveis de ambiente
import dotenv from 'dotenv';
//carregar as variáveis de ambiente do arquivo .env
dotenv.config()

//Criar a aplicação Express
const app = express ();

//Criar um middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

//Incluir os controllers
import AuthController from"./controllers/AuthController.js";
import SituationsController from"./controllers/SituationsController.js";
import UsersController from "./controllers/UsersController.js";
import ProductCategoriesController from "./controllers/ProductsCategoriesController.js";
import ProductSituationsController from "./controllers/ProductsSituationsController.js";
import ProductsController from "./controllers/ProductsController.js";

//criar as rotas
app.use('/', AuthController)
app.use('/', SituationsController)
app.use('/', UsersController);
app.use('/', ProductCategoriesController);
app.use('/', ProductSituationsController);
app.use('/', ProductsController);

//Iniciar o servidor na porta 3000
app.listen(process.env.PORT, () => {
            console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});