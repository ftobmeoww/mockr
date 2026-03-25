# What is mockr?

mockr is a CLI tool that spins up a fake REST API from a JSON config file. no backend, no setup — define your endpoints and start building.

useful when your backend isn't ready yet, or you just want to prototype something fast without spinning up a real server.

- one JSON file, one command
- custom status codes and response delays
- auto-reload with watch mode
- CORS enabled by default
- every request logged to the terminal

!!! tip "No install needed"
    just run `npx mockr-cli start` in any folder with an `api.json`.

```bash
$ npx mockr-cli start

  mockr running on http://localhost:3000

  GET     /users
  POST    /login
```
