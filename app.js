const express = require('express');
const app = express();
const port = 3000;

const tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true,
    }
];

const validate = (req, res, next) => {
    const { title, description, completed } = req.body;

    // Validation: check if all required fields are present
    if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'title, description, and completed fields are required and must be of correct type.' });
    }
    next();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(validate);

app.get('/tasks', (req, res) => {
    const isCompleted = req.query.completed;
    const filteredTasks = tasks.filter(task => {
        if (isCompleted === 'true') {
            return task.completed === true;
        } else if (isCompleted === 'false') {
            return task.completed === false;
        }
        return true;
    });
    res.status(200).json(filteredTasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(tasks.find(task => task.id === parseInt(req.params.id)));
});


app.post('/tasks', validate, (req, res) => {
    const { title, description, completed } = req.body;

    const task = {
        id: tasks.length + 1,
        title,
        description,
        completed
    };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', validate, (req, res) => {
    // Update an existing task by its ID
    const { title, description, completed } = req.body;
    const task = tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.completed = completed;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    // Delete a task by its ID
    const taskIndex = tasks.findIndex(task => task.id ===
        parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1); 
    res.status(200).send(); // No content
});


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;