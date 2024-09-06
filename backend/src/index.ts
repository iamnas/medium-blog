import { Hono } from "hono";

import { HTTPException } from "hono/http-exception";

import { userRouter } from "./router/user";
import { blogRouter } from "./router/blogs";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Hello ",
  });
});

app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)
// Custom error handler middleware
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        statusCode: err.status,
        message: err.message,
      },
      err.status
    );
  }

  // Handle other errors
  return c.json(
    {
      statusCode: 500,
      message: "Internal Server Error",
    },
    500
  );
});

export default app;
