para começar o projeto: npm init

dependencias necessarias: 
 npm i express
 npm i dotenv (para poder inicializar as variáveis de ambiente)

dependencias de desenvolvimento: 
 npm i -D typescript @types/express ts-node-dev
 npm i -D supertest @types/supertest (devDependencie necessária para testes junto com o jest. Ela é reponsável por pegar o servidor inteiro do express e inicializar de forma interna, para que o jest faça as requisições)
 npm i sqlite3 -D (devDependencie para query-builder junto com o knex. Pode também ser instalado como Dependencie afim de evitar problemas ao rodar o projeto em produção, porém, o comum é substitui-lo por um banco de dados postinger no futuro)


--ts-node-dev e arquivo tsconfig.json--
para que o ts-node-dev rode, vá ao package.json em scripts e adicione "dev": "ts-node-dev ./src/index.ts"

para gerar o arquivo tsconfig.json execute: npx tsc --init; depois, para gerar os arquivos .js, execute: npx tsc

 para otimizar a geração dos arquivos .js, em tsconfig.json, procure por "outDir", descomente e mude para "outDir": "./build", para então adicionar os arquivos .js automaticamente em uma pasta chamada build.

 procure também por "rootDir", descomente e mude para "rootDir": "./src". Isso indicará que todos os arquivos .ts que devem ser reescritos para .js estão na pasta src.

 caso utilize o jest para fazer tests, adicione ao arquivo uma nova propriedade. Coloque uma , depois do objeto compilerOptions e adicione:
 //(isto para que ele entenda que os seguintes arquivos/pastas não precisam ser convertidos)
 "exclude": [
    "./jest.config.ts",
    "./node_modules",
    "./tests",
    "./build"
  ]
--ts-node-dev e arquivo tsconfig.json--

dependecias não necessarias porém que ajudam:

 npm i http-status-codes (torna mais fácil o retorno de mensagens de erro ou sucesso)
 npm i yup (facilita as validações das requisições. Muito util)


--Testes--
dependencia para testes:
 npm i -D jest ts-jest @types/jest
 para inicia-lo: npx jest --init (respostas: yes;yes;Use arrow-keys. Return to submit;node;yes;Use arrow-keys. Return to submit;v8;yes)

 configuração do arquivo jest.config.ts:

  (linha 37. Isto porque utilizaremos apenas o json)
  coverageReporters: [
   'json'
  ],

  (linha 135. Add um arquivo de setup para o jest. Configuração inicial para rodar os testes. Lembrando que isto é um caminho, então é necessária a criação da pasta tests na raiz do projeto e dentro dela o arquivo jest.setup.ts)
  setupFilesAfterEnv: [
    './tests/jest.setup.ts'
  ],

  (linha 155. Mostra o caminho onde se encontram os arquivos de testes e quais são eles. Os asteriscos indicam qualquer pasta/ qualquer arquivo que termine com .test.ts)
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],

  (linha 174. Indica que qualquer arquivo que termina com ts/tsx será tratado com o ts-jest)
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
--Testes--

--Database--
Dependencias para Banco de Dados:
 O que são: knex e sqlite3?

 Knex: O knex é um query-builder, ou seja, um construtor de consultas para nodejs. Com ele voce é capaz de manipular bancos relacionais através do node, criando, inserindo registros e realizando consultas. É uma maneira mais simples de fazer tudo isso.

 sqlite3: devDependencie usada para criar um banco de dados local. Ou seja, é um banco de dados, porém mais enxuto que o normal, pois serve para pequenos projetos. Até mesmo os projetos pequenos necessitam de um banco, porém não há necessidade dele ser algo muito grande, então o sqlite3 é perfeito para a ocasião, pois é capaz de criar e executar um mais enxuto localmente.

 npm i knex (devDependencie: npm i sqlite3 -D)

 Depois de configurar o knex e ter adicionado as pastas migrations e seeds, voce pode executar o comando:
 npx knex --knexfile ./src/server/database/knex/Environment.ts migrate:make teste
 para que sejam gerados em um arquivo as funções up e down do knex. Explicação sobre up e down abaixo.

 Para exemplificar os comandos, voce pode adicionar aos scripts do package.json os seguintes comandos:
  "knex:rollback-all": "knex --knexfile ./src/server/database/knex/Environment.ts migrate:rollback --all",
  "knex:rollback": "knex --knexfile ./src/server/database/knex/Environment.ts migrate:rollback",
  "knex:migrate": "knex --knexfile ./src/server/database/knex/Environment.ts migrate:latest",
  "knex:seed": "knex --knexfile ./src/server/database/knex/Environment.ts seed:run",

  "knex:migrate" - fará a migração dos dados para o sqlite. Basicamente, executará a função up das suas migrations em ordem, sem repetir as migrations já executadas que não precisam/tem alteração.
  "knex:rollback" - vai voltar a última migration executada.
  "knex:rollback-all" - Fará o rollback do banco inteiro. Irá voltar todas as migrations.
  "knex:seed" - 

 O que são as MIGRATIONS: São onde ficarão todos os arquivos de create table do nosso banco. Dentro dos arquivos haveram duas funções: up e down.
 up: usado para realizar a migration, ou seja, será executada quando utilizarmos npm run knex:migrate. Por tanto, nele ficará o nosso create table.
 down: usado para desfazer a migration. Será executado quando utilizarmos npm run knex:rollback. Sendo assim, nele haverão comando como o drop table.

 se quiser utilizar o sqlite3 para testes no ambiente de produção, coloque-o como dependencia e não devDependencie. Quando não for utilizar mais para isso, coloque-o novamente como devDependencie.

 npm i pg
 npm i -D @types/pg
 
  Banco de dados Postinger, para utilizar em produção, uma vez que o sqlite3 é um pequeno banco em memória e reseta toda vez que o redeploy é realizado


 npm i bcryptjs - dependencia para criptografia de senhas
 npm i -D @types/bcryptjs - devDependencie de tipagens do bcrypt para o typescript
--Database--

--Validação de usuario--
npm i jsonwebtoken
npm i -D @types/jsonwebtoken

dependencia para a criação e tratamento de tokens de validação

--Validação de usuario--