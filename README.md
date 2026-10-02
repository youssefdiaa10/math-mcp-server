# Math MCP Server

A small [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server written in TypeScript. It exposes basic math tools, a resource containing common mathematical constants, and a prompt for explaining calculations.

## Requirements

- Node.js 18 or newer
- npm

## Install

```bash
npm install
```

## Commands

```bash
# Run the server directly from TypeScript during development
npm run dev:server

# Compile TypeScript into dist/
npm run build

# Run the compiled MCP server
npm start

# Run the included MCP client demonstration
npm run dev:client

# Run unit tests
npm test
```

Run `npm run build` before `npm start` or `npm run dev:client`. The sample client starts the compiled server with `node dist/index.js`.

## MCP capabilities

### Tools

| Tool | Inputs | Description |
| --- | --- | --- |
| `add` | `a`, `b` numbers | Adds two numbers. |
| `subtract` | `a`, `b` numbers | Subtracts `b` from `a`. |
| `multiply` | `a`, `b` numbers | Multiplies two numbers. |
| `divide` | `a`, `b` numbers | Divides `a` by `b`. Returns an error when `b` is zero. |

### Resource

`math://constants` returns JSON containing `pi`, `e`, and `phi`.

### Prompt

`explain-calculation` accepts `operation`, `a`, `b`, and `result`, then creates a user message asking for a beginner-friendly, step-by-step explanation.

## Project structure

```text
src/
├── index.ts                    # Creates and starts the MCP server
├── client.ts                   # Local client demonstration
├── math.ts                     # Math implementation
├── math.test.ts                # Unit tests
├── tools/math.tools.ts         # Registers math tools
├── resources/math.resources.ts # Registers math resources
└── prompts/math.prompts.ts     # Registers math prompts
```

`src/index.ts` is the only file that creates an `McpServer` and connects it to `StdioServerTransport`. Feature modules export registration functions, which receive that server instance:

```ts
export function registerFeature(server: McpServer) {
  // server.registerTool(...)
  // server.registerResource(...)
  // server.registerPrompt(...)
}
```

This keeps a single MCP server while allowing tools, resources, and prompts to live in separate files.

## Connect from an MCP client

After building the project, configure an MCP client to start the server using Node.js. Replace the path with this repository's absolute path:

```json
{
  "mcpServers": {
    "math": {
      "command": "node",
      "args": ["/absolute/path/to/math-mcp-server/dist/index.js"]
    }
  }
}
```

`command` starts Node.js and `args` tells Node which compiled server file to run. Communication happens through standard input and output, so avoid writing normal log output to `stdout` in the server; use `console.error` for diagnostics.
