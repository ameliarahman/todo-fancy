const Todo = require('../models/todoModel')
const User = require('../models/userModel')

const createTodo = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .then((dataUser) => {
            let task = new Todo({
                task: req.body.task,
                status: false,
                tags: req.body.tags
            })
            task.save(function (err) {
                dataUser.task.push(task)
                dataUser.save(function () {
                    res.send("Successfully added 1 task!")
                })
            })
        })
        .catch((reason) => {
            console.log(reason)
        })
}

const getAllTodos = (req, res) => {
    Todo.find()
        .then((dataTodos) => {
            res.status(200).send(dataTodos)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const findTodoById = (req, res) => {
    Todo.findById(req.params.id)
        .then((dataTodo) => {
            res.status(200).send(dataTodo)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const updateTodo = (req, res) => {
    Todo.findById(req.params.id)
        .then((dataTodo) => {
            //console.log(req.body)
            dataTodo.status = dataTodo.status
            dataTodo.task = req.body.task
            dataTodo.tags = req.body.tags

            dataTodo.save()
                .then((dataTodo) => {
                    res.status(200).send(dataTodo)
                })
                .catch((reason) => {
                    res.status(500).send(reason)
                })
        })
}

const deleteDataTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.id)
        .then((dataTodo) => {
            res.status(200).send(dataTodo)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}


const changeStatusDone = (req, res) => {
    Todo.findById(req.params.id)
        .then((dataTodo) => {
            dataTodo.task = dataTodo.task
            dataTodo.tags = dataTodo.tags
            dataTodo.status = true

            dataTodo.save(function () {
                res.send("Status changed!")
            })
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

module.exports = {
    createTodo,
    getAllTodos,
    findTodoById,
    updateTodo,
    deleteDataTodo,
    changeStatusDone
}