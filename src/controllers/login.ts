//Importar a Biblioteca Express
import express, { type Request, type Response } from 'express';

//Criar a aplicação Express
const router = express.Router ();

//Criar a rota GET principal
router.get("/",(req:Request, res:Response)=> {
    res.send("Bem vindo!!!! Tela de Login.");
})

//Exportar a instrução da rota para ser utilizada em outros arquivos

export default router;