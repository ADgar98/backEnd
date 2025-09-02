// const http = require("http");
// const url = require("url");
// const getUsers = require("./modules/users");
// const mongoose = require('mongoose');


// console.log('tset');

// // Подключение к MongoDB с обработкой ошибок
// mongoose.connect('mongodb://localhost:27017/BACKEND', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('❌ MongoDB connection error:', error.message);
// });

// const server = http.createServer((request, response) => {
//   const parsedUrl = url.parse(request.url, true);
//   const query = parsedUrl.query;

//   if ("users" in query) {
//     response.writeHead(200, { "Content-Type": "application/json" });
//     response.end(`${getUsers()}`);
//     return;
//   }

//   if ("hello" in query) {
//     if (query.hello && query.hello.trim() !== "") {
//       response.writeHead(200, { "Content-Type": "text/plain" });
//       response.end(`Hello, ${query.hello}.`);
//     } else {
//       response.writeHead(400, { "Content-Type": "text/plain" });
//       response.end("Enter a name");
//     }
//     return;
//   }

//   const hasOtherParams = Object.keys(query).length > 0;

//   if (hasOtherParams) {
//     response.writeHead(500);
//     response.end();
//   } else {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("Hello, World!");
//   }
// });

// server.listen(3003, "127.0.0.1", () => {
//   console.log("Сервер запущен на http://127.0.0.1:3003");
// });
const express = require('express')
const dotenv = require('dotenv')
const userRouters = require('./routes/users')

dotenv.config()

const app = express()

const {
  PORT = 3003,
  API_URL = "http://127.0.0.1"
} = process.env

app.get('/', (request, response) => {
  response.status(200)
response.send('Hello world')
})

app.post('/', (request, response) => {
  response.status(200)
response.send('Hello Post')
})



app.use(userRouters)

app.listen(PORT, ()=>{
  console.log(`сервер запущен по адресу ${API_URL}:${PORT}`);
  
})