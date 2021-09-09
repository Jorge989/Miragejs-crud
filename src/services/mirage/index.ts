import { createServer, Factory, Model, Response } from "miragejs";
import faker from "faker";
type User = {
  name: string;
  email: string;
  createAt: string;
  // senha: string;
};
type Todo = {
  name: string;
  email: string;
  createAt: string;
  // senha: string;
};
export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
      todo: Model.extend<Partial<Todo>>({}),
    },
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        //  senha() {
        //         return faker.internet.senha().toLowerCase();
        //       },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    },

    seeds(server) {
      server.createList("user", 50);
    },
    routes() {
      this.namespace = "api";
      this.timing = 500;
      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;
        const total = schema.all("user").length;
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);
        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );
        return new Response(200, { "x-total-count": String(total) }, { users });
      });
      this.post("/users");

      this.get("/users/:id");
      this.post("/todos");
      this.get("/todos");
      this.namespace = "";
      this.passthrough();
    },
  });
  return server;
}
