const { request, response } = require("express");
const User = require('../models/user')
const getUsers = (request, response) => {

}

const getUser = (request, response) => {
    const {user_id} = request.params;
    response.status(200);
    response.send(`user with id:${user_id}`)
}

const createUser = (request, response) => {
    
    return User.create({...request.body}).then(
        (user)=>{response.status(201).send(user)}
    )
}

const updateUser = (request, response) => {

}

const deleteUser = (request, response) => {
    const {user_id} = request.params;
    response.status(200);
    response.send(`user with ${user_id}`)
}

module.exports = {
getUsers,
getUser,
createUser,
updateUser,
deleteUser
}