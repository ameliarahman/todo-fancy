const User = require('../models/userModel')

const createUser = (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        task: req.body.task
    })
        .then(() => {
            res.status(200).send("1 data successfully inserted!")
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const getAllDataUsers = (req, res) => {
    User.find()
        .populate('task')
        .exec((err, dataUsers) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(dataUsers)
            }
        })
}

const findDataUserById = (req, res) => {
    User.findById(req.params.id)
        .populate('task')
        .exec((err, dataUser) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(dataUser)
            }
        })
}

const updateDataUser = (req, res) => {
    User.findById(req.params.id)
        .populate('task')
        .exec((err, dataUser) => {
            dataUser.name = req.body.name
            dataUser.email = req.body.email
            dataUser.phone = req.body.phone

            dataUser.save()
                .then((dataUser) => {
                    res.status(200).send(dataUser)
                })
                .catch((reason) => {
                    res.status(500).send(reason)
                })
        })
}

const deleteDataUser = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((dataUser) => {
            res.status(200).send(dataUser)
        })
        .catch((reason) => {
            res.status(500).send(reason)
        })
}

const getTasksByUserId = (req, res) => {
    User.findById(req.params.id)
        .populate({ path: 'task', select: ['task', 'status'] })
        .exec((err, dataUser) => {
            if (err) {
                res.status(500).send(reason)
            } else {
                res.status(200).send(dataUser)
            }

        })
}


module.exports = {
    createUser,
    getAllDataUsers,
    findDataUserById,
    updateDataUser,
    deleteDataUser,
    getTasksByUserId
}