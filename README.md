<p align="center">
  <img src="./mockr.png" width="110" />
</p>

<h1 align="center">mockr</h1>

<p align="center">fake a REST API from a JSON file — no backend needed</p>

<br />

<p align="center">
  <img src="https://img.shields.io/npm/v/mockr-cli?color=white&style=flat-square" />
  <img src="https://img.shields.io/npm/l/mockr-cli?color=white&style=flat-square" />
  <img src="https://img.shields.io/npm/dm/mockr-cli?color=white&style=flat-square" />
</p>

<br />

## quick start

create `api.json` anywhere:

```json
{
  "GET /users": [{ "id": 1, "name": "Alice" }],
  "POST /login": { "token": "abc123" }
}
```

run it:

```bash
npx mockr-cli start
```

your site can now fetch from `http://localhost:3000`. done.

<br />

## options

```bash
mockr-cli start --config mocks/api.json --port 8080 --watch
```

| flag | default | |
|------|---------|---|
| `--config` | `api.json` | path to your config |
| `--port` | `3000` | port to run on |
| `--watch` | off | auto-reload on change |

<br />

## extras

set a custom status code:
```json
"GET /secret": { "_status": 403, "error": "Forbidden" }
```

add a response delay (ms):
```json
"GET /slow": { "_delay": 2000, "message": "slow response" }
```

every request is logged to the terminal automatically.

<br />

---

<p align="center">MIT · <a href="https://github.com/ftobmeoww">@ftobmeoww</a></p>
