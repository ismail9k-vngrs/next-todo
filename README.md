# ✅ next-todo

This is a monorepo for a basic todo project 

## Project Setup
To run the project in development mode

1. Create an env variables file
   * ```$ cp .env.example .env```
2. Update `.env` file variables
3. Install project dependances
   * ```$ yarn``` or ```$ npm i```
4. Start project development
   * ```$ yarn dev```

### Run Tests
* Run tests for all the project
  * ```$ yarn test```
* Run tests for the server only
  * ```$ yarn test:server```
* Run tests for the client only
  * ```$ yarn test:server```
* Run tests in watch mode
  * ```$ yarn test:watch```

### Build for production
* Build the project
  * ```$ yarn build```
* Build the server only
  * ```$ yarn build:server```
* Build the client only
  * ```$ yarn build:server```

### Linting
* Lint all the project
  * ```$ yarn lint```
* Lint the server only
  * ```$ yarn lint:server```
* Lint the client only
  * ```$ yarn lint:server```
* Fix linting issues
  * ```$ yarn lint:fix```


### Deploy on GCP
Each commit push to the master branch should triggers a new build, you can **manually** submit a new build using this commend

```
$ gcloud builds submit . --config cloudbuild.yaml --substitutions _API_BASE_URL=$_API_BASE_URL
```

## Tech. Stack

### Client
* Language: [TypeScript](https://www.typescriptlang.org/)
* Package management: [Yarn](https://yarnpkg.com/)
* Framework: [Vuejs 3](https://v3.vuejs.org/)
* CSS preprocessor: [Stylus](https://stylus-lang.com/)
* Build tools:
  * [Webpack](https://webpack.js.org/)
  * [Babel](https://babeljs.io/)
  * [Vue-CLI-Service](https://cli.vuejs.org/guide/cli-service.html)
### Server
* Languages:
  * [TypeScript](https://www.typescriptlang.org/)
  * [Nodejs](https://nodejs.org/)
* Package management: [Yarn](https://yarnpkg.com/)
* Framework: [Expressjs](https://expressjs.com/)
* Database: [Mongodb](https://www.mongodb.com/)


### Testing
* Test runner: [Jest](https://jestjs.io/)
* API mocking: [Fetch-Mock](https://github.com/jefflau/jest-fetch-mock)
* Code linting: [ESLint](https://eslint.org/)