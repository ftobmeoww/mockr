# Quick start

Up and running in under a minute.

## 1. Create api.json

```json
{
  "GET /users": [{ "id": 1, "name": "Alice" }, { "id": 2, "name": "Bob" }],
  "POST /login": { "token": "abc123" }
}
```

## 2. Start mockr

```bash
npx mockr-cli start
```

```
  mockr running on http://localhost:3000

  GET     /users
  POST    /login
```

## 3. Fetch from your frontend

```javascript
fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(data => console.log(data))
```
