import express, { type Request, type Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { ProductSituations } from '../entities/ProductSituations.js';
import { PaginationService } from '../services/PaginationServices.js';

const router = express.Router();

router.get("/product-situations", async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(ProductSituations);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(repo, page, limit, { id: "DESC" });
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar situações de produtos!", error });
    }
});

router.get("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const repo = AppDataSource.getRepository(ProductSituations);
        const item = await repo.findOneBy({ id: parseInt(id) });
        if (!item) {
            res.status(404).json({ mensagem: "Situação de produto não encontrada!" });
            return;
        }
        res.status(200).json({ mensagem: "Encontrado com sucesso!", item });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar!", error });
    }
});

router.post("/product-situations", async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(ProductSituations);
        const newItem = repo.create(req.body);
        await repo.save(newItem);
        res.status(201).json({ mensagem: "Cadastrado com sucesso!", item: newItem });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao cadastrar!", error });
    }
});

router.put("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const repo = AppDataSource.getRepository(ProductSituations);
        const item = await repo.findOneBy({ id: parseInt(id) });
        if (!item) {
            res.status(404).json({ mensagem: "Não encontrado!" });
            return;
        }
        repo.merge(item, req.body);
        const updated = await repo.save(item);
        res.status(200).json({ mensagem: "Atualizado com sucesso!", item: updated });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar!", error });
    }
});

router.delete("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const repo = AppDataSource.getRepository(ProductSituations);
        const item = await repo.findOneBy({ id: parseInt(id) });
        if (!item) {
            res.status(404).json({ mensagem: "Não encontrado!" });
            return;
        }
        await repo.remove(item);
        res.status(200).json({ mensagem: "Excluído com sucesso!", item });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir!", error });
    }
});

export default router;