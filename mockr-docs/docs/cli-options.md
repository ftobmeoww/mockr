# CLI options

All flags are optional.

| Flag | Default | Description |
|------|---------|-------------|
| `--config <file>` | `api.json` | path to your config file |
| `--port <number>` | `3000` | port to run the server on |
| `--watch` | off | auto-reload when config changes |

```bash
mockr-cli start --config mocks/api.json --port 8080 --watch
```
