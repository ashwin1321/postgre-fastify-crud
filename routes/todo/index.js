import todoController from "../../controllers/todoController.js";

export default async function (fastify, opts) {
  fastify.get("/", todoController.getTodos);

  fastify.post("/", todoController.createTodo);

  fastify.put("/:id", todoController.updateTodo);

  fastify.delete("/:id", todoController.deleteTodo);
}
