const Task = require('../models/task')

class controller {
    async postTask(req, res) {
        try {
            const task = await new Task({
                task: req.body.task
            })
            const saveTask = await task.save()
            res.status(200).json(saveTask)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async getTasks(req, res) {
        try {
            const tasks = await Task.find()
            res.status(200).json(tasks)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async putTask(req, res) {
        try {
            const updateTask = await Task.findOneAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json('Task update')
        } catch (e) {
            res.status(500).json({message: e.message})

        }
    }

    async deleteTask(req, res) {
        try {
            const deleteTask = await Task.findOneAndDelete(req.params.id)
            res.status(200).json('Task deleted')
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
}

module.exports = new controller()