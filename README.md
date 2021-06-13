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

#### Preparation

- **feature Investigation Form** on the main search algorithm to compare the two search algorithms developed and to indicate which is the recommended choice.
- **test performance** and determine # of operations per second
- UML **Activity Diagrams** for the core search algorithms
- UML **Activity Diagram** for the entire search functionality including main serach and keyword search

Details:

- The search must be able to be done **via the main field** or **via the tags**
  (ingredients, utensils or device)
- The main search begins when the **user enters 3 characters** in the search bar
- The search is **updated for each new character** entered
- The main search **displays** the first **results as soon as possible**
- The ingredients, utensils and device fields of the **advanced search** only
  suggest recipes from those present on the page
- **Search returns** must be an **intersection of results**. If tags "coconut" and "chocolate" are added to ingredients, results should show only recipes that have both coconut and chocolate

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
