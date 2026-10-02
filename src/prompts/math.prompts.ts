import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

export function registerMathPrompts(server: McpServer) {
  server.registerPrompt(
    "explain-calculation",
    {
      title: "Explain Calculation",
      description: "Explains a mathematical calculation step by step.",
      argsSchema: z.object({
        operation: z.string(),
        a: z.string(),
        b: z.string(),
        result: z.string(),
      }),
    },
    ({ operation, a, b, result }) => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Explain the following calculation step by step:
                    ${a} ${operation} ${b} = ${result}
                    Explain the mathematical reasoning in a beginner-friendly way.`,
            },
          },
        ],
      };
    },
  );
}
