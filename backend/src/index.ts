import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { AgentOrchestrator } from './core/orchestrator';
import { BrowserAgent } from './agents/browser-agent';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const orchestrator = new AgentOrchestrator();

// Initialize agents
async function initializeAgents() {
  const browserAgent = new BrowserAgent();
  await orchestrator.registerAgent(browserAgent);
}

// Setup WebSocket event handlers
io.on('connection', (socket) => {
  console.log('Client connected');

  // Forward orchestrator events to connected clients
  orchestrator.events.on('taskStarted', (data) => socket.emit('taskStarted', data));
  orchestrator.events.on('taskCompleted', (data) => socket.emit('taskCompleted', data));
  orchestrator.events.on('taskFailed', (data) => socket.emit('taskFailed', data));
  orchestrator.events.on('agentStatus', (data) => socket.emit('agentStatus', data));

  // Handle task execution requests
  socket.on('executeTask', async (data: {
    agentName: string;
    task: string;
    params: Record<string, unknown>;
  }) => {
    try {
      const result = await orchestrator.executeTask(
        data.agentName,
        data.task,
        data.params
      );
      socket.emit('taskResult', { success: true, result });
    } catch (error) {
      socket.emit('taskResult', { 
        success: false, 
        error: (error as Error).message 
      });
    }
  });

  // Handle agent capability requests
  socket.on('getAgentCapabilities', (agentName: string) => {
    try {
      const capabilities = orchestrator.getAgentCapabilities(agentName);
      socket.emit('agentCapabilities', { 
        success: true, 
        capabilities 
      });
    } catch (error) {
      socket.emit('agentCapabilities', { 
        success: false, 
        error: (error as Error).message 
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// API endpoints
app.get('/agents', (req, res) => {
  const agents = orchestrator.getAllAgents();
  res.json({ agents });
});

// Start the server
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await initializeAgents();
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 