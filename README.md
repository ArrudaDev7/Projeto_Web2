verficar se tem o: Node-v

## requisitos 
node versão 22 ou +
criar o arquivo package
...

npm init
...

Instalar o Express para gerenciar as requisições, rotas e URLs, entre outras funcionalidades

$ npm i express
...

Instalar os pacotes para suporte ao TypeScript

npm i --save-dev @types/express
npm i --save-dev @types/node
...

Instalar o compilador do projeto com TypeScript e reiniciar o projeto quando o arquivo é atualizado

npm i --save-dev ts-node
...

Compilar o arquivo typeScript
...
npx tsc
...

Executar o arquivo gerado com o Node.js
...
node dist/index.js
...

