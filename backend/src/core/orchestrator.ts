import { EventEmitter } from 'events';
import { Agent, AgentContext, TaskResult } from '../types/agent';

export class AgentOrchestrator {
  private agents: Map<string, Agent>;
  private contexts: Map<string, AgentContext>;
  public events: EventEmitter;

  constructor() {
    this.agents = new Map();
    this.contexts = new Map();
    this.events = new EventEmitter();
  }

  public async registerAgent(agent: Agent): Promise<void> {
    if (this.agents.has(agent.config.name)) {
      throw new Error(`Agent ${agent.config.name} already registered`);
    }

    await agent.initialize();
    this.agents.set(agent.config.name, agent);
    
    // Forward agent events to orchestrator
    agent.events.on('status', (status) => {
      this.events.emit('agentStatus', { agent: agent.config.name, status });
    });
  }

  public async executeTask(
    agentName: string,
    task: string,
    params: Record<string, unknown>,
    parentTaskId?: string
  ): Promise<TaskResult> {
    const agent = this.agents.get(agentName);
    if (!agent) {
      throw new Error(`Agent ${agentName} not found`);
    }

    const taskId = this.generateTaskId();
    const context: AgentContext = {
      taskId,
      parentTaskId,
      startTime: new Date(),
      status: 'pending'
    };

    this.contexts.set(taskId, context);
    this.events.emit('taskStarted', { taskId, agentName, task, params });

    try {
      context.status = 'running';
      const result = await agent.executeTask(task, params);
      context.status = 'completed';
      context.result = result;
      this.events.emit('taskCompleted', { taskId, result });
      return result;
    } catch (error) {
      context.status = 'failed';
      context.result = {
        success: false,
        data: null,
        error: error as Error
      };
      this.events.emit('taskFailed', { taskId, error });
      throw error;
    }
  }

  public async cleanup(): Promise<void> {
    for (const agent of this.agents.values()) {
      await agent.cleanup();
    }
    this.agents.clear();
    this.contexts.clear();
  }

  private generateTaskId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getAgentCapabilities(agentName: string) {
    const agent = this.agents.get(agentName);
    if (!agent) {
      throw new Error(`Agent ${agentName} not found`);
    }
    return agent.getCapabilities();
  }

  public getAllAgents(): string[] {
    return Array.from(this.agents.keys());
  }
} 