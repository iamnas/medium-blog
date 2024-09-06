import { Hono } from "hono";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import {
  createBlogs,
  getAllBlog,
  getBlogs,
  updateBlogs,
} from "./prisma.service";
import { createBlogInput, updateBlogInput } from "@0xnas/medium-common";

export const blogRouter = new Hono();

blogRouter.use("/*", async (c, next) => {
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);

  const header = c.req.header("Authorization") || c.req.header("authorization");
  if (!header?.startsWith("Bearer ")) {
    throw new HTTPException(411, { message: "Invalid authorization token" });
  }
  const token = header?.split(" ")[1];

  const data = await verify(token, JWT_SECRET);

  if (!data) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  c.set("jwtPayload", { id: data.id });

  await next();
});

blogRouter.post("", async (c) => {
  const { id } = c.get("jwtPayload");

  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const body = await c.req.json();

  const { success, data } = createBlogInput.safeParse(body);

  if (!success) {
    throw new HTTPException(411, { message: "Invalid Input Data" });
  }

  const blog = await createBlogs(DATABASE_URL, id, data.title, data.content);
  return c.json({ blog });
});

blogRouter.put("", async (c) => {
  const { id } = c.get("jwtPayload");
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const body = await c.req.json();

  const { success, data } = updateBlogInput.safeParse(body);
  if (!success) {
    throw new HTTPException(411, { message: "Invalid Input Data" });
  }
  const blog = await updateBlogs(
    DATABASE_URL,
    id,
    data.blogId,
    data.title,
    data.content
  );
  return c.json({ blog });
});

blogRouter.get("/bulk", async (c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const blog = await getAllBlog(DATABASE_URL);
  return c.json({ blog });
});

blogRouter.get("/:id", async (c) => {
  const { DATABASE_URL } = env<{
    DATABASE_URL: string;
  }>(c);

  const blogId = c.req.param("id");

  const blog = await getBlogs(DATABASE_URL, blogId);
  return c.json({ blog });
});
