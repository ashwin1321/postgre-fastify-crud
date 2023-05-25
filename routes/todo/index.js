import todoController from "../../controllers/todoController.js";
import {
  getTodosOpts,
  createTodoOpts,
  updateTodoOpts,
  deleteTodoOpts,
} from "../../schemas/todoSchemas.js";

export default async function (fastify, opts) {
  fastify.get("/", { schema: getTodosOpts.schema }, todoController.getTodos);

  fastify.post(
    "/",
    { schema: createTodoOpts.schema },
    todoController.createTodo
  );

  fastify.put(
    "/:id",
    { schema: updateTodoOpts.schema },
    todoController.updateTodo
  );

  fastify.delete(
    "/:id",
    { schema: deleteTodoOpts.schema },
    todoController.deleteTodo
  );
}
