import { WebSocketServer } from 'ws';
import { client } from 'db/client';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', async function connection(ws) {
    await client.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString()
        }
    })
    ws.send("Hi there you are connected to the server on port 3001");
});

