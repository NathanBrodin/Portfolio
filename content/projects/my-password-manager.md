---
id: my-password-manager
title: MyPasswordManager
icon: key-round
link: https://github.com/NathanBrodin/MyPasswordManager
type: personal
startDate: '2022-06'
endDate: '2022-09'
skills:
  - JavaScript
  - React
  - Firebase
  - Chrome Extension
  - CryptoJS
---

I made a [Chrome extension](https://developer.chrome.com/docs/extensions) to store and autofill passwords, with [React](https://react.dev/), which is uncommon for extensions, but I found a template (create-react-extension), and stored the data in [Firebase](https://firebase.google.com/) Firestore.

Everything is encrypted with AES (CryptoJS) before being sent to Firestore, and the secret key is generated and stored locally on your computer, so nobody else can read your data. It could also auto-submit the login form for you if you enabled it.

Made a nice UI for the extension, and even published it on the Chrome Web Store.

<!-- more -->

I made it while in Finland for my exchange semester, I remember forcing my friends to review it 5 stars on the Chrome Web Store.
