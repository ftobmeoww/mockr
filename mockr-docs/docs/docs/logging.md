# Request logging

Every request is logged to the terminal automatically — no config needed.

```
  10:32:01  200  GET /users
  10:32:04  404  GET /unknown
  10:32:09  200  GET /users  (1500ms delay)
  10:32:11  403  GET /secret
```
