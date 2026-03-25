# Status codes

Return any HTTP status code using the `_status` field.

```json
{
  "GET /secret": { "_status": 403, "error": "Forbidden" },
  "GET /crash":  { "_status": 500, "error": "Internal Server Error" }
}
```

!!! note
    Fields starting with `_` are reserved for mockr and won't appear in the response body.
