import http from 'node:http';
import taskRouter from './routers/taskRouter.js';
import ContentType from './utils/contentType.js';

const REGEX_PATH_PARAMS = /:(\w)+/g;
const PORT = 8080;


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
        if (REGEX_PATH_PARAMS.test(chunckRouter)) {
            continue;
        }
        const chunckReq = reqSplit[i];

        if (chunckRouter !== chunckReq) {
            return false;
        }
    }

    return true;
}

const fillPathParameters = (req, routerUrl) => {
    const params = {};

    const routerSplit = routerUrl.split('/');
    const reqSplit = req.url.split('/');

    for (let i = 0; i < routerSplit.length; i++) {
        const chunckRouter = routerSplit[i];
        if (!REGEX_PATH_PARAMS.test(chunckRouter)) {
            continue;
        }
        params[chunckRouter.replace(':', '')] = reqSplit[i]
    }
    req.params = { ...params };
}

const getBody = (req) => {
    return new Promise((resolve, reject) => {
        let corpoDaSolicitacao = '';

        req.on('data', (chunk) => {
            corpoDaSolicitacao += chunk.toString();
        });

        req.on('end', () => {
            resolve(corpoDaSolicitacao);
        });

        req.on('error', (error) => {
            reject(error);
        });
    });
}

const fillBodyParameter = async (req) => {
    const body = await getBody(req);
    req['body'] = JSON.parse(body);
}
const server = http.createServer(async (req, res) => {
    const method = req.method;
    const contentType = req.headers['content-type'];
    const url = req.url;

    if (!contentType) {
        return res.writeHead(415, {
            'Content-Type': ContentType.JSON
        }).end(JSON.stringify({ message: 'Invalid Content-Type' }));
    }

    const router = taskRouter.find(router => router.method === method &&
        router.consume === contentType &&
        matchUrl(router.url, url));

    if (!router) {
        return res.writeHead(404, {
            'Content-Type': ContentType.JSON
        }).end(JSON.stringify({ message: 'Not found' }));
    }

    fillPathParameters(req, router.url)
    await fillBodyParameter(req);

    return res.writeHead(router.statusReturned, {
        'Content-Type': router.produce
    }).end(JSON.stringify(router.handler(req, res)));
});

server.listen(PORT, () =>
    console.log(`Server is up on port ${PORT}`)
);