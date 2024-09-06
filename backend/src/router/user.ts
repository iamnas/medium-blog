import { Hono } from "hono";
import { env } from "hono/adapter";
import { signIn, signUp } from "./prisma.service";
import { signinInput, signupInput } from "@0xnas/medium-common";
import { HTTPException } from "hono/http-exception";
export const userRouter = new Hono();

userRouter.post("/signup", async (c) => {
  const { DATABASE_URL, JWT_SECRET } = env<{
    DATABASE_URL: string;
    JWT_SECRET: string;
  }>(c);

  const body = await c.req.json();
  const { success, data, error } = signupInput.safeParse(body);
  //   if (error) {
  //     throw new HTTPException(411, { message: error.message });
  //   }
  if (!success) {
    throw new HTTPException(411, { message: "Invalid Input Data" });
  }
  const token = await signUp(
    DATABASE_URL,
    data.email,
    data.name,
    data.password,
    JWT_SECRET
  );

  return c.json({
    jwt: token,
  });
});

userRouter.post("/signin", async (c) => {
  const { DATABASE_URL, JWT_SECRET } = env<{
    DATABASE_URL: string;
    JWT_SECRET: string;
  }>(c);

  const body = await c.req.json();

  const { success, data, error } = signinInput.safeParse(body);

  //   if (error) {
  //     throw new HTTPException(411, { message: error.message });
  //   }
  if (!success) {
    throw new HTTPException(411, { message: "Invalid Input Data" });
  }

  const token = await signIn(
    DATABASE_URL,
    data.email,
    data.password,
    JWT_SECRET
  );
  return c.json({ token });
});
