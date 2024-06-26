import { Hono } from "hono";
import { userRouter } from "./router/user";
import { blogRouter } from "./router/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: String;
    JWT_SECRET: String;
  };
}>();

app.use("/*", cors());

app.get("/", (c) => {
  c.env.JWT_SECRET;
  return c.text("Hello Hono!" + c.env.JWT_SECRET);
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
