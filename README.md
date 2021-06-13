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

### BUG REPORT

- fix bugs identified in bug report provided by Jest
- bills should be ordered by date from earliest to latest
- if admin correctly fills out login fields, they should be able to navigate to dashboard page.

### BUG HUNT

#### BUG 1

Being connected as an employee, it's possible to type in the information for a bill and add a receipt as proof, then submit the receipt using one of the following formats: jpg, jpeg, png.

Going to the bills page and clicking on the icon to display the receipt: the modal opens, but there's no image.

Being connected as an admin and clicking on the corresponding ticket, the name of the receipt file is null. The same thing happens when clicking on the icon to display the receipt: the modal opens, but there's no image.

**Expected behavior**:

1. The **modal must display the image**
2. On the dashboard, the form associated with the ticket should **display the name of the file**

#### BUG 2

Being connected as an admin and opening up a list of tickets (pending, valued, rejected), then select a ticket, then open up a second list, it is not possible to then select a ticket from the first list.

**Expected behavior**: be able to **open up multiple list** and **consult the tickets in each one**.

#### UNIT & INTEGRATION TESTS

1. views/Bills component: increase coverage to 100%
2. container/Bills component:
   - cover all statements except back-end firebase calls
   - add GET Bills integration test
3. container/NewBill component:
   - cover all statements except back-end firebase calls
   - add POST NewBill integration test

#### E2E TEST

Write an **E2E test plan for the employee flow**. This plan must contain all possible scenarios and adhere to the standard form.

## Requirements

- entirely cover Bills and NewBill files with tests
- use of Jest and Testing Library
- written E2E test plan
- generate Jest coverage report

## Challenges & Achievements

- write a mock to replace firestore functionality
- apply Jest spyOn functionality

<hr>

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
