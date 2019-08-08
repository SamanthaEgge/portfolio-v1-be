require('dotenv').config()

const server = require("./server.js");

const port = 8000;
const greeting = "Hi, Samantha!";

server.listen(port, () => {
  console.log(
    `\n*** ${greeting} Portfolio server running on http://localhost:${port} ***\n`
  );
});