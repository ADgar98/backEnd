const http = require("http");
const url = require("url");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const query = parsedUrl.query;

  if (parsedUrl.pathname === "/users") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(`${getUsers()}`);
    return;
  }

  if ("hello" in query) {
    if (query.hello && query.hello.trim() !== "") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(`Hello, ${query.hello}.`);
    } else {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Enter a name");
    }
    return;
  }

  const hasOtherParams = Object.keys(query).length > 0;

  if (hasOtherParams) {
    response.writeHead(500);
    response.end();
  } else {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, World!");
  }
});

server.listen(3003, "127.0.0.1", () => {
  console.log("Сервер запущен на http://127.0.0.1:3003");
});
