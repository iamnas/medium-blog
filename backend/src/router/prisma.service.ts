import { PrismaClient, Prisma } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { HTTPException } from "hono/http-exception";

import { sign } from "hono/jwt";

export const signUp = async (
  DATABASE_URL: string,
  email: string,
  name: string,
  password: string,
  JWT_SECRET: string
) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  const payload = {
    id: user.id,
  };
  const token = await sign(payload, JWT_SECRET);

  return token;
};

export const signIn = async (
  DATABASE_URL: string,
  email: string,
  password: string,
  JWT_SECRET: string
) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });

  if (!user) {
    throw new HTTPException(403, { message: "Invalid user" });
  }

  const payload = {
    id: user.id,
  };
  const token = await sign(payload, JWT_SECRET);

  return token;
};

export const createBlogs = async (
  DATABASE_URL: string,
  id: string,
  title: string,
  content: string
) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      authorId: id,
      title: title,
      content: content,
    },
  });

  return blog;
};

export const updateBlogs = async (
  DATABASE_URL: string,
  id: string,
  blogId: string,
  title?: string ,
  content?: string 
) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.update({
      where: {
        id: blogId,
        authorId: id,
      },
      data: {
        title: title,
        content: content,
      },
    });

    return blog;
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new HTTPException(411, {
        message: error.message,
      });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new HTTPException(411, {
        message: "Invalid User ID",
      });
    }
    // console.log("error.message",error.code,error.message);
    // console.log("error**************************",error);
    throw new HTTPException(404, {
      message: "Somethig went wrong please try again later",
    });
  }
};

export const getBlogs = async (DATABASE_URL: string, id: string) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  const blog = await prisma.post.findUnique({
    where: { id: id },
  });

  return blog;
};

export const getAllBlog = async (DATABASE_URL: string) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  const blog = await prisma.post.findMany({});

  return blog;
};
