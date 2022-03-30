<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Local Postgres Database

Make sure to have [Docker](https://runnable.com/docker/install-docker-on-macos) installed.

```bash
# set up local postgres instance
$ docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

# NestJS Documentation

## NestJS Modules

- Each application has at least one module - the root module. That is the starting point of the application.
- Modules are an effective way to organize components by a closely related set of capabilities (e.g. per feature)
- It is a good practice to have a folder per module, containing the module's components.
- Modules are **singletons**, therefore a module can be imported my multiple modules.

## Defining a module

A module is a class decorated with the @Module decorator.
The decorator provides metadata that Nest uses to organize the application structure.

## @Module Decorator Properties

- **providers**: Array of providers - services, repositories, factories, helpers, etc - to be available within the module via dependency injection.
- **controllers**: Array of controllers instantiated within the module.
- **exports**: Array of providers to export to other modules.
- **imports**: List of modules required by this module. Any exported provider by these modules will now be available in our module via dependency injection.

## Controllers

- Responsible for handling incoming **requests** and returning **responses** to the client.
- Bound to a specific **path** (for example, "/tasks" for the task resource).
- Contain **handlers**, which handle **endpoints** and **requests methods** (GET, POST, DELETE, etc).
- Can take advantage of **dependency inejction** to consume providers within the same module.

## Defining a Controller

Controllers are defined by decorating a class with the @Controller decorator.
The decorator accepts a string, which is the **path** to be handled by the controller.

## Defining a Handler

Handlers are simply methods within the controller class, decorated with decorators such as @Get, @Post, @Delete, etc

## Service

- Defined as providers. **Not all providers are services**.
- Common concept within software development and are not exclusive to NestJS, Javascript, or Back-End development.
- Singleton when wrapped with @Injectable() and provided to a module. That means, the same instance will be shared across the application - acting as a single source of truth.
- The main source of business logic. For example, a service will be called from a controller to validate data, create an item in the database and reeturn a response.

## Dependency Injection in NestJS

Any component within the NestJS ecosystem can inject a provider that is decorated with the @Injectable.
We define the dependencies in the constructor of the class. NestJS will take care of the injection for us, and it will then be available as a class property.

## NestJS Pipes

- Pipes operate on the **arguments** to be process by the route handler, just before the hanlder is called.
- Pipes can perform **data transformation** or **data validation**.
- Pipes can return data - either original or modified - which will be passed on to the route handler.
- Pipes can throw exceptions. Exceptions thrown will be handled by NestJS and parsed into an error response.
- Pipes can be asynchronous.

## Default Pipes in NestJS

NestJS ships with useful pipes within the _@nestjs/common_ module.

### ValidationPipe

Validates the compatibility of an entire object against a class (goes well with DTOs). If any property cannot be mapped properly (for example, mismatching type) validation will fail.

A very common use case, therefore having built-in validation pipe is extremely useful.

### ParseIntPipe

By default, arguments are of type **String**. This pipe validates that an argument is a number. If successful, the argument is transformed into a **Number** and passed on to the handler.

## Custom Pipe Implementation

- Pipes are classes annotated with the @Injectible() decorator.
- Pipes must implement the **PipeTransform** generic interface. Therefore, every pipe must have a **transform()** method. This method will be called by NestJS to process the arguments.
- The **transform()** method accepts two paramters:
  - **value**: the value of the processed argument.
  - **metadata** (optional): an object containing metadata about the argument.
- Whatever is returened from the **transform()** method will be passed on to the route handler. Exceptions will be sent back to the client.
- Pipes can be consumed in different ways.

# Object Relational Mapping (ORM) and TypeORM

## Object Relational Mapping (ORM)

Object-Relational Mapping (ORM) is a technique that lets you query and manipulate data from a database, using an object-oriented paradigm.

There are many ORM libraries that allow developers to communicate to the database using their preferred programming language - rather than sending plain queries directly.

## Pros and Cons of using an ORM library

### Pros

- Writing the data model in one place - easier to maintain. Less repetition.
- Lots of things done automatically - database handling, data types, relations etcetera.
- No need to write SQL syntax (easy to learn, hard to master). Using yournatural way of coding.
- Database abstraction - you can change the database type whenever you wish.
- Leverages OOP, therefore things like inheritance are easy to ahieve.

### Cons

- It's an additional tool you have to learn, and ORM libraries are not always simple.
- Performance is alright, but it's easy to neglect.
- Make it easy to forget (or never learn) what's happeneing behind the scenes, which can lead to a variety of maintainability issues.

## TypeORM

TypeORM is an ORM library that can run in Node.js and be used with TypeScript (or JavaScript)

Helps us define and manage entities, repositories, columns, relations, replication, indices, queries, loggin and so much more.
