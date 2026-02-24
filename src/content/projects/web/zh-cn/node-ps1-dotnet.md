---
name: "Node PS1 for .NET"
description: "适用于 Node.js/Deno/Bun 的对 .NET Framework 的绑定"
category: "web"
---

# Node PS1 for .NET
![WebView2 示例](/assets/images/screenshots/node-ps1-dotnet-webview2.png)

Node PS1 for .NET 是适用于 Node.js/Deno/Bun 对 .NET Framework 的绑定，其 API 风格模仿微软的 Node API for .NET，但使用系统自带的低版本 .NET 以减小应用程序体积。并且用跨进程通信 (IPC) 替代 C++ Addon 以兼容多种 JS 脚本宿主。此项目为 GUI 程序（含 WinForms 和 WPF）和 WebView2 提供了第一等支持，有开箱即用的示例。

## 特性

**可修改**

此项目使用 TS+C#（利用 PowerShell 的`Add-Type``指令免编译执行）而不是原生编程语言编写。这意味着用本项目进行开发无需下载庞大的原生编程语言构建工具，而且你可以根据自己的需要修改此项目的源码而无需等待开发者加入此功能。这对于”加入对系统特有 API“的支持等场景特别有用。

**轻量级**

此项目使用系统自带的 .NET Framework 替代高版本 .NET 运行时。因此，用户无需下载大体积的高版本 .NET 运行时即可运行本软件。

**GUI 支持**

此项目为 GUI 提供第一等支持，包括 WinForms 和 WPF，以及 WebView2。这些示例都是开箱即用的。

**高性能**

此项目特别为拖拽等高频 IPC 交互场景进行了优化。用户可以运行项目示例自带的 Drag Box 示例并感受一下。

**使用标准 API**

此项目的 API 模仿微软的 Node API for .NET 项目。用户无需学习新的 API 即可上手。

**多宿主**

此项目同时支持 Node.js,Deno 和 Bun。用户可以选择自己喜欢的 JS 运行时。

[了解更多](https://github.com/DevScholar/node-ps1-dotnet)