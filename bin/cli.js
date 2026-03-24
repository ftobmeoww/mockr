#!/usr/bin/env node

const { loadConfig } = require("../src/loader");
const { createServer } = require("../src/server");

const args = process.argv.slice(2);

if (args[0] !== "start") {
  console.log("Usage: mock-api start [--config <file>] [--port <number>]");
  process.exit(0);
}

let configFile = "api.json";
let port = 3000;

for (let i = 1; i < args.length; i++) {
  if (args[i] === "--config" && args[i + 1]) configFile = args[++i];
  if (args[i] === "--port" && args[i + 1]) port = parseInt(args[++i], 10);
}

const routes = loadConfig(configFile);
createServer(routes, port);
