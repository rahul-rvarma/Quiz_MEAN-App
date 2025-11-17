# Quiz App (Angular + Node.js + Express + MongoDB)

## Setup

1. Copy `.env.example` to `.env` and set values (especially MONGO_URI and JWT_SECRET).
2. Install dependencies:
   npm install
3. Start server in dev:
   npm run dev
   (or) start:
   npm start
4. Seed sample quiz:
   npm run seed

## Endpoints
Base: http://localhost:4000/api

### Auth
POST /api/auth/register
Body: { name, email, password }

POST /api/auth/login
Body: { email, password }

### Quizzes
GET  /api/quiz                 -> list quizzes (id, title, desc)
GET  /api/quiz/:id             -> quiz details (no correct answers)
POST /api/quiz                 -> create quiz (protected - Bearer token)
PUT  /api/quiz/:id             -> update quiz (protected)
DELETE /api/quiz/:id           -> delete quiz (protected)

GET  /api/quiz/:id/questions   -> returns questions (no correctIndex)
POST /api/quiz/:id/submit      -> submit answers
Body: { answers: [0,1,2,...] } (indices per question)


## Notes  points
- Validation with Joi + database modelling with Mongoose.
- JWT-based auth for protected endpoints.



## Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

