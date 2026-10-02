import { createServer as createHttpServer } from "node:http";

import { toNodeHandler } from "@modelcontextprotocol/node";
import { createMcpHandler } from "@modelcontextprotocol/server";

import { createServer } from "./server.js";

const port = Number(process.env.PORT) || 3000;

//? MCP HTTP handler
const mcpHandler = toNodeHandler(
  createMcpHandler(() => {
    return createServer();
  }),
);

const httpServer = createHttpServer((req, res) => {
  const url = new URL(
    req.url ?? "/",
    `http://${req.headers.host ?? "localhost"}`,
  );

  //? Health check
  if (url.pathname === "/health" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(
      JSON.stringify({
        status: "ok",
        service: "math-mcp-server",
      }),
    );

    return;
  }

  //? MCP endpoint
  if (url.pathname === "/mcp") {
    mcpHandler(req, res).catch((error) => {
      console.error("MCP request error:", error);

      if (!res.headersSent) {
        res.writeHead(500, {
          "content-type": "application/json",
        });

        res.end(
          JSON.stringify({
            error: "Internal server error",
          }),
        );
      }
    });

    return;
  }

  //? Everything else
  res.writeHead(404, {
    "content-type": "application/json",
  });

  res.end(
    JSON.stringify({
      error: "Not found",
    }),
  );
});

httpServer.listen(port, "0.0.0.0", () => {
  console.error(`Math MCP HTTP server running on port ${port}`);
  console.error(`MCP endpoint: http://localhost:${port}/mcp`);
  console.error(`Health endpoint: http://localhost:${port}/health`);
});
