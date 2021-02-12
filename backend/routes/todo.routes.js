module.exports = app => {
  const todos = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", todos.create);

  // Retrieve all Tutorials
  router.get("/", todos.findAll);

  // Retrieve all published Tutorials
  router.get("/published", todos.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", todos.findOne);

  // Update a Tutorial with id
  router.put("/:id", todos.update);

  // Delete a Tutorial with id
  router.delete("/:id", todos.delete);

  // Create a new Tutorial
  router.delete("/", todos.deleteAll);

  app.use('/api/todos', router);
};
