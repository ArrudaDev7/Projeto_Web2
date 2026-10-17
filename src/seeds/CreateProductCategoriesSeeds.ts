import { DataSource } from 'typeorm';
import { ProductCategories } from '../entities/ProductCategories.js';

export default class CreateProductCategoriesSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando o seed para a tabela ProductCategories...');
        const categoryRepository = dataSource.getRepository(ProductCategories);
        const existingCount = await categoryRepository.count();
        if (existingCount > 0) {
            console.log('A tabela ProductCategories já possui dados. O seed não será executado.');
            return;
        }
        const categories = [
            { name: 'Informática' },

            { name: 'Smartphones e Tablets' },

            { name: 'Casa e Cozinha' },

            { name: 'Livros e Papelaria' }
        ];
        await categoryRepository.save(categories);
        console.log('Seed de ProductCategories concluído com sucesso.');
    }
}