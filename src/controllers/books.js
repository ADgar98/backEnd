const Book = require("../models/books");

const getBooks = (request, response) => {
  Book.find({})
    .then((books) => {
      response.send(books);
      response.status(200);
    })
    .catch((error) => {
      response.status(500).send(error.message);
    });
};

const createBook = (request, response) => {
  Book.create({ ...request.body })
    .then((book) => {
      response.status(201).send(book);
    })
    .catch((error) => {
 
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return response.status(404).json({
          message: "Ошибка валидации",
          errors: errors,
        });
      }

      response.status(500).json({
        message: "Ошибка сервера",
        error: error.message,
      });
    });
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;

  Book.findByIdAndDelete(book_id)
    .then(() => {
      response.send("succes");
      response.status(200);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        response.status(404).send("Неверный ID книги");
      } else {
        response.status(500).send("Ошибка базы данных");
      }
    });
};

const updateBook = (request, response) => {
  const { book_id } = request.params;

  Book.findByIdAndUpdate(book_id, { ...request.body })
    .then((book) => {
      response.send(book);
      response.status(200);
    })
    .catch((error) => {
      if (error.name === "CastError") {
        response.status(404).send("Неверный ID книги");
      } else {
        response.status(500).send("Ошибка базы данных");
      }
    });
};

module.exports = {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
};
