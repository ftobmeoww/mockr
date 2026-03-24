const http = require("http");

function createServer(routes, port) {
  const server = http.createServer((req, res) => {
    const match = routes.find(
      (r) => r.method === req.method && r.path === req.url
    );

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    const timestamp = new Date().toLocaleTimeString();

    if (!match) {
      console.log(`  ${timestamp}  404  ${req.method} ${req.url}`);
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Route not found" }));
      return;
    }

    const body = match.body;
    const status = body && body._status ? body._status : 200;
    const delay = body && body._delay ? body._delay : 0;
    const payload = (body && (body._status || body._delay))
      ? Object.fromEntries(Object.entries(body).filter(([k]) => !k.startsWith("_")))
      : body;

    const respond = () => {
      console.log(`  ${timestamp}  ${status}  ${req.method} ${req.url}${delay ? `  (${delay}ms delay)` : ""}`);
      res.writeHead(status);
      res.end(JSON.stringify(payload));
    };

    if (delay > 0) {
      setTimeout(respond, delay);
    } else {
      respond();
    }
  });

  server.listen(port, () => {
    console.log(`\nmockr running on http://localhost:${port}\n`);
    routes.forEach((r) => console.log(`  ${r.method.padEnd(7)} ${r.path}`));
    console.log();
  });

  return server;
}

module.exports = { createServer };
