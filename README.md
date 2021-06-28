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