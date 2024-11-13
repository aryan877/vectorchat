# VectorChat AI Platform

An intelligent chatbot platform that uses DataStax Astra DB for vector storage and OpenAI for embeddings and chat completions.

## Features

- 🧠 Vector-based knowledge base using DataStax Astra DB
- 🤖 OpenAI-powered chat completions
- ⚡ Real-time chat interface
- 📚 Knowledge base management
- 🎯 Semantic search for relevant context
- 💫 Modern UI with animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: DataStax Astra DB (Vector Database)
- **AI**: OpenAI API (Embeddings & Chat)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **State Management**: TanStack Query

## Prerequisites

- Node.js 18+ and npm
- DataStax Astra DB Account
- OpenAI API Key

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone git remote add origin https://github.com/aryan877/vectorchat.git
   cd vectorchat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ASTRA_DB_APPLICATION_TOKEN=your_astra_token
   ASTRA_DB_API_ENDPOINT=your_astra_endpoint
   ```

4. **DataStax Astra DB Setup**

   - Create an account at [astra.datastax.com](https://astra.datastax.com)
   - Create a new Vector Database
   - Get your API endpoint and application token
   - Add them to your `.env.local` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Usage

1. **Adding Knowledge**

   - Use the Knowledge Base section to add content
   - Content is automatically converted to embeddings and stored
   - Each piece of content becomes searchable context

2. **Chatting**
   - Ask questions in the chat interface
   - The system finds relevant context from your knowledge base
   - Responses are generated using the found context

## Project Structure

```
├── app/
│   ├── api/           # API routes
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Main page
├── components/
│   ├── chat/         # Chat components
│   ├── embed/        # Knowledge base components
│   ├── nav/          # Navigation components
│   └── ui/           # UI components
├── utils/
│   └── vectorstore.ts # Vector database utilities
└── public/           # Static assets
```
