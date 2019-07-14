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

- Create a .env file (it's in .gitignore so you will need to create a local copy yourself) in the project's root folder to contain the needed configuartions, In the .env file, put in the following details

```
COOKIE_SECRET=generate-any-random-string-and-put-it-here
CLOUDINARY_URL=cloudinary://333779167276662:_8jbSi93sWYrfimcl8VKh34rI@keystone-demo

```
You can replace CLOUDINARY_URL with your cloudinary_url. Actual congifuration
details will be included before moving to productiona

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

- To log in as an admin, visit - http://localhost:3000/keystone/signin and log in with the details: _adminuser @ shecodeafrica.com_, _anadmin_. You can create a
new user after successful log in.
