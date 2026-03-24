#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { loadConfig } = require("../src/loader");
const { createServer } = require("../src/server");

const args = process.argv.slice(2);

if (args[0] !== "start") {
  console.log("Usage: mockr-cli start [--config <file>] [--port <number>] [--watch]");
  process.exit(0);
}

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
