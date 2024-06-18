import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  /**
   * Check if the header has Bearer token
   * If not dont allow user to go ahead
   * If yes allow user to proceed
   */
  const authHeader = c.req.header("authorization")?.split(" ")[1];
  if (!authHeader) {
    c.status(401);
    return c.json({
      message: "Please include auth token in header",
    });
  }

  const token = await verify(authHeader, c.env.JWT_SECRET);
  if (!token) {
    c.status(401);
    return c.json({
      message: "Unauthorized",
    });
  }

  c.set("userId", token.id as string);
  await next();
});

blogRouter.post("/", async (c) => {
  /**
   * Get title and content from req.json()
   *
   */

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const newBlogpost = await prisma.post.create({
    data: {
      content: body.content,
      title: body.title,
      authorId: c.get("userId"),
    },
  });

  c.status(201);
  return c.json({
    message: "Created new blogpost",
    blog: newBlogpost,
  });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const updatedBlogPost = await prisma.post.update({
    where: {
      id: body.id,
      authorId: c.get("userId"),
    },
    data: {
      published: body.published,
      title: body.title,
      content: body.content,
    },
  });

  c.status(200);
  return c.json({
    message: "Updated blogpost",
    blog: updatedBlogPost,
  });
});

blogRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany();

  c.status(200);
  return c.json({
    blogs: blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const params = await c.req.param();

    const blogs = await prisma.post.findFirst({
      where: {
        id: params.id,
      },
    });

    c.status(200);
    return c.json({
      blogs: blogs,
    });
  } catch (e) {}
});
