# GamaEstagio - Tecnologia

Este projeto é uma aplicação CRUD desenvolvida com JHipster como parte do desafio de estágio da Case Gama - Tecnologia. A aplicação tem como objetivo gerenciar o cadastro de alunos e as metas de notas para as diferentes áreas do ENEM.

## Descrição
A aplicação permite que o administrador (login: admin, senha: admin) realize as seguintes operações:

*Cadastro de Alunos:* Inclusão de alunos com informações como nome, série, histórico do ENEM, faculdade e curso preferido.
*Cadastro de Metas:* Associação de metas de notas para cada área do ENEM (LINGUAGENS, HUMANAS, NATUREZA, MATEMATICA e REDACAO). Cada aluno poderá ter, no máximo, uma meta para cada área.

## Tecnologias Utilizadas
- *Backend:* Java, Spring Boot
- *Frontend:* Angular (TypeScript, HTML, CSS)
- *Banco de Dados:* PostgreSQL

## Pré Requisitos
- Java 17
- Node.js e npm

## Execução da Aplicação
### Inicie o Backend:
```bash
./mvnw
```
### Acesse a aplicação:
Abra seu navegador e vá para http://localhost:8080.

### Utilize o acesso de administrador:
Login: admin
Senha: admin
