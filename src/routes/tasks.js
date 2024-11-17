const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    markTaskAsComplete
} = require('../controllers/taskController');


router.use(authMiddleware);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', markTaskAsComplete);

module.exports = router;
