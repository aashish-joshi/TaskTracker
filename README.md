# TaskTracker

A simple and intuitive task tracker app that also works offline

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

