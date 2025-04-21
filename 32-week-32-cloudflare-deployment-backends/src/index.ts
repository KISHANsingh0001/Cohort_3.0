import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import jwt from 'jsonwebtoken'
const app = new Hono()



app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const { username, password } = await c.req.json();
    console.log(username, password);

    const response = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    return c.json({
      message: 'User created successfully',
      userId: response.id,
      username: response.username,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    // @ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { username, password } = await c.req.json();

    // Find the user by username and password
    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password, // Directly compare the plain-text password
      },
    });

    if (!user) {
      return c.json({ error: 'Invalid username or password' }, 401);
    }

    const userId = user.id;

    // Generate a JWT token
    //@ts-ignore
    if (!c.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment');
    }
    //@ts-ignore
    const token = jwt.sign({ userId: userId }, c.env.JWT_SECRET);

    return c.json({
      message: 'User signed in successfully',
      token,
    });
  } catch (e) {
    console.log(e);
    return c.json({ error: 'Failed to sign in' }, 500);
  }
});
app.post('/api/v1/todo', (c) => {
  return c.text('Hello Hono!')
});

app.get('/api/v1/todos', (c) => {
  return c.text('Hello Hono!')
});


export default app
