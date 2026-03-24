const fs = require("fs");
const path = require("path");

function loadConfig(filePath) {
  const resolved = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolved)) {
    console.log(`
No config file found. Create an api.json file in this directory:

  {
    "GET /users": [{ "id": 1, "name": "Alice" }],
    "POST /login": { "token": "abc123" }
  }

Then run: mockr start

Need help? Check the docs: https://github.com/ftobmeoww/mockr
`);
    process.exit(0);
  }

  let raw;
  try {
    raw = fs.readFileSync(resolved, "utf-8");
  } catch {
    console.error(`Failed to read config file: ${resolved}`);
    process.exit(1);
  }

  let config;
  try {
    config = JSON.parse(raw);
  } catch {
    console.error("Invalid JSON in config file.");
    process.exit(1);
  }

  const routes = [];

  for (const [key, body] of Object.entries(config)) {
    const parts = key.trim().split(/\s+/);
    if (parts.length !== 2) {
      console.error(`Invalid route key "${key}". Expected format: "METHOD /path"`);
      process.exit(1);
    }

    const [method, urlPath] = parts;
    routes.push({ method: method.toUpperCase(), path: urlPath, body });
  }

  return routes;
}

module.exports = { loadConfig };
