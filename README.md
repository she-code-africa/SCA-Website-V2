# She Code Africa

This is the official website repository for She Code Africa. Guidelines for development and to contribute can be found in [GUIDELINES.md](/GUIDELINES.md). Ensure to read this first if you will be contributing

## Prerequisites

- Git
- Node
- NPM
- MongoDB

## Setting up your development environment

This project is based on the KeystoneJS framework [here](https://github.com/keystonejs/keystone)

- Clone this repository

```
git clone
```

- To install dependencies from package.json, run:

```
npm install
```
_If you run into problems while running npm install, try ```npm audit fix``` then run ```npm install``` again_

- If you are yet to install MongoDB, install and set it up on your device (see installation guide [here](https://docs.mongodb.com/manual/installation/) ). After successful installation, start the MongoDB service

- Then you can proceed to running the application. To start the local server, run:

```
npm start
```
or 

```
node keystone
```

- Visit http://localhost:3000/ to access the server
