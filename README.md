# mockr

fake a REST API from a single JSON file. no backend, no setup.

```bash
npx mockr start
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
mockr start
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
npm install -g mockr
```

or just use `npx mockr start` without installing anything.

## options

```bash
mockr start --config mocks/api.json --port 8080
```

| flag | default | what it does |
|------|---------|--------------|
| `--config` | `api.json` | path to your config file |
| `--port` | `3000` | port to run on |

## notes

- CORS is open by default, so your frontend can call it without issues
- unknown routes return `404 { "error": "Route not found" }`

## license

MIT — [@ftobmeoww](https://github.com/ftobmeoww)
