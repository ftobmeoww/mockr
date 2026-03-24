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

    if (!match) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Route not found" }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(match.body));
  });

  server.listen(port, () => {
    console.log(`\nmock-api running on http://localhost:${port}\n`);
    routes.forEach((r) => console.log(`  ${r.method.padEnd(7)} ${r.path}`));
    console.log();
  });
}

module.exports = { createServer };
