# Clean My History - Project TODO

## 🚀 Features

- [x] Panic Button (close tabs with keywords)
- [x] Clean All Browsing History
- [x] Onboarding page after install
- [x] Seems like our Redux Store doesn't Persist. Enable persistence:
  - Implemented using @plasmohq/storage for cross-context state synchronization

- [x] Implement Settings View
  - [x] Allow selecting Categories to clean based on badKeyboardCategories [x]
  - [x] Allow adding custom keywords
  - [x] Support for whitelisting domains
  - [x] Settings must be saved on Redux and made persistant
- [x] Implement Clean Browser View
  - It's a Section with a bunch of buttons to clean history, tabs, etc
- [x] Rename "Panic Button" to "Session Cleaner" [x]
  - [x] It's not a delete button, maybe use something like a "Play" icon or something.
  - [x] Implement Session Cleaner with proper mutation handling
- [x] Es posible que necesites pasarle parametros a la mutacion
  - [x] Para poder pasarle parametros a la mutacion, necesitarias añadirle un nuevo prop a TaskButton
- [x] Implement tab closing with keywords in SessionCleanerView
  - [x] Added proper keyword filtering based on selected categories
  - [x] Enhanced UI to show selected categories and keywords
- [x] Update cleaner functions to respect whitelisted domains
  - [x] Modified closeTabsWithKeywords to accept whitelisted domains
  - [x] Added helper function to check if URL is whitelisted
  - [x] Updated SessionCleanerView to pass whitelisted domains
  - [x] Added visual indicator for whitelisted domains count

## 🐛 Bug Fixes

- [x] For some reason, Tailwind isn't working on the onboarding.html page

## ✅ Completed

- [x] Initial project setup
- [x] Basic history scanning functionality
- [x] Simple UI for history management
- [x] Clean All Browsing History
- [x] Onboarding after install

## 💡 Future Ideas

- Add export/import settings functionality
- Integrate with multiple browsers (Firefox, Edge)
- Password-protect sensitive settings
- Cloud sync for settings and preferences
- Keyboard shortcuts for quick actions
