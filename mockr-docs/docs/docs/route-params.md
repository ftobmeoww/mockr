# Route params

Use `:param` syntax in your route path to match dynamic segments.

```json
{
  "GET /users/:id": { "id": 1, "name": "Alice" }
}
```

When you hit `GET /users/42`, mockr matches the route and logs the params:

```
  10:32:01  200  GET /users/42  params: {"id":"42"}
```

The matched params are also included in the response under a `params` key:

```json
{
  "id": 1,
  "name": "Alice",
  "params": { "id": "42" }
}
```

!!! note
    Exact routes always take priority over param routes. `GET /users/me` will match before `GET /users/:id` if both are defined.
