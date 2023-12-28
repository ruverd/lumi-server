<p align="center">
  <a href="https://www.labs-lumi.com.br" target="blank"><img src="https://media.licdn.com/dms/image/C4D0BAQHcIiVqOtOAnQ/company-logo_200_200/0/1660403653527/labs_lumi_logo?e=2147483647&v=beta&t=PUKrxACtqBBUOlPEvda4W0gtKax1QPp-dnjPohA6bcY" width="200" alt="Lumi Logo" /></a>
</p>

  <p align="center">Interview to Software Engineer position</p>

## Installation

```bash
$ npm install
```

## Database

ps: You need to have docker installed on your machine and check if you already have something running on port 5432

```bash
# create database
docker compose up -d

# create seed data (It will create based on electricity bill files)
npm run seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## GraphQL Playground

ps: You need to have the app running, to access the playground. You can use the playground to test the queries and mutations available. You can also check the schema and the documentation. The playground is available on the following URL the default port is 3333. If you change the port, you need to change the URL.

```bash
# playground URL
http://localhost:3333/graphql
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# unit test
$ npm run test
```

## Stay in touch

- Author - [Ruver Dornelas](https://linkedin.com/in/ruver-dornelas)

## License

Nest is [MIT licensed](LICENSE).
