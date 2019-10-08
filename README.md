# Postfy

An awesome post API.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

- [Setting up the editor](#setting-up-the-editor-vscode)
- [Running the app](#running-the-app)

## Running the app

1. Download this repository.
2. In a terminal, enter the repository folder.
3. Follow the steps according to the option you want:
   - [Development server](#development-server).
   - [Production server](#production-server).

### Development server

#### With node

1. Create a `.env` file with the content of the `.env.example`
2. Run the command `yarn install` to install the dependencies.
3. Run the command `yarn dev`.
4. Make requests to `http://localhost:<port>`, where `<port>` is the port set in the `.env` file.

### Production server

#### With node

1. Create a `.env` file with the content of the `.env.example`
2. Run the command `yarn install` to install the dependencies.
3. Run the command `yarn build`.
4. Run the command `yarn start`.
5. Make requests to `http://localhost:<port>`, where `<port>` is the port set in the `.env` file.

Done! 😎
