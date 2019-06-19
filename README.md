# She Code Africa

This is the official website repository for She Code Africa. Guidelines for development and to contribute can be found in [GUIDELINES.md](/GUIDELINES.md). Ensure to read this first if you will be contributing

## Prerequisites

- Git
- Node
- NPM
- Yarn

## Setting up your development environment

The development environment from this project was built based off the React-Starter Kit template and the installation guide is based off the getting started guide [here](https://github.com/kriasoft/react-starter-kit/blob/master/docs/getting-started.md)

- Clone this repository

```
git clone
```

- To install dependencies from package.json, run:

```
yarn install
```

- To start the server in development mode, run:

```
yarn start
```

- Visit http://localhost:3000/ to access the server and http://localhost:3000/graphql to access the GraphQL server
- To see how the app works in production/release mode, run:

```
yarn start -- --release
```

## Building

- To build without running a dev server, run:

```
yarn run build
```

- To build for production environment

```
yarn run build -- --release
```

- For production docker build, run:

```
yarn run build -- --release --docker
```

- To check for syntax error and potential issues, run:

```
yarn run lint
```

## Unit Tests

- To run unit tests with Jest, run:

```
yarn run test
```

- To launch unit test runner and start watching for changes, run:

```
yarn run test:watch
```

## Deployment

To deploy the app, run:

```
yarn run deploy
```
