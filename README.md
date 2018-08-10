# bravia-mqtt-aws
Control Sony Bravia TV with MQTT over WebSocket using AWS IoT Device SDK

## Repository Structure
this repository is a using a monorepo pattern with lerna and yarn workspace.
put a each package in the ```packages``` directory

```
bravia-mqtt-aws
| - tsconfig.json
| - tsconfig.base.json
| - README.md
| - lerna.json
| - package.json
| - packages/
|   | - core/
|   |    |-- package.json
|   |    |-- tsconfig.build.json
|   |    |-- tsconfig.json
|   |    |-- lib/
|   |    |    |- index.ts
|   |    |
|   | - subscribe/
|   |    |-- package.json
|   |    |-- tsconfig.build.json
|   |    |-- tsconfig.json
|   |    |-- lib/
|   |    |    |- index.ts
|   |    |
```
