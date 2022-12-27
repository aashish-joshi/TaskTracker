# TaskTracker API

A simple task tracker API.

## Functions
1. Add new task
2. View all open tasks
3. View or update a task (mark complete, update text, etc)
4. Delete task
5. Login
6. Signup

## API

List of API endpoints. All of these exist at `{hostname}/api/{endpoint}`

| Endpoint | Methods allowed | Description |
| ---------|-----------------|-------------|
| `/task` | `POST`, `GET` | Add new task (POST) or get all open tasks (GET) |
| `/task/{id}` | `GET`, `PUT`, `DELETE` | Get, update or  delete a specific task|
| `/auth/token` | `POST` | Generate a token |
| `/auth/signup` | `POST` | Sign up for a new account |
| `/auth/signout` | `POST` | Invalidate issued tokens |

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
