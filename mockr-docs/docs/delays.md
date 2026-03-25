# Response delays

Simulate slow networks using `_delay` (value in milliseconds).

```json
{
  "GET /users": { "_delay": 1500, "data": [{ "id": 1, "name": "Alice" }] }
}
```

Combine with `_status` to simulate a slow error:

```json
{
  "GET /slow-error": { "_delay": 2000, "_status": 503, "error": "Service Unavailable" }
}
```
