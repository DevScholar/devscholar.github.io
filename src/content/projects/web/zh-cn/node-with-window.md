---
name: "Node with Window"
description: "适用于 Node.js/Deno/Bun 的 Electron 替代品，提供跨平台桌面应用开发能力"
category: "web"
---

# Node with Window
![WPF Notepad on Windows](/assets/images/screenshots/node-with-window/wpf-notepad.png)

Node with Window 是一个跨平台的桌面应用框架，提供与 Electron 兼容的 API，同时支持 Node.js、Deno 和 Bun 三种 JavaScript 运行时。在 Windows 上使用 WPF 和 WebView2，在 Linux 上使用 GTK4 和 WebKitGTK，依赖系统已有的运行时而非捆绑自己的，因此应用体积可以控制在几 MB 以内。

## 特性

**多运行时支持**

同时支持 Node.js、Deno 和 Bun。你可以选择自己喜欢的 JavaScript 运行时开发桌面应用，无需额外安装其他运行时。

**Electron 兼容 API**

API 设计与 Electron 保持一致，主进程使用 app、BrowserWindow、ipcMain 等熟悉的模块，渲染进程使用 ipcRenderer 与主进程通信。有 Electron 开发经验的开发者可以快速上手。

**轻量级**

利用系统已有的运行时（Windows 上的 .NET Framework 和 WebView2，Linux 上的 GJS 和 WebKitGTK），不需要捆绑 Chromium 和完整的 JavaScript 引擎，应用安装包体积远小于 Electron。

**跨平台**

支持 Windows 和 Linux 平台。同一套代码可以在不同平台上运行，自动使用平台原生的 UI 技术。

**快速开发**

提供 nww-forge 脚手架工具，一键创建项目结构，支持 JavaScript 和 TypeScript 模板，快速开始开发。

[了解更多](https://github.com/DevScholar/node-with-window)
