const { v4: uuidv4 } = require('uuid');

class Task {
    constructor(title, description, due_date) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.status = 'pending';
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}

module.exports = Task;
