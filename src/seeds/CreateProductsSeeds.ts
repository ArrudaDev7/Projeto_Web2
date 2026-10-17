import { DataSource } from 'typeorm';
import { Products } from '../entities/Products.js';

export default class CreateProductsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando o seed para a tabela Products...');
        const productRepository = dataSource.getRepository(Products);
        const existingCount = await productRepository.count();
        
        if (existingCount > 0) {
            console.log('A tabela Products já possui dados. O seed não será executado.');
            return;
        }

        const products = [
            { name: 'Notebook Gamer Pro', productSituationId: 1, productCategoryId: 1 },

            { name: 'Smartphone XYZ 128GB', productSituationId: 1, productCategoryId: 2 },

            { name: 'Cafeteira Elétrica Express', productSituationId: 1, productCategoryId: 3 },

            { name: 'Livro de Node.js Avançado', productSituationId: 2, productCategoryId: 4 }
        ];

        await productRepository.save(products);
        console.log('Seed de Products concluído com sucesso.');
    }
}