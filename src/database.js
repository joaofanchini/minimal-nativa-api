import fs from 'node:fs/promises';

const nameDatabase = 'db.json'

const databasePath = new URL(`../${nameDatabase}`, import.meta.url);

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(`${nameDatabase}`, JSON.stringify(this.#database));
    }

    select(table) {
        return this.#database[table] ?? []
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data;
    }

    findOne(table, id) {
        if (!Array.isArray(this.#database[table])) {
            throw new Error('Model not found');
        }

        return this.#database[table].find(data => data.id === id)
    }

    update(table, data) {
        const index = this.#database[table].findIndex(model => model.id === data.id);
        if (index < 0) {
            throw new Error('Model not found')
        }
        this.#database[table][index] = { ...data };
        this.#persist();
    }

    delete(table, id) {
        const index = this.#database[table].findIndex(model => model.id === id);
        if (index < 0) {
            throw new Error('Model not found')
        }
        const newData = this.#database[table].filter(data => data.id !== id);
        this.#database[table] = [...newData];
        this.#persist();
    }
}