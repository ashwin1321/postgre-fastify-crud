import fp from "fastify-plugin";
import dotenv from "dotenv";
import postgres from "@fastify/postgres";
dotenv.config();

export default fp(async (fastify, opts) => {
  try {
    fastify.register(postgres, {
      connectionString: process.env.DATABASE_URL,
    });
    console.log("Connection to database established");
  } catch (error) {
    console.log(error);
  }
});
