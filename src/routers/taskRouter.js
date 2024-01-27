import contentType from "../utils/contentType.js";
import httpMethod from "../utils/httpMethod.js";
import httpStatus from "../utils/httpStatus.js";
import * as taskService from "./services/taskService.js";

const routes = [
    {
        statusReturned: httpStatus.SUCEESS,
        method: httpMethod.GET,
        url: '/tasks',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.getTasks
    },
    {
        statusReturned: httpStatus.CREATED,
        method: httpMethod.POST,
        url: '/tasks',
        produce: contentType.JSON,
        handler: taskService.createTask
    },
    {
        statusReturned: httpStatus.SUCEESS,
        method: httpMethod.PUT,
        url: '/tasks/:id',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.updateTask
    },
    {
        statusReturned: httpStatus.NO_CONTENT,
        method: httpMethod.DELETE,
        url: '/tasks/:id',
        produce: contentType.JSON,
        handler: taskService.deleteTask
    },
    {
        statusReturned: httpStatus.SUCEESS,
        method: httpMethod.PACTH,
        url: '/tasks/:id/complete',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.concludeTask
    }
];

export default routes;