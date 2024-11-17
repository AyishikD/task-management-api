const fs = require('fs');
const path = './data/tasks.json';
const usersPath = './data/users.json';

let tasks = JSON.parse(fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '[]');
let users = JSON.parse(fs.existsSync(usersPath) ? fs.readFileSync(usersPath, 'utf8') : '{}');

const saveTasks = () => fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
const saveUsers = () => fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

module.exports = { tasks, saveTasks, users, saveUsers };
