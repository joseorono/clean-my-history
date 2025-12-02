# FocusSpace

**FocusSpace** is a productivity-focused Chrome Extension designed to help you reclaim your attention. It removes digital clutter: distracting tabs, social media history, and time-wasting content to prepare your browser environment for Deep Work.

This is a Browser Extension project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## ✨ Features

- **⚡ Session Cleaner**: Instantly close distracting tabs using smart keyword filtering and custom rules
- **🧹 Browser Cleaner**: Remove distraction-related entries from your browser history by category (Social Media, Memes, NSFW) without wiping everything
- **🎯 Focus Mode**: Pomodoro timer with task management and session tracking
- **🛡️ Privacy First**: All processing happens locally on your device. Your data never leaves your browser
- **⚙️ Smart Settings**: Configure custom keywords, categories, and whitelisted domains
- **🔔 Real-time Notifications**: Get alerted when distracting tabs are opened during focus sessions

## 🛠️ Tech Stack

- **Framework**: [Plasmo](https://docs.plasmo.com/) (Browser Extension Framework)
- **UI**: [React](https://reactjs.org/) + [Material UI (MUI)](https://mui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with persistence via @plasmohq/storage
- **Icons**: @mui/icons-material
- **Notifications**: @react-hot-toast

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm, npm, or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked**
   - Select the `build/chrome-mv3-dev` folder

The development build automatically reloads when you make changes to the source code.

## 📦 Building for Production

```bash
pnpm build
```

Creates a production-ready zip file in the `build` directory for Chrome Web Store submission.

## 🎨 Design Philosophy

- **Lightweight**: Minimal assets for fast load times
- **Privacy-Centric**: No external analytics or data collection
- **User Control**: Granular settings for what gets cleaned and what stays
- **Non-Intrusive**: Works seamlessly without disrupting your workflow

## 📝 Project Status

🟢 **Core Features Complete** - All main functionality is implemented and working.

See [docs/todo.md](docs/todo.md) for the detailed roadmap and [docs/improvements.md](docs/improvements.md) for technical improvements.

## 🚧 Completed Features

- [x] Session Cleaner with keyword filtering (create new tab and switch to it, close all problematic tabs)
- [x] Browser Cleaner with category-based history removal
- [x] Focus Mode with Pomodoro Timer and ToDo List
- [x] Settings management with persistence
- [x] Real-time notifications

## 📚 Documentation
For further guidance, [visit the Plasmo Documentation](https://docs.plasmo.com/)

- [Development Roadmap](docs/todo.md)
- [Technical Improvements](docs/improvements.md)
- [Plasmo Documentation](https://docs.plasmo.com/)

## 📤 Deployment

Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

---

Made with ❤️ by [The Exologic Team](https://exologic.agency/).

*This project is actively maintained. Contributions welcome!*