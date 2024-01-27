import http from 'node:http';
import taskRouter from './routers/taskRouter.js';

const port = 8080;

const regexPathParamters = /:(\w)+/g;


const matchUrl = (routerUrl, reqUrl) => {
    if (routerUrl.indexOf(':') < 0) {
        return routerUrl === reqUrl;
    }


    const routerSplit = routerUrl.split('/');
    const reqSplit = reqUrl.split('/');

    if (routerSplit.length !== reqSplit.length) {
        return false;
    }

    for (let i = 0; i < routerSplit.length; i++) {
        const chunckRouter = routerSplit[i];
        if (regexPathParamters.test(chunckRouter)) {
            continue;
        }
        const chunckReq = reqSplit[i];

        if (chunckRouter !== chunckReq) {
            return false;
        }
    }

    return true;
}

const server = http.createServer((req, res) => {
    const method = req.method;
    const contentType = req.headers['content-type'];
    const url = req.url;

    if (!contentType) {
        return res.writeHead(415).end();
    }

    const router = taskRouter.find(router => router.method === method &&
        router.consume === contentType &&
        matchUrl(router.url, url));

    if (!router) {
        return res.writeHead(404).end();
    }

    return res.writeHead(200, 'Sucesso')
        .end(JSON.stringify(router.handler(req, res)));
});

server.listen(port, () =>
    console.log(`Server up in port ${port}`)
);