# Random responses

Use `_random` to return a different response each time a route is hit. useful for simulating real-world variability.

```json
{
  "GET /status": {
    "_random": [
      { "status": "ok" },
      { "status": "degraded" },
      { "_status": 503, "error": "Service Unavailable" }
    ]
  }
}
```

Every request to `GET /status` will randomly return one of the three responses.

!!! tip
    Combine with `_delay` inside each random option to simulate different response times too.
