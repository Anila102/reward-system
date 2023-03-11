 
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Tasks = require('../models/Tasks');
const express = require('express');
const router = express.Router();


// Route to add Tasks

router.post('/addtasks', fetchuser,
    [
        body('title', "Enter title ").isLength({ min: 3 }),
        body('description', "Enter description ").isLength({ min: 5 }),


    ],
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const tasks = new Tasks({
                title, description, tag, user: req.user.id
            })
            const savedTasks = await tasks.save();
            res.json(savedTasks);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// Route to fetch all Tasks

router.get("/gettasks", fetchuser, async (req, res) => {

    try {
        const tasks = await Tasks.find({ user: req.user.id })
        res.json(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route to Update Tasks

router.put("/updatetasks/:id", fetchuser, async (req, res) => {

    const { title, description } = req.body;
    const newTask = {};
    if (title) { newTask.title = title }
    if (description) { newTask.description = description }
 
    res.json({ newTask });

})
// Route to delete Tasks

router.delete("/deletetasks/:id", fetchuser, async (req, res) => {

    try {

        let task = await Tasks.findById(req.params.id);
        if (!task) { return res.status(401).send("Not Found") }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Found")
        }

        task = await Tasks.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Task has been deleted", task: task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router