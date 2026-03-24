# mockr

fake a REST API from a single JSON file. no backend, no setup.

```bash
npx mockr-cli start
```

## usage

create `api.json` wherever you want:

```json
{
  "GET /users": [{ "id": 1, "name": "Alice" }, { "id": 2, "name": "Bob" }],
  "GET /users/1": { "id": 1, "name": "Alice" },
  "POST /login": { "token": "abc123" }
}
```

run it:

```bash
mockr-cli start
```

```
mockr running on http://localhost:3000

  GET     /users
  GET     /users/1
  POST    /login
```

hit your routes, get your data back. that's it.

## install

```bash
npm install -g mockr-cli
```

or just use `npx mockr-cli start` without installing anything.

## options

```bash
mockr-cli start --config mocks/api.json --port 8080 --watch
```

| flag | default | what it does |
|------|---------|--------------|
| `--config` | `api.json` | path to your config file |
| `--port` | `3000` | port to run on |
| `--watch` | off | auto-reload when config changes |

## custom status codes

```json
{
  "GET /secret": { "_status": 403, "error": "Forbidden" }
}
```

## response delays

simulate slow networks to test loading states:

```json
{
  "GET /users": { "_delay": 1500, "data": [{ "id": 1, "name": "Alice" }] }
}
```

## request logging

every request is logged to the terminal automatically:

```
  10:32:01  200  GET /users
  10:32:04  404  GET /unknown
  10:32:09  200  POST /login  (1000ms delay)
```

## notes

- CORS is open by default, so your frontend can call it without issues
- unknown routes return `404 { "error": "Route not found" }`

## license

MIT — [@ftobmeoww](https://github.com/ftobmeoww)
