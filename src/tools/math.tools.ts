import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";

import { add, divide, multiply, subtract } from "../math.js";

export function registerMathTools(server: McpServer) {
  server.registerTool(
    "add",
    {
      title: "Add numbers",
      description: "Adds two numbers together.",
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
    async ({ a, b }) => {
      const result = add(a, b);

      return {
        content: [
          {
            type: "text",
            text: String(result),
          },
        ],
      };
    },
  );

  server.registerTool(
    "subtract",
    {
      title: "Subtract numbers",
      description: "Subtracts the second number from the first number.",
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
    async ({ a, b }) => {
      const result = subtract(a, b);

      return {
        content: [
          {
            type: "text",
            text: String(result),
          },
        ],
      };
    },
  );

  server.registerTool(
    "multiply",
    {
      title: "Multiply numbers",
      description: "Multiplies two numbers together.",
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
    async ({ a, b }) => {
      const result = multiply(a, b);

      return {
        content: [
          {
            type: "text",
            text: String(result),
          },
        ],
      };
    },
  );

  server.registerTool(
    "divide",
    {
      title: "Divide numbers",
      description: "Divides the first number by the second number.",
      inputSchema: z.object({
        a: z.number(),
        b: z.number(),
      }),
    },
    async ({ a, b }) => {
      try {
        const result = divide(a, b);

        return {
          content: [
            {
              type: "text",
              text: String(result),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: error instanceof Error ? error.message : "Unknown error",
            },
          ],
          isError: true,
        };
      }
    },
  );
}
