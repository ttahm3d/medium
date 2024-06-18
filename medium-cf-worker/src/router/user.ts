import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@ttahm3d/medium-blog-ttahm3d-types";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json("Incorrect input");
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      username: body.username,
    },
  });

  c.status(201);
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    token,
  });
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json("Incorrect input");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({
        message: "No such user exists",
      });
    }

    c.status(200);
    const token = await sign({ id: user?.id }, c.env.JWT_SECRET);
    return c.json({
      token,
    });
  } catch (e) {
    console.error(e);
    c.status(403);
    return c.json({
      message: "Cannot signin",
    });
  }
});
