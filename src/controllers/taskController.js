const { tasks, saveTasks } = require('../utils/fileStore');
const Task = require('../models/Task');
const Joi = require('joi');

// Schema for task validation
const validateTask = (task) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().iso().required(),
    });
    return schema.validate(task);
};

// Get all tasks
const getAllTasks = (req, res) => {
    res.status(200).json(tasks);
};

// Get a task by ID
const getTaskById = (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
};

// Create a new task
const createTask = (req, res) => {
    const { error } = validateTask(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { title, description, due_date } = req.body;
    const newTask = new Task(title, description, due_date);

    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
};

// Update an existing task
const updateTask = (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { error } = validateTask(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { title, description, due_date } = req.body;
    task.title = title;
    task.description = description;
    task.due_date = new Date(due_date);
    task.updated_at = new Date();

    saveTasks();
    res.status(200).json(task);
};

// Delete a task
const deleteTask = (req, res) => {
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(index, 1);
    saveTasks();
    res.status(204).send(); // No content
};

// Mark a task as complete
const markTaskAsComplete = (req, res) => {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status === 'completed') {
        return res.status(400).json({ error: 'Task is already completed' });
    }

    task.status = 'completed';
    task.updated_at = new Date();

    saveTasks();
    res.status(200).json(task);
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    markTaskAsComplete,
};
