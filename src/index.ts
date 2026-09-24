//Importar a Biblioteca Express
import express from 'express';

//Criar a aplicação Express
const app = express ();

//Incluir os controllers
import login from"./controllers/login.js";

//criar as rotas
app.use('/', login)

//Iniciar o servidor na porta 3000
app.listen(3000, ()=>{
    console.log("Servidor iniciado na porta 3000: http://localhost:3000")
});