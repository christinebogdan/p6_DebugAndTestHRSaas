# Billed | Debug and test an HR SaaS

## Developed Skills

- Debug a web application
- Write a manual E2E test plan
- Write integration tests with JavaScript
- Write unit tests with JavaScript

## Description

Billed is a company that produces SaaS solutions for human resources teams. It consists of two user paths: the HR administrator side and the employee side.

Aim of the project was to improve the employee's career path and make it more reliable by **fixing bugs** and **writing tests**. The app had already been developed, the code as well as a description of several bugs were provided.

## Objectives

1. **BUG REPORT**: Fix bugs identified in bug report provided by Jest
2. **BUG HUNT**: The description of several bugs was provided. The described bugs needed to be identified in the code and fixed subsequently.
3. **UNIT & INTEGRATION TESTS**: The Bills and NewBill files needed to be covered with unit and integration tests.
4. **E2E TEST**: Write test plan for manual testing of employee path

## Requirements

- entirely cover Bills and NewBill files with tests
- use of Jest and Testing Library
- written E2E test plan
- generate Jest coverage report

## Challenges & Achievements

- write a mock to replace firestore functionality
- apply Jest spyOn functionality

## Demo

[Link to website](https://christinebogdan.github.io/p5_RecipeSearchEngine/)

## How to run the App locally

_clone the project_
`$ git clone https://github.com/OpenClassrooms-Student-Center/Billed-app-EN.git`

_go to the cloned repo_
`$ cd Billed-app-EN`

_install npm packages (described in package.json)_
`$ npm install`

_install live-server to run a local server_
`$ npm install -g live-server`

_launch the App_
`$ live-server`

_then go to :_
`http://127.0.0.1:8080/`

**How to run all tests with Jest:**

`$ npm run test`

**How to run a single test:**

_install jest-cli_

`$npm i -g jest-cli`

_then_

`$jest src/__tests__/your_test_file.js`

**How to see test coverage:**

`http://127.0.0.1:8080/coverage/lcov-report/`
