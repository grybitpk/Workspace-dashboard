# Orbit - AI-Powered Workspace Dashboard

A premium, cinematic AI-powered workspace dashboard with fully integrated AI assistant that helps you organize and launch your favorite tools instantly.

## Features

### 🤖 AI-Powered Experience (Google Gemini Pro)
- **Real AI Integration**: Powered by Google Gemini Pro API with streaming responses
- **AI Assistant Panel**: Sliding glassmorphism panel with real-time chat interface
- **AI Search Bar**: Universal command bar with AI pulse indicator and quick commands
- **Smart Commands**: Voice input, quick actions, and intelligent suggestions
- **AI Floating Orb**: Breathing orb avatar with notification badge
- **Streaming Responses**: Real-time text streaming as AI generates responses
- **Quick Commands**: Pre-built shortcuts for common tasks
  - Open tools instantly
  - Generate UI ideas
  - Summarize articles
  - Find AI tools
  - Create captions
  - Explain code

### ✨ Core Features
- **Instant Search**: AI-powered search bar with keyboard shortcuts (⌘K / Ctrl+K)
- **Pinned Tools**: Save and organize your favorite websites and tools with auto favicon detection
- **Smart Categories**: Organize tools by category with orange active states
- **Themes**: Multiple cinematic backgrounds to choose from
- **Stats Widgets**: Track your productivity and usage metrics

### 🎨 Design
- Ultra-modern dark UI with glassmorphism effects
- Cinematic background wallpapers
- Smooth animations powered by Framer Motion
- Neon accent glows (green, blue, purple)
- Premium minimal typography
- Fully responsive (mobile, tablet, desktop)

### 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Storage**: Local Storage (no authentication needed)

## Usage

### AI Assistant
1. **Open AI Panel**: Click the floating AI orb or press `⌘K` and ask a question
2. **Chat Interface**: Type messages, use voice input, or select suggested prompts
3. **Quick Actions**: Copy responses, regenerate answers, or use voice commands
4. **Smart Commands**: Type "open [tool name]" to launch tools instantly

### Universal Search & Commands
- `⌘K` or `Ctrl+K` - Focus AI search bar
- Type "open figma" - Launch tools instantly
- Ask questions - Opens AI assistant automatically
- Quick command chips - Click to auto-fill common tasks

### Adding Tools
1. Click the floating orb and ask AI, or use the Add button
2. Enter the tool name and URL
3. Website favicon is detected automatically
4. Choose a theme color
5. Tool appears instantly on the dashboard

### AI Features
- **Message Bubbles**: Beautiful chat interface with user/AI messages
- **Typing Indicator**: Animated dots show when AI is thinking
- **Voice Input**: Microphone button for voice commands
- **Copy & Regenerate**: Action buttons on AI responses
- **Suggested Prompts**: Click to quickly start conversations
- **Model Selector**: Powered by Google Gemini Pro

### Switching Themes
Click the palette icon in the top-right toolbar to cycle through cinematic backgrounds:
- Neo Dark
- Aurora
- Mountain Peak

## Components

### AI Components
- **AIAssistantPanel**: Full-featured AI chat interface with glassmorphism
- **AIOrb**: Floating breathing orb with notification badge
- **AISearchBar**: Enhanced search with AI pulse and command chips
- **MessageBubble**: Chat message component with actions
- **TypingIndicator**: Animated AI thinking dots

### Core Components
- **Toolbar**: Top-right glassmorphism controls (3 buttons)
- **ToolCard**: Floating tool cards with real favicons and hover effects
- **AddToolModal**: Beautiful modal with automatic favicon detection
- **CategoryFilter**: Orange-themed category selector with glow
- **StatsWidget**: Compact productivity metrics in top-left
- **Dock**: macOS-style bottom dock (5 buttons)

## Local Storage

All tools are saved to browser local storage, so your workspace persists between sessions. No account or backend required.

## Customization

Tools include:
- Custom icons (emojis)
- Theme colors
- Categories
- URLs

Built with ❤️ using React, Tailwind CSS, and Motion
