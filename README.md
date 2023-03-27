# api-node-typescript

#IDEIA DO PROJETO:
Esta api tem como finalidade o controle e o gerenciamento de uma lista que envolve cidades e pessoas. Algumas cidades já estão cadastradas no banco,
porém é possível criar, deletar e alterar outras. O mesmo para as pessoas.
Para poder utilizar a aplicação, é necessário estar logado no sistema. Toda vez que um login é feito, um token de acesso é disponibilizado ao usuário,
com duração de 24 horas.

#FERRAMENTAS UTILIZADAS
TypeScript: Linguagem utilizada para escrever os códigos da aplicação;
NodeJs: Ambiente no qual a aplicação será executada após a conversão do TypeScript;
Express: Framework com recursos adicionais;
DotEnv: Pacote usado para gerenciar as váriaveis de ambiente;
YUP: Construtor de validações de dados;
Knex: Construtor de consultas de banco de dados;
SQLite3: Biblioteca com uma base de dados pequena embutida, utilizada para testes no ambiente de desenvolvimento;
PostgreSQL: Sistema gerenciador de banco de dados utilizado no ambiente de produção;
JsonWebToken: Utilizado para controle e gerenciamento de permissões na aplicação;
Bcryptjs: Biblioteca para encriptação de dados, utilizado em especial na senha dos usuários;
CORS: Controle da política de privacidade da aplicação, define quem pode fazer requisições para ela;
Jest e Supertest: Ambientes utilizados para desenvolver e executar os testes.

#OBJETIVO DA APLICAÇÃO
Esta aplicação foi desenvolvida para a minha aprimoração pessoal com a ferramenta NodeJs e TypeScript.
