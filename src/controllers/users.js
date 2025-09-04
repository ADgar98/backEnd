const User = require("../models/user");
const getUsers = (request, response) => {
  User.find({})
    .then((users) => {
      response.send(users);
      response.status(200);
    })
    .catch((error) => {
      response.status(500).send(error.message);
    });
};

const getUser = (request, response) => {
  const { user_id } = request.params;
  User.findById(user_id)
    .then((user) => {
      response.send(user);
      response.status(200);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        response.status(404).send("Неверный ID пользователя");
      } else {
        response.status(500).send("Ошибка базы данных");
      }
    });
};

const createUser = (request, response) => {
  User.create({ ...request.body })
    .then((user) => {
      response.status(201).send(user);
    })
    .catch((error) => {
      // Ошибки валидации Mongoose
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return response.status(404).json({
          message: 'Ошибка валидации',
          errors: errors
        });
      }
      
      // Ошибка дубликата уникального поля
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return response.status(409).json({
          message: 'Конфликт данных',
          error: `Пользователь с таким ${field} уже существует`
        });
      }
      
      // Общие ошибки базы данных
      console.error('Database error:', error);
      response.status(500).json({
        message: 'Ошибка сервера',
        error: error.message
      });
    });
};

const updateUser = (request, response) => {
  const { user_id } = request.params;

  User.findByIdAndUpdate(user_id, { ...request.body })
    .then((user) => {
      response.send(user);
      response.status(200);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        response.status(404).send("Неверный ID пользователя");
      } else {
        response.status(500).send("Ошибка базы данных");
      }
    });
};

const deleteUser = (request, response) => {
  const { user_id } = request.params;

  User.findByIdAndDelete(user_id)
    .then(() => {
      response.send("succes");
      response.status(200);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        response.status(404).send("Неверный ID пользователя");
      } else {
        response.status(500).send("Ошибка базы данных");
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
