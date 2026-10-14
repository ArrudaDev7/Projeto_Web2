//Importar a Biblioteca Express
import express, { type Request, type Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Situations } from '../entities/Situations.js';

//Criar a aplicação Express
const router = express.Router ();

//Criar a Lista
router.get("/situations", async (req:Request, res:Response)=> {
    try {
       const SituationRepository = AppDataSource.getRepository(Situations); 
       const situations = await SituationRepository.find();
       res.status(200).json({
        mensagem: "Situações encontradas com sucesso!",
        situations: situations,
       });
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao Listar situações!",
            error: error,
        });
    }
});

//Criar a visualização de item cadastrado
router.get("/situations/:id", async (req:Request, res:Response)=> {
    try {
        const id = req.params.id as string;
        const SituationRepository = AppDataSource.getRepository(Situations); 
        const situations = await SituationRepository.findOneBy({id: parseInt(id)});
        if (!situations) {
            res.status(404).json({
                mensagem: "Situação não encontrada!",
            });
            return;
        }
        res.status(200).json({
        mensagem: "Situações encontradas com sucesso!",
        situations: situations,
       });
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao Listar situações!",
            error: error,
        });
    }
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

//Criar a visualização de item cadastrado
router.put("/situations/:id", async (req:Request, res:Response)=> {
    try {
        const id = req.params.id as string;
        var data = req.body;
        const SituationRepository = AppDataSource.getRepository(Situations); 
        const situations = await SituationRepository.findOneBy({id: parseInt(id)});
        if (!situations) {
            res.status(404).json({
                mensagem: "Situação não encontrada!",
            });
            return;
        }
        
        // Atualizar os dados da situação
        SituationRepository.merge(situations, data);

        // Salvar as alterações no banco de dados
        const updatedSituation = await SituationRepository.save(situations);

        res.status(200).json({
        mensagem: "Situações atualizada com sucesso!",
        situations: updatedSituation,
       });
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar situações!",
            error: error,
        });
    }
});

//Remove o item cadastrado
router.delete("/situations/:id", async (req:Request, res:Response)=> {
    try {
        const id = req.params.id as string;
        const SituationRepository = AppDataSource.getRepository(Situations); 
        const situations = await SituationRepository.findOneBy({id: parseInt(id)});
        if (!situations) {
            res.status(404).json({
                mensagem: "Situação não encontrada!",
            });
            return;
        }
        
        // Remover a situação do banco de dados
        await SituationRepository.remove(situations);

        res.status(200).json({
        mensagem: "Situações excluída com sucesso!",
        situations: situations,
       });
    }catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar situações!",
            error: error,
        });
    }
});


//Exportar a instrução da rota para ser utilizada em outros arquivos

export default router;