import * as taskService from "../services/taskService.js";
import contentType from "../utils/contentType.js";
import httpMethod from "../utils/httpMethod.js";
import httpStatus from "../utils/httpStatus.js";

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
        statusReturned: httpStatus.NO_CONTENT,
        method: httpMethod.POST,
        url: '/tasks',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.createTask
    },
    {
        statusReturned: httpStatus.NO_CONTENT,
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
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.deleteTask
    },
    {
        statusReturned: httpStatus.NO_CONTENT,
        method: httpMethod.PACTH,
        url: '/tasks/:id/complete',
        consume: contentType.JSON,
        produce: contentType.JSON,
        handler: taskService.concludeTask
    }
];

export default routes;