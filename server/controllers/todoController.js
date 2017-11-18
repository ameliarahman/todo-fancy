const Todo = require('../models/todoModel')

const createTodo = (req, res) => {
    Todo.create({
        task: req.body.task,
        status: req.body.status,
        tags: req.body.tags
    })
        .then(() => {
            res.status(200).send("1 data successfully inserted!")
        })
        .catch((reason) => {
            res.status(500).send(reason)
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
            dataTodo.status = req.body.status
            dataTodo.task = req.body.task
            req.body.tags.forEach((tag) => {
                dataTodo.tags.push(tag)
            });
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


module.exports = {
    createTodo,
    getAllTodos,
    findTodoById,
    updateTodo,
    deleteDataTodo
}