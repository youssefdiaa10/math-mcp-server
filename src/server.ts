import { McpServer } from "@modelcontextprotocol/server";

import { registerMathPrompts } from "./prompts/math.prompts.js";
import { registerMathResources } from "./resources/math.resources.js";
import { registerMathTools } from "./tools/math.tools.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "math-server",
    version: "1.0.0",
  });

  registerMathTools(server);
  registerMathResources(server);
  registerMathPrompts(server);

  return server;
}
