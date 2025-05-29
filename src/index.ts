import { VoltAgent, Agent, MCPConfiguration } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";

import { calculatorAgent } from "./agents/calculator/index.js";
import { informationCollectorAgent } from "./agents/informationCollector/index.js";


const agent = new Agent({
  name: "Supervisor Agent",
  instructions: "あなたの役割は、他のエージェントを監督し、全体のプロセスを管理することです。最終的な目的は情報収集して得られた数字で足し算と引き算することです。",
  llm: new VercelAIProvider(),
  model: google("gemini-2.5-flash-preview-05-20"),
  subAgents: [informationCollectorAgent, calculatorAgent],
  // subAgents: [informationCollectorAgent],
});

new VoltAgent({
  agents: {
    agent,
  },
}); 