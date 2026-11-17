# Task App (Node.js + Express + React)

A simple full stack CRUD app for learning.

## 1. Set up MySQL (once)
Make sure MySQL is running, then create the database and table:
    mysql -u root -p < server/schema.sql

Copy the env file and put in your MySQL password:
    cd server
    cp .env.example .env      (Windows: copy .env.example .env)

## 2. Run it (two terminals)

Terminal 1 - backend (http://localhost:5000):
    cd server
    npm install
    npm run dev

Terminal 2 - frontend (http://localhost:5173):
    cd client
    npm install
    npm run dev

Open http://localhost:5173

## How it fits together
React (browser) --fetch--> Express API --> MySQL

| Method | Route            | Purpose        |
|--------|------------------|----------------|
| GET    | /api/tasks       | list tasks     |
| POST   | /api/tasks       | add a task     |
| PUT    | /api/tasks/:id   | toggle done    |
| DELETE | /api/tasks/:id   | delete a task  |

## Ideas to extend
1. Add a users table and link tasks to users (foreign key)
2. Add an edit-title feature (PATCH route)
3. Add a filter: All / Active / Done
4. Add user login with JWT
