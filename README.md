# Freaky Fixes

A website connecting people with psychologists for one-on-one counseling, group therapy, and live support sessions.

## Features
- Firebase Authentication (email/password + Google sign-in)
- Firestore-backed contact form and user profiles
- Protected dashboard page for logged-in users
- Interactive guided-breathing exercise in the hero section
- Embedded AI support chat (draggable, collapsible widget)
- FAQ accordion, expandable service details, session "notify me" toggles
- Light/dark mode toggle

## Tech stack
Plain HTML, CSS, and JavaScript (ES modules) — no build step, no framework. Firebase handles auth, the database, and hosting.

## Project structure
- `index.html` — home page
- `login.html` / `signup.html` — authentication pages
- `dashboard.html` — protected page for signed-in users
- `auth.js` — shared Firebase Auth logic
- `nav-auth.js` — updates the nav based on sign-in state
- `chat-widget.js` — floating AI chat widget
- `interactions.js` — breathing exercise, scroll reveal, session notify toggles
- `firebase-config.js` — Firebase project connection (safe to be public; security comes from `firestore.rules`)
- `firestore.rules` — Firestore security rules (pasted into the Firebase console, not served as a file)
- `styles.css` — all styling

## Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** → Email/Password and Google sign-in.
3. Create a **Firestore** database and paste `firestore.rules` into the Rules tab.
4. Register a Web app in Project settings and copy your config into `firebase-config.js`.
5. Open `index.html` with a local server (e.g. VS Code's Live Server extension) — opening it directly as a file won't work, since ES modules require a server.

## Deploy
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Status
Core site, auth, and dashboard are in place. Planned next: real session booking, psychologist profiles, and a way for Freaky Fixes to view/respond to submitted contact messages from the console.
