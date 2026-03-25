# api.json format

Each key is a route in the format `METHOD /path`, each value is the response body.

```json
{
  "GET /users": [...],
  "GET /users/1": {...},
  "POST /login": {...},
  "DELETE /users/1": { "success": true }
}
```

Supported methods: `GET` `POST` `PUT` `PATCH` `DELETE`

!!! note
    The config file defaults to `api.json` in the current directory. Use `--config` to point to a different file.
