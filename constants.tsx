
import { ToolDefinition } from './types';

// Deterministic parameter types to avoid external dependencies
const Type = {
  OBJECT: 'OBJECT',
  STRING: 'STRING',
  NUMBER: 'NUMBER'
};

export const DEFAULT_SYSTEM_PROMPT = `
ZYPHER_KERNEL_V1: DETERMINISTIC_PROTOCOL_ENABLED.
Architecture: Local Logic Kernel (LLM-Free).
Source: agent/agent.ts
Objective: Demonstrate Reactive Execution Loops via deterministic policies.`;

export const AVAILABLE_MODELS = [
  { id: 'zypher-local-kernel-v1', name: 'Zypher-Local-Kernel (Audit Mode)' },
  { id: 'zypher-logic-v1', name: 'Zypher-Local-Kernel (System Integrity)' }
];

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: 'FS_LIST_FILES',
    description: 'Lists all files in the current workspace.',
    parameters: { type: Type.OBJECT, properties: {} }
  },
  {
    name: 'FS_READ_FILE',
    description: 'Reads content from the virtual sandbox.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        path: { type: Type.STRING, description: 'Path to the file.' }
      },
      required: ['path']
    }
  },
  {
    name: 'GET_SYSTEM_METRICS',
    description: 'Fetches real-time telemetry from the Node cluster.',
    parameters: { type: Type.OBJECT, properties: {} }
  },
  {
    name: 'DB_QUERY',
    description: 'Simulates a SQL query against the internal telemetry database.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        sql: { type: Type.STRING, description: 'The SQL query to run.' }
      },
      required: ['sql']
    }
  }
];
