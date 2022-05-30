const express = require('express');
const User = require('../mongo/schemas/user');

const userController = express.Router();

userController.get('/', async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers);
})

userController.get('/:id', async (req, res) => {
    const allUsers = await User.findById(req.params.id);
    res.json(allUsers);
})

userController.post('/search', async (req, res) => {
    const allUsers = await User.find(req.body);
    res.json(allUsers);
})

userController.patch('/:id', async (req, res) => {
    const allUsers = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(allUsers);
})

userController.patch('/query/:name', async (req, res) => {
    const filter = {
        name: req.params.name
    };
    const allUsers = await User.findOneAndUpdate(filter, req.body);
    res.json(allUsers);
})

userController.delete('/:id', async (req, res) => {
    const allUsers = await User.findByIdAndDelete(req.params.id);
    res.json(allUsers);
})

userController.post("/", async(req, res) => {
    //recogemos el body de la request
    const body = req.body;

    console.log(body);

    const data = {
        name: body.name,
        email: body.email,
        lastName: body.lastName
    };

    //creamos una nueva instancia de user,
    const newUser = new User(data);

    //lo guardamos en mongo
    await newUser.save()

    //devolvemos respuesta
    res.json(newUser);
});

module.exports = userController;