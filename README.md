# TaskTracker API

API definition for the TaskTracker project.

The TaskTracker is part of a personal project to showcase a basic CRUD application. The API using NodeJS, ExpressJS and MongoDB stack. 

Registered users can authenticate API requests a JWT token requested by supplying their username and password in the API.

## Functions

### Available

The following functions are currently supported by the API.

- Generate JWT
- Add new task
- View all open tasks
- View one task
- Update one task
- Delete one task

### To do

I hope to add the following functions to the API.

- Update tasks in bulk
- Delete tasks in bulk


## Endpoints

List of API endpoints.

| Endpoint | Methods allowed | Description |
| ---------|-----------------|-------------|
| `/task` | `POST`, `GET` | Add new task (POST) or get all open tasks (GET) |
| `/task/{id}` | `GET`, `PUT`, `DELETE` | Get, update or  delete a specific task|
| `/auth/token` | `POST` | Generate a token |

> All `/task` endpoints require an Authorization header with a JWT issued using `/auth/token`.

## Schema

### Task

| Field | Type | Purpose | 
|-------|------|---------|
| `id` | MongoDB ID | A unique alphanumeric ID for the task.|
| `user_id` | string | Unique ID of the user that created the task.|
| `name` | string | The name of the task. |
| `body` | string | The body of the task. |
| `status` | string | Defines the status of the task. new or done|
| `due` | datetime | The date & time on which the task is due. |

### User

| Field | Type | Purpose | 
|-------|------|---------|
| `id` | mongo ID | Unique user ID |
| `f_name` | string | First name of the user |
| `l_name` | string | Last name of the user |
| `email` | string | Email address of the user |
| `password` | string | Hashed password |
