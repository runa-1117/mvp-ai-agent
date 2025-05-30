# Mini-AI-Agent

A minimalist implementation of an AI agent system inspired by Manus and Genspark.

## Features

- Multi-agent task execution system
- Browser automation capabilities  
- Real-time task monitoring
- Document generation
- Code execution environment

## Tech Stack

- Frontend: React + TypeScript
- Backend: Node.js + Express
- AI: LangChain + Puppeteer
- Database: MongoDB

## Getting Started

### Prerequisites

- Node.js 16+
- MongoDB
- Python 3.8+

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mini-ai-agent.git
cd mini-ai-agent
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies 
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Create .env file in backend directory
cp .env.example .env
```

4. Start development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Project Structure

```
mini-ai-agent/
├── frontend/           # React frontend
├── backend/           # Node.js backend
├── agents/            # AI agent implementations
├── browser/          # Browser automation
└── docs/             # Documentation
```

## Contributing

Contributions are welcome! Please read our contributing guidelines first.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 