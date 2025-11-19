# About Section

Productivity Tool for Chrome Extension that allows you to to remove any blemishes (Social Media posts, Memes, NSFW sites...) from your browser history, current tabs, etc.

This is a Browser Extension project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

# To-Do

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

# Design Decisions & Considerations

- Any and all libraries chosen must be lightweight and fast to load.
- Use as little assets as possible.

## Current Dependecies

- React
- Redux Toolkit
- Plasmo
- Tailwind
- MaterialUI (MUI)
- React Hot Toast

## Considered Dependecies
- N/A

# For Devs

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
