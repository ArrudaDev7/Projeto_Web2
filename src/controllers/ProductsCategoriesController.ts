import express, { type Request, type Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { ProductCategories } from '../entities/ProductCategories.js';
import { PaginationService } from '../services/PaginationServices.js';

const router = express.Router();

// Listar com paginação
router.get("/product-categories", async (req: Request, res: Response) => {
    try {
        const categoryRepository = AppDataSource.getRepository(ProductCategories);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        
        const result = await PaginationService.paginate(categoryRepository, page, limit, { id: "DESC" });
        
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar categorias de produtos!",
            error: error,
        });
    }
});

// Visualizar item cadastrado por ID
router.get("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const categoryRepository = AppDataSource.getRepository(ProductCategories);
        const category = await categoryRepository.findOneBy({ id: parseInt(id) });
        
        if (!category) {
            res.status(404).json({
                mensagem: "Categoria não encontrada!",
            });
            return;
        }
        
        res.status(200).json({
            mensagem: "Categoria encontrada com sucesso!",
            category: category,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar categoria!",
            error: error,
        });
    }
});

// Cadastrar nova categoria (POST)
router.post("/product-categories", async (req: Request, res: Response) => {
    try {
        var data = req.body;
        const categoryRepository = AppDataSource.getRepository(ProductCategories);
        const newCategory = categoryRepository.create(data);
        await categoryRepository.save(newCategory);
        
        res.status(201).json({
            mensagem: "Categoria cadastrada com sucesso!",
            category: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar categoria!",
            error: error,
        });
    }
});

// Atualizar categoria (PUT)
router.put("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        var data = req.body;
        const categoryRepository = AppDataSource.getRepository(ProductCategories);
        const category = await categoryRepository.findOneBy({ id: parseInt(id) });
        
        if (!category) {
            res.status(404).json({
                mensagem: "Categoria não encontrada!",
            });
            return;
        }
        
        categoryRepository.merge(category, data);
        const updatedCategory = await categoryRepository.save(category);
        
        res.status(200).json({
            mensagem: "Categoria atualizada com sucesso!",
            category: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar categoria!",
            error: error,
        });
    }
});

// Remover categoria (DELETE)
router.delete("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const categoryRepository = AppDataSource.getRepository(ProductCategories);
        const category = await categoryRepository.findOneBy({ id: parseInt(id) });
        
        if (!category) {
            res.status(404).json({
                mensagem: "Categoria não encontrada!",
            });
            return;
        }
        
        await categoryRepository.remove(category);
        
        res.status(200).json({
            mensagem: "Categoria excluída com sucesso!",
            category: category,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir categoria!",
            error: error,
        });
    }
});

export default router;