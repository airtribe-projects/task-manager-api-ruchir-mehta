The project allows you to perform CRUD operation on tasks.

A task contains an id, title, description and a completed status.

To test the API endpoints:

1. npm install
2. npm run dev

The below is the API documentation:

GET /tasks: Retrieve all tasks.

GET /tasks/:id: Retrieve a specific task by its ID.

POST /tasks: Create a new task with the required fields (title, description, completed).

PUT /tasks/:id: Update an existing task by its ID.

DELETE /tasks/:id: Delete a task by its ID.