import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { createServer } from "./server.js";

const server = createServer();

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("Math MCP server running on stdio");
