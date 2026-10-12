
export enum AgentStatus {
  IDLE = 'IDLE',
  REASONING = 'REASONING',
  ACTING = 'ACTING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: number;
  thought?: string; // Native API thought part
  thoughtTrace?: string; // UI-facing extracted thought
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
}

export interface ToolCall {
  id: string; // Mandatory for Gemini 3
  name: string;
  args: any;
}

export interface ToolResult {
  id: string; // Must match corresponding ToolCall.id
  name: string;
  result: any;
}

export interface AgentConfig {
  name: string;
  systemPrompt: string;
  model: string;
  tools: string[];
  temperature: number;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: any;
}

export interface VirtualFile {
  path: string;
  content: string;
  language: string;
}

export interface ArtifactRow {
  id: string;
  timestamp: string;
  target: string;
  check: string;
  status: 'OK' | 'WARN' | 'FAIL' | 'PENDING';
  detail: string;
}
