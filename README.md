# Postfy

An awesome post API.

[![travis build](https://img.shields.io/travis/matheuspiment/postfy.svg)](https://travis-ci.org/matheuspiment/postfy)
[![codecov coverage](https://img.shields.io/codecov/c/github/matheuspiment/postfy.svg)](https://codecov.io/gh/matheuspiment/postfy)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/matheuspiment/postfy)](https://github.com/matheuspiment/postfy/releases/latest)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/matheuspiment/sigaa-egressos)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

- [Running the app](#running-the-app)
- [Running tests](#running-tests)
- [API endpoints](#api-endpoints)

## Running the app

1. Download this repository.
2. In a terminal, enter the repository folder.
3. Follow the steps according to the option you want:
   - [Development server](#development-server).
   - [Production server](#production-server).

### Development server

#### With node

1. Create a `.env` file with the content of the `.env.example`.
2. Run the command `yarn install` to install the dependencies.
3. A mongo database is required. You can run the `docker-compose up -d` command to setup a mongo database. Feel free to edit the `docker-compose.yml` file.
4. Run the command `yarn dev`.
5. Make requests to `http://localhost:<port>`, where `<port>` is the port set in the `.env` file.

### Production server

#### With node

1. Create a `.env` file with the content of the `.env.example`.
2. Run the command `yarn install` to install the dependencies.
3. Run the command `yarn build`.
4. A mongo database is required. You can run the `docker-compose up -d` command to setup a mongo database. Feel free to edit the `docker-compose.yml` file.
5. Run the command `yarn start`.
6. Make requests to `http://localhost:<port>`, where `<port>` is the port set in the `.env` file.

Done! 😎

## Running tests

1. Create a `.env.test` file with the content of the `.env.example`.
2. Run the command `yarn install` to install the dependencies.
3. A mongo database is required. You can run the `docker-compose up -d` command to setup a mongo database. Feel free to edit the `docker-compose.yml` file.
4. Run the command `yarn test`.

## API endpoints

See [`docs/endpoints.md`](./docs/endpoints.md).
