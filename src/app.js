const http = require("http");
const url = require("url");

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const query = parsedUrl.query;

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

  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello world");
});

server.listen(3003, "127.0.0.1", () => {
  console.log("Сервер запущен на http://127.0.0.1:3003");
});
