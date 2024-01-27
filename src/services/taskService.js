import { randomUUID } from 'node:crypto';
import { Database } from '../database.js';
import Task from "../model/task.js";

const database = new Database();

export const getTasks = (req, res) => {
    return database.select(Task.name)
}

export const createTask = (req, res) => {
    const { title, description } = req?.body
    database.insert(Task.name, new Task(randomUUID(), title, description, new Date()));
}

export const updateTask = (req, res) => {
    const id = req.params.id;
    const { title, description } = req?.body
    let task = database.findOne(Task.name, id);
    task.title = title
    task.description = description
    task.updated_at = new Date()
    database.update(Task.name, task)
}

export const deleteTask = (req, res) => {
    database.delete(Task.name, req.params.id)
}

export const concludeTask = (req, res) => {
    const id = req.params.id;
    let task = database.findOne(Task.name, id);
    task.completed_at = new Date()
    database.update(Task.name, task)
}