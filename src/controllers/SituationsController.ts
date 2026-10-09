//Importar a Biblioteca Express
import express, { type Request, type Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Situations } from '../entities/Situations.js';

//Criar a aplicação Express
const router = express.Router ();

//Criar a rota GET principal
router.get("/situations",(req:Request, res:Response)=> {
    res.send("Bem vindo!!!! Tela de Situações.");
});

//Criar a rota POST principal
router.post("/situations", async (req:Request, res:Response)=> {
    try {
        var data = req.body;
        const SituationRepository = AppDataSource.getRepository(Situations);
        const newSituation = SituationRepository.create(data);
        await SituationRepository.save(newSituation);
        res.status(201).json({
            mensagem: "Situação cadastrada com sucesso!",
            situations: newSituation,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar situação!",
            error: error,
        });
    }
});

//Exportar a instrução da rota para ser utilizada em outros arquivos

export default router;