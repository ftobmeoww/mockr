# Examples

## Basic REST API

```json
{
  "GET /posts": [
    { "id": 1, "title": "Hello World", "author": "Alice" },
    { "id": 2, "title": "Second Post", "author": "Bob" }
  ],
  "GET /posts/1": { "id": 1, "title": "Hello World", "body": "...", "author": "Alice" },
  "POST /posts": { "id": 3, "message": "created" },
  "DELETE /posts/1": { "success": true }
}
```

## Auth flow

```json
{
  "POST /login": { "token": "eyJhbGciOiJIUzI1NiJ9", "expires": 3600 },
  "GET /me": { "id": 1, "name": "Alice", "email": "alice@example.com" },
  "POST /logout": { "success": true }
}
```

## Error handling

```json
{
  "GET /admin": { "_status": 403, "error": "Forbidden" },
  "GET /timeout": { "_delay": 5000, "_status": 408, "error": "Request Timeout" },
  "GET /server-error": { "_status": 500, "error": "Something went wrong" }
}
```
