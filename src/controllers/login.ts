//Importar a Biblioteca Express
import express, { type Request, type Response } from 'express';

//Importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from '../data-source.js'

//Criar a aplicação Express
const router = express.Router ();

//Inicializar a conexão com o banco de dados
AppDataSource.initialize().then(()=>{
    console.log("Conexão com o banco de dados realizada com sucesso!")
}).catch((error)=>{
    console.log("Erro na conexão com o banco de dados!",error)
})

//Criar a rota GET principal
router.get("/",(req:Request, res:Response)=> {
    res.send("Bem vindo!!!! Tela de Login.");
})

//Exportar a instrução da rota para ser utilizada em outros arquivos

export default router;