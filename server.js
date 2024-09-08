require("dotenv").config();
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const cors = require("cors");

const port = parseInt(process.env.NODE_PORT || "3000", 10);
const hostname = "localhost";
const dev = process.env.NODE_ENV !== "production";
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "production") {
  console.log("Is production");
}
const app = next({ dev, hostname, port });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
