import { contentType } from "../utils/contentType.js";
import { httpMethod } from "../utils/httpMethod.js";
import * as taskService from "./services/taskService.js";

const routes = [
    {
        method: httpMethod.GET,
        url: '/tasks',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.getTasks
    },
    {
        method: httpMethod.POST,
        url: '/tasks',
        produce: contentType.JSON,
        handler: taskService.createTask
    },
    {
        method: httpMethod.PUT,
        url: '/tasks/:id',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.updateTask
    },
    {
        method: httpMethod.DELETE,
        url: '/tasks/:id',
        produce: contentType.JSON,
        handler: taskService.deleteTask
    },
    {
        method: httpMethod.PACTH,
        url: '/tasks/:id/complete',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.concludeTask
    }
];

export default routes;