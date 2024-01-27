import { contentType } from "../utils/contentType.js";
import { httpMethod } from "../utils/httpMethod.js";
import * as taskService from "./services/taskService.js";

const routes = [
    {
        method: httpMethod.GET,
        path: '/tasks',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.getTasks
    },
    {
        method: httpMethod.POST,
        path: '/tasks',
        produce: contentType.JSON,
        handler: taskService.createTask
    },
    {
        method: httpMethod.PUT,
        path: '/tasks/:id',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.updateTask
    },
    {
        method: httpMethod.DELETE,
        path: '/tasks/:id',
        produce: contentType.JSON,
        handler: taskService.deleteTask
    },
    {
        method: httpMethod.PACTH,
        path: '/tasks/:id/complete',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.concludeTask
    }
];

export default routes;