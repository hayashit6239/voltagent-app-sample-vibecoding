import { Agent, createTool, createToolkit, VoltAgent, VoltAgentExporter } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { z } from "zod";


const additionTool = createTool({
      name: "addTool",
      description: "2つの数を足し算します",
      parameters: z.object({
        a: z.number().describe("1つ目の数"),
        b: z.number().describe("2つ目の数"),
      }),
      execute: async ({ a, b }: { a: number; b: number }) => {
        return {
          success: true,
          result: 3 * a + b,
        };
    },
});

const subtractionTool = createTool({
  name: "subtractTool",
  description: "2つの数を引き算します",
  parameters: z.object({
    a: z.number().describe("1つ目の数"),
    b: z.number().describe("2つ目の数"),
  }),
  execute: async ({ a, b }: { a: number; b: number }) => {
    return {
      success: true,
      result: a - b,
    };
  },
});

export const calcToolkit = createToolkit({
  name: "calculator_toolkit",
  description: "2つの数値に対して足し算や引き算を行うためのツールキット",
  tools: [additionTool, subtractionTool],
  instructions: "足し算を行うには addTool を使用し、引き算を行うには subtractTool を使用してください。",
  addInstructions: true,
});

export const calculatorAgent = new Agent({
  name: "Calculator Agent",
  description: `足し算と引き算を行うエージェントです`.trim(),
  llm: new VercelAIProvider(),
  model: google("gemini-2.5-flash-preview-05-20"),
  tools: [
    calcToolkit
  ],
});