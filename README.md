REST API

A simple REST API built with Node.js and Express for managing tasks.

Installation

Clone the project and install dependencies:

npm install

Run the Server

Start the API:

node server.js

(Optional if nodemon is installed)

npx nodemon server.js

Server runs at:

http://localhost:3000

API Endpoints

GET /tasks

Get all tasks.

Sample response:

[
  {
    "id": 1,
    "title": "Learn Express"
  }
]

---

GET /tasks/:id

Get a single task by ID.

Sample request:

GET /tasks/1

Sample response:

{
  "id": 1,
  "title": "Learn Express"
}

---

POST /tasks

Create a new task.

Sample request:

{
  "title": "Build REST API"
}

Sample response:

{
  "id": 2,
  "title": "Build REST API"
}

Status: "201 Created"

---

PUT /tasks/:id

Update an existing task.

Sample request:

{
  "title": "Updated Task"
}

Sample response:

{
  "id": 2,
  "title": "Updated Task"
}

Status: "200 OK"

---

DELETE /tasks/:id

Delete a task.

Sample response:

{
  "message": "Task deleted"
}

Status: "200 OK"

Notes

- Data is stored in memory (no database).
- Data resets when the server restarts.
- "node_modules" is ignored using ".gitignore".Also create a .gitignore file:

node_modules

That keeps your GitHub repo clean and avoids uploading dependencies.