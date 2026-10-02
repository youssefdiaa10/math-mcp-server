import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

//? ----------------------------------------------------------------
//? ----------------------------------------------------------------
//? Client - Start
//? ----------------------------------------------------------------
//? ----------------------------------------------------------------

const client = new Client({
  name: "math-client",
  version: "1.0.0",
});

const transport = new StdioClientTransport({
  command: "node",
  args: ["dist/index.js"],
});

await client.connect(transport);

console.log("Connected to Math MCP Server.");

//! ----------------------------------------------------------------
//! ----------------------------------------------------------------
//! TEST - Tools
//! ----------------------------------------------------------------
//! ----------------------------------------------------------------
{
  console.log("************************Tools*************************");
  const toolsResult = await client.listTools();

  console.log("\nAvailable tools:");

  for (const tool of toolsResult.tools) {
    console.log(`- ${tool.name}: ${tool.description}`);
  }

  async function callMathTool(
    name: "add" | "subtract" | "multiply" | "divide",
    a: number,
    b: number,
  ) {
    const result = await client.callTool({
      name,
      arguments: {
        a,
        b,
      },
    });

    if (result.isError) {
      console.error("Tool failed:", result.content);
    }

    for (const block of result.content) {
      if (block.type === "text") {
        return block.text;
      }
    }

    return undefined;
  }

  console.log(await callMathTool("add", 100, 50));

  console.log(await callMathTool("subtract", 100, 30));

  console.log(await callMathTool("multiply", 10, 20));

  console.log(await callMathTool("divide", 100, 0));

  console.log(await callMathTool("divide", 100, 20));
}

//! ----------------------------------------------------------------
//! ----------------------------------------------------------------
//! TEST - Resources
//! ----------------------------------------------------------------
//! ----------------------------------------------------------------
{
  console.log("************************Resources*************************");
  const resourcesResult = await client.listResources();

  console.log("\nAvailable resources:");

  for (const resource of resourcesResult.resources) {
    console.log(`- ${resource.name}: ${resource.uri}`);
  }

  const resourceResult = await client.readResource({
    uri: "math://constants",
  });

  console.log("\nMath constants:");

  console.log(resourceResult.contents);
}

//! ----------------------------------------------------------------
//! ----------------------------------------------------------------
//! TEST - Prompts
//! ----------------------------------------------------------------
//! ----------------------------------------------------------------
{
  console.log("************************Prompts*************************");
  const promptsResult = await client.listPrompts();

  console.log("\nAvailable prompts:");

  for (const prompt of promptsResult.prompts) {
    console.log(`- ${prompt.name}: ${prompt.description}`);
  }

  const promptResult = await client.getPrompt({
    name: "explain-calculation",
    arguments: {
      operation: "*",
      a: "10",
      b: "20",
      result: "200",
    },
  });

  console.log("\nGenerated prompt:");

  console.log(promptResult.messages);
}

//? ----------------------------------------------------------------
//? ----------------------------------------------------------------
//? Client - Close
//? ----------------------------------------------------------------
//? ----------------------------------------------------------------

await client.close();
