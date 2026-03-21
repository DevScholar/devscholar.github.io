---
name: "Node with Window"
description: "An Electron alternative for Node.js/Deno/Bun, providing cross-platform desktop application development"
category: "web"
---

# Node with Window
![WPF Notepad on Windows](/assets/images/screenshots/node-with-window/wpf-notepad.png)

Node with Window is a cross-platform desktop application framework that provides an Electron-compatible API while supporting Node.js, Deno, and Bun - all three JavaScript runtimes. On Windows it uses WPF and WebView2, on Linux it uses GTK4 and WebKitGTK, relying on system runtimes rather than bundling its own, keeping application size within a few MB.

## Features

**Multi-Runtime Support**

Supports Node.js, Deno, and Bun simultaneously. You can choose your preferred JavaScript runtime for desktop application development without installing additional runtimes.

**Electron-Compatible API**

API design is consistent with Electron. The main process uses familiar modules like app, BrowserWindow, and ipcMain, while the renderer process uses ipcRenderer to communicate with the main process. Developers with Electron experience can get started quickly.

**Lightweight**

Leverages existing system runtimes (.NET Framework and WebView2 on Windows, GJS and WebKitGTK on Linux), without bundling Chromium and a complete JavaScript engine, resulting in much smaller application size compared to Electron.

**Cross-Platform**

Supports Windows and Linux platforms. The same codebase runs on different platforms, automatically using platform-native UI technologies.

**Rapid Development**

Provides nww-forge scaffolding tool to create project structure with one command, supporting JavaScript and TypeScript templates for quick development start.

[Learn more](https://github.com/DevScholar/node-with-window)
