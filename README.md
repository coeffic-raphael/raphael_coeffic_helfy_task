# Task Manager App

![CI](https://github.com/coeffic-raphael/raphael_coeffic_helfy_task.git)

A full-stack task management application built with React, Express.js, and Node.js.

Users can create, edit, delete, filter, and mark tasks as completed or pending. Tasks are displayed in an animated endless carousel.

## Features

- Create tasks with a title, description, and priority
- Edit existing tasks
- Delete tasks with confirmation
- Mark tasks as completed or pending
- Filter tasks by All, Completed, or Pending
- Display tasks in an animated infinite carousel
- Display visual priority badges
- Handle loading and error states
- Responsive design

## Technology Stack

### Backend

- Node.js
- Express.js
- CORS
- In-memory data storage

### Frontend

- React
- React hooks
- Fetch API
- Regular CSS
- Vanilla JavaScript carousel

No external carousel or CSS libraries are used.

## Project Structure

```text
task-manager/
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

## Requirements

- Node.js
- npm

## Backend Setup

Open a terminal from the project root:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:4000
```

## Frontend Setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

Both servers must be running at the same time.

## API Endpoints

### Get All Tasks

```http
GET /api/tasks
```

Response: `200 OK`

### Create a Task

```http
POST /api/tasks
```

Example request body:

```json
{
  "title": "Learn Express",
  "description": "Complete the backend API",
  "priority": "high"
}
```

Response: `201 Created`

### Update a Task

```http
PUT /api/tasks/:id
```

Example request body:

```json
{
  "title": "Updated task",
  "description": "Updated description",
  "priority": "medium"
}
```

Response: `200 OK`

### Toggle Task Completion

```http
PATCH /api/tasks/:id/toggle
```

Response: `200 OK`

### Delete a Task

```http
DELETE /api/tasks/:id
```

Response: `204 No Content`

## Task Model

```js
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  priority: "low" | "medium" | "high"
}
```

## Error Responses

The API uses meaningful HTTP status codes:

- `400 Bad Request` for invalid input
- `404 Not Found` for missing tasks or routes
- `500 Internal Server Error` for unexpected errors

Errors are returned as JSON:

```json
{
  "error": "Error message"
}
```

## Design Decisions

- Tasks are stored in memory because no database was required.
- Data is reset whenever the backend server restarts.
- The backend generates task IDs, creation dates, and the initial completion status.
- The React application keeps the task list in the main `App` component.
- API requests are centralized in `taskService.js`.
- The carousel is implemented with React state, CSS transforms, and cloned boundary slides.
- No external carousel library is used.
- The carousel pauses while the user hovers over it or interacts with it.
- Empty and filtered task lists are handled gracefully.

## Time Spent

- Backend API: approximately 60 minutes
- Frontend core features: approximately 90 minutes
- Carousel and styling: approximately 40 minutes
- Testing and documentation: approximately 40 minutes

Total: approximately 4 hours