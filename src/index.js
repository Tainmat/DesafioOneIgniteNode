const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user) => user.username === username);

  if (!user) return response.status(404).json({ error: "User not found" });

  request.user = user;

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  usernameExists = users.some((user) => user.username === username);

  if (usernameExists) {
    return response
      .status(400)
      .json({ error: `Username '${username}' already exists` });
  }

  users.push({
    id: uuidv4(),
    name: name,
    username: username,
    todos: [],
  });

  return response.status(201).json(users[users.length - 1]);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;
  const todoId = uuidv4();
  const newTodo = {
    id: todoId,
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(newTodo);

  return response
    .status(201)
    .json(user.todos.find((todo) => todo.id === todoId));
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  const todoId = request.params.id;

  const todoExists = user.todos.some((todo) => todo.id === todoId);
  if (!todoExists) {
    return response.status(404).json({ error: "Todo not found" });
  }

  user.todos.forEach((todo) => {
    if (todo.id === todoId) {
      title !== null && title !== undefined && title !== ""
        ? (todo.title = title)
        : (todo.title = todo.title);
      deadline !== null && deadline !== undefined && deadline !== ""
        ? (todo.deadline = deadline)
        : (todo.deadline = todo.deadline);
    }
  });

  return response
    .status(201)
    .json(user.todos.find((todo) => todo.id === todoId));
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
