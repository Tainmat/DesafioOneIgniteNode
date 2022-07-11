const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { id } = request.headers;
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  usernameExists = users.some((user) => user.username === username);

  if (usernameExists) {
    return response
      .status(400)
      .json({ err: `Username '${username}' already exists` });
  }

  users.push({
    id: uuidv4(),
    name: name,
    username: username,
    todo: [],
  });

  return response.status(201).send(users[users.length - 1].id);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
