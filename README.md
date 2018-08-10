# bravia-mqtt-aws
Control Sony Bravia TV with MQTT over WebSocket using AWS IoT Device SDK

## Repository Structure
this repository is a using a monorepo pattern with lerna and yarn workspace.
put a each package in the ```packages``` directory

```bash
| - README.md
| - lerna.json
| - package.json
|
| - packages/
|   | - core/
|   |    |-- packge.json
|   |    |-- lib/
|   |    |    |- index.ts
|   |    |
|   | - subscribe/
|   |    |-- packge.json
|   |    |-- lib/
|   |    |    |- index.ts
|   |    |
```
