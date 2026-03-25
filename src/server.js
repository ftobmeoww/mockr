const http = require("http");

function matchRoute(routes, method, url) {
  const exact = routes.find(r => r.method === method && r.path === url);
  if (exact) return { route: exact, params: {} };

  for (const r of routes) {
    if (r.method !== method) continue;
    const routeParts = r.path.split("/");
    const urlParts = url.split("?")[0].split("/");
    if (routeParts.length !== urlParts.length) continue;
    const params = {};
    const match = routeParts.every((part, i) => {
      if (part.startsWith(":")) { params[part.slice(1)] = urlParts[i]; return true; }
      return part === urlParts[i];
    });
    if (match) return { route: r, params };
  }
  return null;
}

function resolveBody(body) {
  if (body && body._random && Array.isArray(body._random)) {
    return body._random[Math.floor(Math.random() * body._random.length)];
  }
  return body;
}

function createServer(routes, port) {
  const server = http.createServer((req, res) => {
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
    const result = matchRoute(routes, req.method, req.url);

    if (!result) {
      console.log(`  ${timestamp}  404  ${req.method} ${req.url}`);
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Route not found" }));
      return;
    }

    const { route, params } = result;
    const body = resolveBody(route.body);
    const status = body && body._status ? body._status : 200;
    const delay = body && body._delay ? body._delay : 0;
    const payload = (body && (body._status || body._delay))
      ? Object.fromEntries(Object.entries(body).filter(([k]) => !k.startsWith("_")))
      : body;

    const finalPayload = (payload && typeof payload === "object" && !Array.isArray(payload))
      ? { ...payload, ...Object.keys(params).length ? { params } : {} }
      : payload;

    const respond = () => {
      console.log(`  ${timestamp}  ${status}  ${req.method} ${req.url}${delay ? `  (${delay}ms delay)` : ""}${Object.keys(params).length ? `  params: ${JSON.stringify(params)}` : ""}`);
      res.writeHead(status);
      res.end(JSON.stringify(finalPayload));
    };

    delay > 0 ? setTimeout(respond, delay) : respond();
  });

  server.listen(port, () => {
    console.log(`\nmockr running on http://localhost:${port}\n`);
    routes.forEach(r => console.log(`  ${r.method.padEnd(7)} ${r.path}`));
    console.log();
  });

  return server;
}

module.exports = { createServer };
