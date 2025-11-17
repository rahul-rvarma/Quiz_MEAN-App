# Quiz App (Node.js + Express + MongoDB)

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

## Example: Submit answers (curl)
curl -X POST http://localhost:4000/api/quiz/<QUIZ_ID>/submit \
 -H "Content-Type: application/json" \
 -d '{"answers":[2,1,1,1,2]}'

## Notes / Interview talking points
- Validation with Joi + database modelling with Mongoose.
- JWT-based auth for protected endpoints.
- Seed script included to demo a ready quiz quickly.
- Clean folder structure to show maintainable code in interviews.
