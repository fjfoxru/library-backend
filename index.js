const express = require('express');
const dotenv = require('dotenv').config()
const {Book} = require('./models');
const formData = require("express-form-data");
const cors = require('cors');

const stor = {
    books: [],
};
[1, 2, 3].map(el => {
    const newBook = new Book(`Книга ${el}`, `описание ${el}`);
    stor.books.push(newBook);
});
const {books} = stor;


const app = express();
app.use(formData.parse());
app.use(cors());

app.post('/api/user/login', (request, responce) => {
    responce.status(201);
    responce.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books', (request, responce) => {
    responce.json(books);
});

app.get('/api/books/:id', (request, responce) => {
    const {id} = request.params;
    const reqBook = books.find(book => book.id == id);
    if (reqBook) {
        responce.json(reqBook);
    } else {
        responce.status(404);
        responce.json('нет такой книги');
    }
});

app.post('/api/books/', (request, responce) => {
    const {title, description} = request.body;
    const newBook = new Book(title, description);
    books.push(newBook);
    responce.status(201);
    responce.json(newBook);
});

app.put('/api/books/:id', (request, responce) => {
    const {id} = request.params;
    const {title, description} = request.body;
    const reqBook = books.findIndex(book => book.id === id);
    if (reqBook !== -1) {
        books[reqBook] === {
            ...reqBook,
            title,
            description
        }
        responce.json(reqBook);
    } else {
        responce.status(404);
        responce.json('нет такой книги');
    }
});

app.delete('/api/books/:id', (request, responce) => {
    const {id} = request.params;
    const reqBook = books.findIndex(book => book.id == id);
    if (reqBook !== -1) {
        books.splice(reqBook, 1);
        responce.json('ok');
    } else {
        responce.status(404);
        responce.json('нет такой книги');
    }

});


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`server listen ${PORT}`);
});
