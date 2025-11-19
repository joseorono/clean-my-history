# FocusSpace

**FocusSpace** is a productivity-focused Chrome Extension designed to help you reclaim your attention. It removes digital clutter: distracting tabs, social media history, and NSFW content to prepare your browser environment for Deep Work.

This is a Browser Extension project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).


## ✨ Features

- **⚡ Session Cleaner**: Instantly close tabs that don't match your workflow using smart keyword filtering.
- **🧹 Digital Declutter**: Remove distraction-related entries (Social Media, Memes, NSFW) from your browser history without wiping everything.
- **🛡️ Privacy First**: All processing happens locally on your device. Your history never leaves your browser.
- **✅ Smart Whitelist**: Protect important work domains from being accidentally closed or cleaned.

## 🛠️ Tech Stack

- React
- Redux Toolkit
- Plasmo
- Tailwind
- MaterialUI (MUI)
- React Hot Toast
- **Framework**: [Plasmo](https://docs.plasmo.com/) (Browser Extension Framework)
- **UI Library**: [React](https://reactjs.org/) + [Material UI (MUI)](https://mui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (with persistence)
- **Icons**: @mui/icons-material
- **Toast Notifications**: @react-hot-toast

### Considered Dependecies
- N/A

## 🚀 Getting Started (For Developers)

This is a standard Plasmo project.

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

As per the Plasmo docs, the development build is automatically reloaded when you make changes to the source code.

> <br>
> Open your browser and load the appropriate development build. > For example, if you are developing for the chrome browser, using
> manifest v3, use: `build/chrome-mv3-dev`.
> <br>


## 📦 Building for Production

To create a production-ready bundle:

```bash
pnpm build
```

This will create a zip file in the `build` directory ready for submission to the Chrome Web Store.

## 🎨 Design Philosophy

- **Lightweight**: Minimized asset usage for fast load times.
- **Privacy-Centric**: No external analytics or data collection.
- **User Control**: Granular settings for what gets cleaned and what stays.

## 📝 Project Status

Check out [docs/todo.md](docs/todo.md) for the detailed roadmap and current task list.

# 🚧 Development Progress

## Foundations

- [x] Set Up a Basic Exception
- [x] Create Static pages
- [x] Set Up Folder Structure
- [x] Implement Router and UI Tabs

## Features

- [x] Create Utils folder for functions
- [x] Tabs Functions
- [x] History Functions
- [x] Implement Radial Progress
- [x] Remove history by Category
- [x] Program PANIC function (create new tab and switch to it, close all problematic tabs)
- [x] Program Session Cleaner' Quick Productivity Button
- [x] Real-time Notifications when distracting tabs are opened

#  External Docs

For further guidance, [visit the Plasmo Documentation](https://docs.plasmo.com/)


## Submit to the webstores

The easiest way to deploy a Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action.

Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

---

*Note: This project is a work in progress.*