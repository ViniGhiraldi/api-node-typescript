# API-NODE-TYPESCRIPT

## Objetivo:
### Este projeto foi usado para minha aprimoração no NodeJs com TypeScript e outros recursos (Knex, JsonWebToken, YUP...).

### Esta API faz parte de um projeto full-stack, que se integra com um Front-End desenvolvido em React com TypeScript, que pode ser encontrado neste repositório: https://github.com/ViniGhiraldi/react-mui-typescript

### Mais detalhes nas observações.

## Características do Projeto:
### Esta API é capaz de realizar o CRUD (cadastrar, alterar, deletar e consultar) com as tabelas de pessoas (que contém nome, sobrenome, email, cidadeId e id) e cidades (que contém nome e id). Possuí também autenticação, validações, criptografia de senha e testes com o Jest.

## Como executar:
### Após clonar o projeto, abra-o em seu terminal e digite o seguinte comando:
```
npm i
```
### Aguarde a conclusão da instalação das dependências e em seguida, execute em seu terminal para criar o banco de dados e suas tabelas em um arquivo .sqlite que será gerado automaticamente:
```
npm run knex:migrate
```
### E em seguida:
```
npm run knex:seed
```
### Agora basta rodar:
```
npm start
```
### E dentro de alguns instantes a aplicação estará rodando na sua máquina.

### Se houver algum erro, pode ser por causa do arquivo .sqlite, que não está sendo executado. Para isso, dentro do VS Code, clique com o botão direito em cima do arquivo e em Open Database. Certifique-se também de não ter nenhum processo em execução na porta 3333. Caso tenha, recomenda-se a troca do valor na variável PORT no arquivo .env. Lembrando que: se fizer isso, será necessário alterar no Environment do Front-End também. As instruções de como fazer isso estão no README.md do repositório citado.

### Caso o problema seja na porta 3000 (a que é utilizada por padrão para rodar o front-end), as instruções de como troca-lá estão no repositório do mesmo, mas é preciso acessar o arquivo .env aqui na API e substituir os ultimos 4 digitos da variável ENABLED_CORS pela porta definida no Front-End.

## Observações:
### Esta API integra com um Front-End em um projeto Full-Stack. O mesmo pode ser encontrado neste link: https://github.com/ViniGhiraldi/react-mui-typescript