import { AppDataSource } from "./data-source.js";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds.js";

const runSeeds = async () => {
    console.log('Iniciando ao banco de dados...');
    await AppDataSource.initialize();
    console.log('Banco de dados inicializado com sucesso!');
    try{
        //Cria a instancia da classe CreateSituationsSeeds 
        const situationSeeds = new CreateSituationsSeeds();
        
        //executa as seeds
        await situationSeeds.run(AppDataSource);
        
    } catch (error) {
        console.error('Erro ao executar os seeds:', error);
    }finally {
        await AppDataSource.destroy();
        console.log('Conexão com o banco de dados encerrada.');
    }
}