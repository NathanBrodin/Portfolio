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
  - React.js
  - Firebase
  - Chrome Extension
---

<!-- more -->

## MyPasswordManager

Made a Chrome extension to store and autofill passwords. I made it with React, which is uncommon for extensions, but I found a template (create-react-extension), and stored the data in Firebase Firestore. Everything is encrypted with AES (CryptoJS) before being sent to Firestore, and the secret key is generated and stored locally on your computer, so nobody else can read your data. It could also auto-submit the login form for you if you enabled it. Made a nice UI for the extension, and even published it on the Chrome Web Store.
