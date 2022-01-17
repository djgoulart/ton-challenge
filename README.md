# Ton's Backend Challenge


![GitHub repo size](https://img.shields.io/github/repo-size/djgoulart/ton-challenge?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/djgoulart/ton-challenge?style=for-the-badge)

<img src="capa.png" alt="exemplo imagem">

> Esta é uma API criada para contar os acessos no site da <a href="https://ton.com.br" target="_blank">Ton</a> e faz <br>
> parte de um desafio técnico proposto pela empresa.


## Acesse a Documentação da API

<a href="http://18.228.30.102/api-docs/" target="__blank"><STRONG>DOCUMENTAÇÃO DA API</STRONG></a>

<br>

## Detalhes do Desafio

Todos os detalhes do desafio estão disponíveis [AQUI](DESAFIO.md), e as principais tarefas são:

- [x] Criar uma rota para incrementar o número de acessos;
- [x] Criar uma rota para consultar o número de acessos;
- [x] Criar uma rota para criar um usuário;
- [x] Criar uma rota para visualizar as informações de um usuário.

<br>

## 💻 Sobre o Projeto

* O projeto foi desenvolvido usando `NODEJS`, `TYPESCRIPT` e `POSTGRES`.
* Na arquitetura, a idéia foi manter as regras de negócio desacoplatas de outras camadas da aplicação <br>
de maneira que pudessem ser reutilizadas num cenário de expansão do projeto.
* Na camada de Infra, o TYPEORM está configurado como ORM padrão, mas pode ser facilmente subistituído <br>
graças ao baixo acoplamento da camada de Negócios.
* Foram realizados testes unitários para os `Casos de Uso` e testes de integração para os `Controllers`
* Dentro do que foi proposto, tentei manter boas práticas como `Clean Code`, `Conventional Commits`, além disso
também tentei manter o código alinhado com os princípios de `SOLID`.
* A documentação da API foi feita usando `Swagger`.

<br>

## 🚀 Instalando Ton's Backend Challenge

Para instalar o projeto você precisa ter `NODEJS` na versão `14.x` ou superior, `DOCKER` e `DOCKER-COMPOSE` ou `POSTGRES`
instalado na máquina onde o projeto será hospedado.

1 - Clone repositório do projeto:
```
git clone https://github.com/djgoulart/ton-challenge.git
```

2 - Instale as dependências usando  NPM ou YARN:
```
npm install
```
3 - Crie um arquivo `.env` na pasta raíz do projeto ou copie o arquivo `.env.example`, insira um valor para a variável `APP_KEY` que está dentro do arquivo.
```
APP_KEY=<sua_chave_de_criptografia>
```
4 - Configure o arquivo `ormconfig.json` com os dados de acesso ao seu banco de dados. Siga o padrão deixado como exemplo no arquivo `ormconfig.example.json`.

4 - Utilize o comando para fazer o build inicial da aplicação: `npm run build` ou `yarn build`. Os arquivos do build serão inseridos em uma pasta `dist` na raiz do projeto.

<br>

## ☕ Criando a estrutura do banco de dados

Rode as migrations para fazer a criação inicial das tabelas.
Lembre-se, sua conexão com o banco de dados precisa estar configurada nesta etapa.

```
`npm run typeorm migrations:run` ou `yarn typeorm migrations:run`
```
<br>


## Rodando o Projeto a partir do build

Abra um terminal de comando dentro da raiz do projeto e digite o comando abaixo:
```
node ./dist/shared/infra/http/server.js;
```

## Atenção aos paths e extensões de arquivos no `ormconfig.json`

Para rodar o projeto a partir dos arquivos de build, atente-se para a correta configuração dos `paths`que mapeiam as entidades, migrations e cli. Eles devem estar apontando para a pasta `dist` e os arquivos possuem a extensão `.js`.
```
"migrations": [
    "./dist/shared/infra/typeorm/migrations/*.js"
  ],
  "entities": [
    "./dist/modules/account/infra/typeorm/entities/*.js",
    "./dist/modules/hits/infra/typeorm/entities/*.js"
  ],
  "cli": {
    "migrationsDir": "./dist/shared/infra/typeorm/migrations"
  }
```

## Rodando o Projeto a partir em ambiente de desenvolvimento

<br>
Abra um terminal de linha comandos dentro da raiz do projeto e digite o comando abaixo:

```
npm run dev
```
O servidor NODE estará rodando em `localhost` na porta `3333`

<br>

## Atenção aos paths e extensões de arquivos no `ormconfig.json`

Para rodar o projeto `em ambiente de desenvolvimento`, atente-se para a correta configuração dos `paths` que mapeiam as entidades, migrations e cli do ORM. Eles devem estar apontando para a pasta `src` e os arquivos possuem a extensão `.ts`.
```
"migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "entities": [
    "./src/modules/account/infra/typeorm/entities/*.ts",
    "./src/modules/hits/infra/typeorm/entities/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
```

## ☕ Rodando Testes

Para rodar os testes após se certificar que seu arquivo `ormconfig.json` está corretamente configurado para o `ambiente de desenvolvimento` use o comando:

```
`npm run test` ou `yarn test`
```
Por padrão os testes irão rodar utilizando um banco `SQLITE` armazenando todos os registros temporáriamente na memória.
`:memory:`
