import "reflect-metadata";
//Importar a Biblioteca Express
import express from 'express';
//Importar variáveis de ambiente
import dotenv from 'dotenv';
//carregar as variáveis de ambiente do arquivo .env
dotenv.config()

//Criar a aplicação Express
const app = express ();

//Incluir os controllers
import AuthController from"./controllers/AuthController.js";
import SituationsController from"./controllers/SituationsController.js";

//criar as rotas
app.use('/', AuthController)
app.use('/', SituationsController)

//Iniciar o servidor na porta 3000
app.listen(process.env.PORT, () => {
            console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});