import http from 'node:http';
import taskRouter from './routers/taskRouter.js';

const port = 8080;

const server = http.createServer((req, res) => {
    const method = req.method;
    const contentType = req.headers['content-type'];
    const url = req.url;

    if (!contentType) {
        return res.writeHead(415).end();
    }

    const router = taskRouter.find(router => router.method === method &&
        router.consume === contentType &&
        router.path === url);

    if (!router) {
        return res.writeHead(404).end();
    }

    return res.writeHead(200, 'Sucesso')
        .end(JSON.stringify(router.handler(req, res)));
    // return res.writeHead(200).end('texto');
});

server.listen(port, () =>
    console.log(`Server up in port ${port}`)
);