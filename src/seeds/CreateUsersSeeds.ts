import { DataSource } from 'typeorm';
import { Users } from '../entities/Users.js';

export default class CreateUsersSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando o seed para a tabela Users...');
        const userRepository = dataSource.getRepository(Users);
        const existingCount = await userRepository.count();
        if (existingCount > 0) {
            console.log('A tabela Users já possui dados. O seed não será executado.');
            return;
        }
        const users = [
            { name: 'Administrador', email: 'admin@email.com', situationId: 1 },
            { name: 'Usuário Teste', email: 'teste@email.com', situationId: 1 }
        ];
        await userRepository.save(users);
        console.log('Seed de Users concluído com sucesso.');
    }
}