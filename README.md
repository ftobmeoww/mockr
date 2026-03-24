<p align="center">
  <img src="./mockr.png" width="160" />
</p>

![npm](https://img.shields.io/npm/v/mockr-cli?color=white&style=flat-square)
![license](https://img.shields.io/npm/l/mockr-cli?color=white&style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/mockr-cli?color=white&style=flat-square)

# mockr

> fake a REST API from a single JSON file. no backend, no setup.

```bash
npx mockr-cli start
```

---

## usage

create `api.json` in your project folder:

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

your frontend can now fetch from `localhost:3000` as if a real backend was running.

---

## install

```bash
npm install -g mockr-cli
```

or skip the install entirely:

```bash
npx mockr-cli start
```

---

## options

| flag | default | description |
|------|---------|-------------|
| `--config <file>` | `api.json` | path to your config file |
| `--port <number>` | `3000` | port to run on |
| `--watch` | off | auto-reload when config changes |

```bash
mockr-cli start --config mocks/api.json --port 8080 --watch
```

---

## custom status codes

return any HTTP status code using `_status`:

```json
{
  "GET /secret": { "_status": 403, "error": "Forbidden" },
  "GET /crash": { "_status": 500, "error": "Internal Server Error" }
}
```

## response delays

simulate slow networks using `_delay` (milliseconds):

```json
{
  "GET /users": { "_delay": 1500, "data": [{ "id": 1, "name": "Alice" }] }
}
```

## request logging

every request is logged automatically:

```
  10:32:01  200  GET /users
  10:32:04  404  GET /unknown
  10:32:09  200  GET /users  (1500ms delay)
  10:32:11  403  GET /secret
```

---

## license

MIT — [@ftobmeoww](https://github.com/ftobmeoww)
