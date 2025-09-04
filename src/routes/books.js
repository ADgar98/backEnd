const {getBooks, createBook, deleteBook, updateBook} = require("../controllers/books")

const router = require("express").Router();

router.get("/books", getBooks);
router.post("/books", createBook);
router.delete("/books/:book_id", deleteBook)
router.patch("/books/:book_id", updateBook)

module.exports = router;