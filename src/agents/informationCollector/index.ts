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
  model: anthropic("claude-3-5-sonnet-20241022"),
  tools: tools,
});
