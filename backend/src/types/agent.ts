import { EventEmitter } from 'events';

export interface TaskResult {
  success: boolean;
  data: any;
  error?: Error;
}

export interface AgentCapability {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface AgentConfig {
  name: string;
  description: string;
  capabilities: AgentCapability[];
  model?: string;
}

export interface Agent {
  config: AgentConfig;
  events: EventEmitter;
  
  initialize(): Promise<void>;
  executeTask(task: string, params: Record<string, unknown>): Promise<TaskResult>;
  getCapabilities(): AgentCapability[];
  cleanup(): Promise<void>;
}

export interface AgentContext {
  taskId: string;
  parentTaskId?: string;
  startTime: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: TaskResult;
} 