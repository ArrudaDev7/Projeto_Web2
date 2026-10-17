import express, { type Request, type Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Products } from '../entities/Products.js';
import { PaginationService } from '../services/PaginationServices.js';

const router = express.Router();

// Listar produtos com paginação
router.get("/products", async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Products);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        
        const result = await PaginationService.paginate(productRepository, page, limit, { id: "DESC" });
        
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar produtos!",
            error: error,
        });
    }
});

// Visualizar produto por ID (trazendo categoria e situação relacionadas)
router.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const productRepository = AppDataSource.getRepository(Products);
        const product = await productRepository.findOne({
            where: { id: parseInt(id) },
            relations: {
                category: true,
                situation: true,
            }
        });
        
        if (!product) {
            res.status(404).json({ mensagem: "Produto não encontrado!" });
            return;
        }
        
        res.status(200).json({
            mensagem: "Produto encontrado com sucesso!",
            product: product,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar produto!",
            error: error,
        });
    }
});

// Cadastrar novo produto (POST) - Exige preencher productSituationId e productCategoryId
router.post("/products", async (req: Request, res: Response) => {
    try {
        var data = req.body;
        const productRepository = AppDataSource.getRepository(Products);
        const newProduct = productRepository.create(data);
        await productRepository.save(newProduct);
        
        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso!",
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar produto. Verifique se as chaves estrangeiras (categoria/situação) existem.",
            error: error,
        });
    }
});

// Atualizar produto (PUT)
router.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        var data = req.body;
        const productRepository = AppDataSource.getRepository(Products);
        const product = await productRepository.findOneBy({ id: parseInt(id) });
        
        if (!product) {
            res.status(404).json({ mensagem: "Produto não encontrado!" });
            return;
        }
        
        productRepository.merge(product, data);
        const updatedProduct = await productRepository.save(product);
        
        res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar produto!",
            error: error,
        });
    }
});

// Remover produto (DELETE)
router.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const productRepository = AppDataSource.getRepository(Products);
        const product = await productRepository.findOneBy({ id: parseInt(id) });
        
        if (!product) {
            res.status(404).json({ mensagem: "Produto não encontrado!" });
            return;
        }
        
        await productRepository.remove(product);
        res.status(200).json({
            mensagem: "Produto excluído com sucesso!",
            product: product,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir produto!",
            error: error,
        });
    }
});

export default router;