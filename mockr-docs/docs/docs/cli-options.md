# CLI options

## Commands

| Command | Description |
|---------|-------------|
| `mockr-cli start` | start the mock server |
| `mockr-cli init` | create a starter `api.json` in the current folder |
| `mockr-cli update` | update mockr-cli to the latest version |

## mockr-cli init

Generates a ready-to-use `api.json` with example routes:

```bash
npx mockr-cli init
```

```
  created api.json

  run: npx mockr-cli start
```

## mockr-cli update

Updates mockr-cli to the latest version globally:

```bash
mockr-cli update
```

## start options

All flags are optional.

| Flag | Default | Description |
|------|---------|-------------|
| `--config <file>` | `api.json` | path to your config file |
| `--port <number>` | `3000` | port to run the server on |
| `--watch` | off | auto-reload when config changes |

```bash
mockr-cli start --config mocks/api.json --port 8080 --watch
```
