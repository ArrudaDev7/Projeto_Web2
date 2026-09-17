//Importar a Biblioteca Express
import express, { type Request, type Response } from 'express';

//Criar a aplicação Express
const app = express ();

//Criar a rota GET principal
app.get("/",(req:Request, res:Response)=> {
    res.send("Bem vindo ao meu servidor Express com TypeScript!");
})

//Iniciar o servidor na porta 3000
app.listen(3000, ()=>{
    console.log("Servidor iniciado na porta 3000: http//localhost:3000")
});