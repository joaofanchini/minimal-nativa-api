const tempTasks = [
    {
        id: 1,
        name: 'nome'
    }
]

export const getTasks = (req, res) => {
    return [...tempTasks]
}

export const createtask = (req, res) => {
    return [];
}

export const updateTask = (req, res) => {
    return req.params;
}

export const deleteTask = (req, res) => {
    return [];
}

export const concludeTask = (req, res) => {
    return [];
}