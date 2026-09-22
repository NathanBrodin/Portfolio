---
id: chat-app
title: Chat App
icon: message-square
link: https://gitlab.esiea.fr/brodin/chat-app
type: school
startDate: '2023-05'
endDate: '2023-05'
skills:
  - JavaScript
  - Node.js
  - Express
  - Socket.io
  - CSS
  - Figma
---

<!-- more -->

---

For school we had to make a chat app with Node, as the end of semester project of our web class, with a classmate. I first made the UI on Figma, then built the server, and the HTML/CSS.

The server is Express with Socket.io for the real-time messaging, bcrypt for password hashing, sessions to stay logged in, and multer to upload images. The app has a global room, private messages by clicking on a user in the sidebar, profile pictures, and image sending. It even prevents you from logging in twice with the same account.
