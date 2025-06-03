import { EventEmitter } from 'events';
import { Agent, AgentConfig, AgentCapability, TaskResult } from '../types/agent';

export class ResearchAgent implements Agent {
  public readonly config: AgentConfig;
  public readonly events: EventEmitter;

  constructor() {
    this.config = {
      name: 'research',
      description: 'Agent for basic information processing and research',
      capabilities: [
        {
          name: 'summarize',
          description: 'Summarize provided text content',
          parameters: {
            text: 'string',
            maxLength: 'number?'
          }
        },
        {
          name: 'analyze',
          description: 'Analyze data and provide insights',
          parameters: {
            data: 'any',
            type: 'string'
          }
        }
      ]
    };
    this.events = new EventEmitter();
  }

  public async initialize(): Promise<void> {
    this.events.emit('status', { status: 'initialized' });
  }

  public async executeTask(task: string, params: Record<string, unknown>): Promise<TaskResult> {
    switch (task) {
      case 'summarize':
        return this.executeSummarizeTask(params);
      case 'analyze':
        return this.executeAnalyzeTask(params);
      default:
        throw new Error(`Unknown task: ${task}`);
    }
  }

  private async executeSummarizeTask(params: Record<string, unknown>): Promise<TaskResult> {
    try {
      const { text, maxLength = 100 } = params as { text: string; maxLength?: number };
      
      const summary = text.length > maxLength 
        ? text.substring(0, maxLength) + '...'
        : text;

      return {
        success: true,
        data: {
          summary,
          originalLength: text.length,
          summaryLength: summary.length
        }
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error as Error
      };
    }
  }

  private async executeAnalyzeTask(params: Record<string, unknown>): Promise<TaskResult> {
    try {
      const { data, type } = params as { data: any; type: string };
      
      let analysis = {
        type: type,
        insights: [] as string[]
      };

      if (Array.isArray(data)) {
        analysis.insights.push(`数组长度: ${data.length}`);
        if (data.length > 0) {
          analysis.insights.push(`数据类型: ${typeof data[0]}`);
        }
      } else if (typeof data === 'object') {
        analysis.insights.push(`对象键数量: ${Object.keys(data).length}`);
        analysis.insights.push(`包含的键: ${Object.keys(data).join(', ')}`);
      } else {
        analysis.insights.push(`数据类型: ${typeof data}`);
        analysis.insights.push(`数据长度: ${String(data).length}`);
      }

      return {
        success: true,
        data: analysis
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error as Error
      };
    }
  }

  public getCapabilities(): AgentCapability[] {
    return this.config.capabilities;
  }

  public async cleanup(): Promise<void> {
    this.events.removeAllListeners();
  }
} 