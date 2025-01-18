# AI Wellness Coach with OpenAi Realtime API

A real-time AI wellness coaching application powered by OpenAI's latest real-time api. Chat with an AI wellness coach through text or voice to get personalized health and nutrition guidance.

## Demo

🎥 [Watch Demo Video](https://github.com/lesteroliver911/wellness-coach-openai-realtime/assets/lesteroliver-wellness-coach-openai-realtime.mp4)

## ⚠️ Important Note

The OpenAI real-time API can be expensive for long conversations. Please monitor your usage and set appropriate limits.

## 🚀 Quick Start

1. Clone the repository
```bash
git clone [https://github.com/lesteroliver911/wellness-coach-openai-realtime]
cd openai-realtime
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI API with real-time capabilities
- **Voice**: WebRTC for real-time audio

## 📁 Project Structure

```
src/
├── app/                 # Main application code
│   ├── agentConfigs/   # AI agent configurations
│   ├── api/            # API routes
│   ├── components/     # React components
│   └── types.ts        # TypeScript types
```

## 🎯 Features

- Real-time voice conversations with AI
- Text chat interface
- Push-to-talk functionality
- Personalized wellness guidance
- Extensible tool system

## 🔧 Custom Tools

The AI agent can be enhanced with custom tools to extend its capabilities:

1. **Web Search**: Add web search capability to get up-to-date information
2. **Custom APIs**: Integrate your own APIs for specialized functionality
3. **Database Queries**: Connect to databases for persistent data
4. **External Services**: Integrate with nutrition databases, fitness trackers, etc.

Example of adding a custom tool in `src/app/agentConfigs/wellnessCoach.ts`:
```typescript
tools: [
  {
    type: "function",
    function: {
      name: "search_nutrition_data",
      description: "Search for nutrition information about foods",
      parameters: {
        type: "object",
        properties: {
          food: {
            type: "string",
            description: "The food item to search for"
          }
        }
      }
    }
  }
]
```

## 🧑‍💻 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## 📝 Requirements

- Node.js (Latest LTS version)
- OpenAI API key with access to real-time models
- Modern web browser with WebRTC support

## 📄 License

MIT License - See LICENSE file for details
