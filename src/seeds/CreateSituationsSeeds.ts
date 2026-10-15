import { DataSource} from 'typeorm';
import { Situations } from '../entities/Situations.js';

export default class CreateSituationsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando o seed para a tabela Situations...');
        const situationRepository = dataSource.getRepository(Situations);
        const existingCount = await situationRepository.count();
        if (existingCount > 0) {
            console.log('A tabela Situations já possui dados. O seed não será executado.');
            return;
        }
        const situations =[
            { nameSituation: 'Ativo' },
            { nameSituation: 'Inativo' },
            { nameSituation: 'Pendente' }
        ];
        await situationRepository.save(situations);
        console.log('Seed concluído com sucesso.');
    }
}