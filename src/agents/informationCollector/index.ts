import { Agent, MCPConfiguration } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";

const mcpConfig = new MCPConfiguration({
  servers: {
    browser: {
      type: "http",
      url: "http://localhost:8931",
    }
  }
});

// ツールを取得し、必要な形式に変換
const tools = await mcpConfig.getTools();

export const informationCollectorAgent = new Agent({
  name: "information-collector",
  instructions: "ブラウザを操作して情報を収集するエージェントです。",
  llm: new VercelAIProvider(),
  model: google("gemini-2.5-flash-preview-05-20"),
  tools: tools,
});
