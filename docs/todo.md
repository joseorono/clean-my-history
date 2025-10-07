# Clean My History - Project TODO

## 🚀 Features
- [x] Panic Button (close tabs with keywords)
- [x] Clean All Browsing History
- [x] Onboarding page after install
- [ ] Seems like our Redux Store doesn't Persist. Enable the PersistGate:
    - Docs de Redux: https://docs.plasmo.com/quickstarts/with-redux
- [ ] Implement Settings View
    - Allow selecting Categories to clean based on badKeyboardCategories
    - Allow adding custom keywords
    - Support for whitelisting domains
    - Settings must be saved on Redux and made persistant
- [ ] Implement Clean Browser View
    - It's a Section with a bunch of button to clean history, tabs, etc
- [ ] Rename "Panic Button" to "Session Cleaner"
    - [ ] It's not a delete button, maybe use something like a "Play" icon or something.
    - [ ] Implement Session Cleaner (the mutation is just a snub rn)
- [ ] Es posible que necesites pasarle parametros a la mutacion
    - [ ] Para poder pasarle parametros a la mutacion, necesitarias añadirle un nuevo prop a TaskButton

## 🐛 Bug Fixes
- [ ] For some reason, Tailwind isn't working on the onboarding.html page

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
