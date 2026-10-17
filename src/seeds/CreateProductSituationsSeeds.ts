import { DataSource } from 'typeorm';
import { ProductSituations } from '../entities/ProductSituations.js';

export default class CreateProductSituationsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando o seed para a tabela ProductSituations...');
        const situationRepository = dataSource.getRepository(ProductSituations);
        const existingCount = await situationRepository.count();
        if (existingCount > 0) {
            console.log('A tabela ProductSituations já possui dados. O seed não será executado.');
            return;
        }
        const situations = [
            { name: 'Disponível' },

            { name: 'Esgotado' },

            { name: 'Em Breve' },

            { name: 'Fora de Linha' }
        ];
        await situationRepository.save(situations);
        console.log('Seed de ProductSituations concluído com sucesso.');
    }
}