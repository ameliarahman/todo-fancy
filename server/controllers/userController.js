require('dotenv').config()
const FB = require('fb');
const User = require('../models/userModel')
const Decrypt = require('../helpers/decrypt')
const Encrypt = require('../helpers/encrypt')
const jwt = require('jsonwebtoken')


const createUser = (req, res) => {
    Encrypt(req.body.password).then((newPassword) => {
        User.create({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: newPassword
        })
            .then(() => {
                res.status(200).send("1 data successfully inserted!")
            })
            .catch((reason) => {
                res.status(500).send(reason)
            })
    })

}

const getAllDataUsers = (req, res) => {
    User.find({
        username: req.params.name,
    })
        .populate({
            path: 'task',
            match: { status: false }
        })
        .exec((err, dataUsers) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(dataUsers)
            }
        })
}

const getAllDataTodos = (req, res) => {
    User.find({
        username: req.params.name,
    })
        .populate({
            path: 'task'
        })
        .exec((err, dataUsers) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(dataUsers)
            }
        })
}

const getAllFinishedTask = (req, res) => {
    User.find({
        username: req.params.name,
    })
        .populate({
            path: 'task',
            match: { status: true }
        })
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
            dataUser.username = req.body.username

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

const userSignin = (req, res) => {
    User.findOne({
        username: req.body.username
    }).then((dataUser) => {
        if (!dataUser) {
            res.status(401).json({
                message: "Authentication failed. User not found"
            })
        } else {
            Decrypt(req.body.password, dataUser.password)
                .then((hasil) => {
                    if (!hasil) {
                        res.status(401).json({
                            message: "Authentication failed. Password is incorrect"
                        })
                    } else {
                        const payload = {
                            _id: dataUser._id,
                            username: dataUser.username,
                            email: dataUser.email,
                            isLogin: true
                        }
                        jwt.sign(payload,"0idowekcsnvewf38hubUIBBEJKCwjd", function (err, token) {
                            if (err) {
                                throw err
                            } else {
                                res.send({
                                    message: "Login berhasil",
                                    token: token,
                                    data: payload
                                })
                            }
                        })
                    }
                })
                .catch((reason) => {
                    res.send(reason)
                })
        }
    }).catch((reason) => {
        res.send(reason)
    })
}

const signinFb = (req, res) => {
    FB.setAccessToken(req.body.accessToken);
    FB.api(req.body.userID, { fields: ["id", "name", "email"] }, (response) => {
        User.findOne({
            email: response.email
        })
            .then((dataUser) => {
                console.log(dataUser)
                if (dataUser) {
                    jwt.sign(dataUser, process.env.SECRET, function (err, token) {
                        if (err) {
                            throw err
                        } else {
                            res.send({
                                message: "Login berhasil",
                                token: token,
                                data: dataUser
                            })
                        }
                    })
                } else {
                    Encrypt(response.name).then((newPass) => {
                        User.create({
                            username: response.name,
                            email: response.email,
                            password: newPass
                        }).then((dataUser) => {
                            res.status(200).send({
                                msg: "Successfuly inserted",
                                data: dataUser
                            })
                        }).catch((reason) => {
                            res.status(500).send(reason)
                        })
                    })
                }
            })
    })
}

module.exports = {
    createUser,
    getAllDataUsers,
    findDataUserById,
    updateDataUser,
    deleteDataUser,
    getTasksByUserId,
    userSignin,
    signinFb,
    getAllDataTodos,
    getAllFinishedTask
}