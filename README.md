# API-NODE-TYPESCRIPT

## Objetivo:
### Este projeto foi usado para minha aprimoração no NodeJs com TypeScript e outros recursos (Knex, JsonWebToken, YUP...).

### Esta API faz parte de um projeto full-stack, que se integra com um Front-End desenvolvido em React com TypeScript, que pode ser encontrado neste repositório: https://github.com/ViniGhiraldi/react-mui-typescript

## Características do Projeto:
### Esta API é capaz de realizar o CRUD com as tabelas de pessoas (que contém nome, sobrenome, email, cidadeId e id) e cidades (que contém nome e id). Possuí também autenticação, validações de dados, criptografia de senha e testes automatizados.

## Como executar:
### Após clonar o projeto, abra-o em seu terminal e digite o seguinte comando:
```
npm i
```
### ou
```
yarn
```
### Aguarde a conclusão da instalação das dependências e em seguida, execute o comando abaixo em seu terminal para criar o banco de dados e suas tabelas em um arquivo .sqlite que será gerado automaticamente:
```
npm run knex:migrate
```
### ou
```
yarn knex:migrate
```
### E em seguida, para inserir alguns registros pré-criados:
```
npm run knex:seed
```
### ou
```
yarn knex:seed
```
### E para inicializar o servidor, basta executar:
```
npm start
```
### ou
```
yarn start
```
### E dentro de alguns instantes a aplicação estará rodando na sua máquina.

### Caso ocorra algum problema, pode ser que a porta 3000 (que é a definida por padrão no front-end). As instruções de como troca-lá estão no repositório do mesmo, cujo o link se encontra logo abaixo. Se esse for de fato o problema, será preciso acessar o arquivo .env aqui na API e substituir os ultimos 4 digitos da variável ENABLED_CORS pela porta que escolheu.

## Observações:
### Esta API integra com um Front-End em um projeto Full-Stack. O mesmo pode ser encontrado neste link: https://github.com/ViniGhiraldi/react-mui-typescript
