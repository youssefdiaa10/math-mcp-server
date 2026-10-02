import { McpServer } from "@modelcontextprotocol/server";

export function registerMathResources(server: McpServer) {
  server.registerResource(
    "math-constants",
    "math://constants",
    {
      title: "Mathematical Constants",
      description: "Common mathematical constants.",
      mimeType: "application/json",
    },

    async (uri) => {
      const constants = {
        e: Math.E,
        pi: Math.PI,
        phi: (1 + Math.sqrt(5)) / 2,
      };

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(constants, null, 2),
          },
        ],
      };
    },
  );
}
