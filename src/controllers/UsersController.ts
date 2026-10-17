import express, { type Request, type Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Users } from '../entities/Users.js';
import { PaginationService } from '../services/PaginationServices.js';

const router = express.Router();

// Listar com paginação (trazendo os dados da situação relacionada)
router.get("/users", async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(Users);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        
        // Passamos a relação "situation" para vir junto na busca
        const result = await PaginationService.paginate(userRepository, page, limit, { id: "DESC" });
        
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar usuários!",
            error: error,
        });
    }
});

// Visualizar usuário por ID
router.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOne({
            where: { id: parseInt(id) },
            relations: { situation: true }
        });
        
        if (!user) {
            res.status(404).json({ mensagem: "Usuário não encontrado!" });
            return;
        }
        
        res.status(200).json({
            mensagem: "Usuário encontrado com sucesso!",
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar usuário!",
            error: error,
        });
    }
});

// Cadastrar novo usuário (POST)
router.post("/users", async (req: Request, res: Response) => {
    try {
        var data = req.body;
        const userRepository = AppDataSource.getRepository(Users);
        const newUser = userRepository.create(data);
        await userRepository.save(newUser);
        
        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário!",
            error: error,
        });
    }
});

// Atualizar usuário (PUT)
router.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        var data = req.body;
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        
        if (!user) {
            res.status(404).json({ mensagem: "Usuário não encontrado!" });
            return;
        }
        
        userRepository.merge(user, data);
        const updatedUser = await userRepository.save(user);
        
        res.status(200).json({
            mensagem: "Usuário atualizado com sucesso!",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar usuário!",
            error: error,
        });
    }
});

// Remover usuário (DELETE)
router.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        
        if (!user) {
            res.status(404).json({ mensagem: "Usuário não encontrado!" });
            return;
        }
        
        await userRepository.remove(user);
        res.status(200).json({
            mensagem: "Usuário excluído com sucesso!",
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir usuário!",
            error: error,
        });
    }
});

export default router;