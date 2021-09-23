import { createServer, Factory, Model, Response } from "miragejs";
import faker from "faker";
type User = {
  name: string;
  email: string;
  createAt: string;
  password: string;
};
type Todo = {
  name: string;
  email: string;
  createAt: string;
  password: string;
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
        password() {
          return faker.internet.password().toLowerCase();
        },
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
      this.post("/todos", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        console.log("attrs", attrs);
        return schema.create("todo", attrs);
      });
      this.get("/todos", (schema, request) => {
        return schema.all("todo");
      });
      this.get("/todos/:id", (schema, request) => {
        let id = request.params.id;

        return schema.find("todo", id);
      });
      this.post("/auth", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        console.log("attrs", attrs);
        return { autorizado: schema.findBy("todo", attrs) != null };
      });

      this.namespace = "";
      this.passthrough();
    },
  });
  return server;
}
