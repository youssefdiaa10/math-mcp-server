import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { registerMathPrompts } from "./prompts/math.prompts.js";
import { registerMathResources } from "./resources/math.resources.js";
import { registerMathTools } from "./tools/math.tools.js";

function createServer() {
  const server = new McpServer({
    name: "math-server",
    version: "1.0.0",
  });

  registerMathTools(server);
  registerMathResources(server);
  registerMathPrompts(server);

  return server;
}

const server = createServer();

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("Math MCP server running on stdio");
