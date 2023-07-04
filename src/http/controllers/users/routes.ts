import { FastifyInstance } from "fastify";
import { register } from "./register";
// import { verifyJWT } from "../../middlewares/verifyJwt";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  /** Authenticated */
  // @TODO: future implementation
  // app.get(
  //   "/me",
  //   {
  //     onRequest: [verifyJWT],
  //   },
  //   profile
  // );
}
