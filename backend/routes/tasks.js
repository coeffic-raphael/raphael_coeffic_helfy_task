const express = require('express');
const router = express.Router();
const tasks = [];

let nextId = 1;

const validPriorities = ['low', 'medium', 'high'];



router.get('/', (req, res) => {
    res.status(200).json(tasks);
});



router.post('/', (req, res) => {
    const { title, description, priority } = req.body || {};
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }

    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description is required' });
    }

    
    
    if (typeof priority !== 'string' || !validPriorities.includes(priority.toLowerCase())) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }
    
    const newTask = {
        id : nextId++,
        title : title.trim(),
        description : description.trim(),
        completed: false,
        createdAt: new Date(),
        priority: priority.toLowerCase(),
    };

    tasks.push(newTask);
    
    return res.status(201).json(newTask);
});


router.put('/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({error: 'Task not found'});
    }

    const { title, description, priority } = req.body || {};
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({error: 'Title is required'});
    }
    
    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({error: 'Description is required'});
    }
    
    if (typeof priority !== 'string' || !validPriorities.includes(priority.toLowerCase())) {
        return res.status(400).json({error: 'Priority must be low, medium, or high'});
    }
    
    const updatedTask = {
        ...tasks[taskIndex],
        title: title.trim(),
        description: description.trim(),
        priority: priority.toLowerCase(),
    };

    tasks[taskIndex] = updatedTask;

    return res.status(200).json(updatedTask);
});


router.patch("/:id/toggle", (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            error: "Task not found",
        });
    }

    task.completed = !task.completed;

    return res.status(200).json(task);
});


router.delete("/:id", (req,res) => {

    const taskId = Number(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found",

        });
    }

    tasks.splice(taskIndex, 1);

    return res.status(204).send();
    
});

module.exports = router;