#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === "init") {
  const target = path.resolve(process.cwd(), "api.json");
  if (fs.existsSync(target)) {
    console.log("api.json already exists.");
    process.exit(0);
  }
  const starter = {
    "GET /users": [
      { "id": 1, "name": "Alice" },
      { "id": 2, "name": "Bob" }
    ],
    "GET /users/:id": { "id": 1, "name": "Alice" },
    "POST /login": { "token": "abc123", "expires": 3600 },
    "GET /secret": { "_status": 403, "error": "Forbidden" },
    "GET /slow": { "_delay": 1500, "message": "this took a while" }
  };
  fs.writeFileSync(target, JSON.stringify(starter, null, 2));
  console.log("\ncreated api.json\n");
  console.log("  run: npx mockr-cli start\n");
  process.exit(0);
}

if (cmd === "update") {
  console.log("\nupdating mockr-cli...\n");
  try {
    execSync("npm install -g mockr-cli@latest", { stdio: "inherit" });
    console.log("\nmockr-cli updated.\n");
  } catch {
    console.error("update failed. try: npm install -g mockr-cli@latest");
  }
  process.exit(0);
}

if (cmd !== "start") {
  console.log(`
  mockr-cli — fake a REST API from a JSON file

  commands:
    start    start the mock server
    init     create a starter api.json
    update   update mockr-cli to the latest version

  options (start):
    --config <file>    config file (default: api.json)
    --port <number>    port (default: 3000)
    --watch            auto-reload on config change
  `);
  process.exit(0);
}

const { loadConfig } = require("../src/loader");
const { createServer } = require("../src/server");

let configFile = "api.json";
let port = 3000;
let watch = false;

for (let i = 1; i < args.length; i++) {
  if (args[i] === "--config" && args[i + 1]) configFile = args[++i];
  if (args[i] === "--port" && args[i + 1]) port = parseInt(args[++i], 10);
  if (args[i] === "--watch") watch = true;
}

let routes = loadConfig(configFile);
let server = createServer(routes, port);

if (watch) {
  const resolved = path.resolve(process.cwd(), configFile);
  fs.watch(resolved, () => {
    console.log("\nconfig changed, reloading...\n");
    server.close(() => {
      routes = loadConfig(configFile);
      server = createServer(routes, port);
    });
  });
  console.log(`watching ${configFile} for changes...\n`);
}
