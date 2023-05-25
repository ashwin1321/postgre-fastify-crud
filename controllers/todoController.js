export default {
  getTodos: async (request, reply) => {
    const connection = await request.server.pg.connect();
    try {
      const { rows } = await connection.query("SELECT * FROM todo"); // Execute the query on the connection

      if (rows.length === 0) {
        return reply.code(404).send("No todos found");
      }
      reply.code(200).send(rows);
    } catch (error) {
      console.error("Error executing the query", error);
      reply.code(500).send("Internal Server Error");
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },

  createTodo: async (request, reply) => {
    const connection = await request.server.pg.connect();
    try {
      const { title, completed } = request.body;
      const query = "INSERT INTO todo (title, completed) VALUES ($1, $2)";
      const { result } = await connection.query(query, [title, completed]); // Execute the query on the connection
      const createdTodo = {
        title,
        completed,
      };
      reply.code(201).send(createdTodo);
    } catch (error) {
      console.error("Error executing the query", error);
      reply.code(500).send("Internal Server Error");
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },

  updateTodo: async (request, reply) => {
    const connection = await request.server.pg.connect();
    try {
      const { id } = request.params;
      const { title, completed } = request.body;
      const query = "UPDATE todo SET title = $1, completed = $2 WHERE id = $3";
      const result = await connection.query(query, [title, completed, id]); // Execute the query on the connection
      if (result.length === 0) {
        return reply.code(404).send("Todo not found");
      }

      const updatedTodo = {
        id,
        title,
        completed,
      };
      reply.code(200).send(updatedTodo);
    } catch (error) {
      console.error("Error executing the query", error);
      reply.code(500).send("Internal Server Error");
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },

  deleteTodo: async (request, reply) => {
    const connection = await request.server.pg.connect();
    try {
      const { id } = request.params;
      const query = "DELETE FROM todo WHERE id = $1";
      const result = await connection.query(query, [id]); // Execute the query on the connection

      if (result.length === 0) {
        return reply.code(404).send("Todo not found");
      }
      reply.code(200).send("Todo deleted successfully");
    } catch (error) {
      console.error("Error executing the query", error);
      reply.code(500).send("Internal Server Error");
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
};
