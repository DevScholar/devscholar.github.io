---
name: "Node PS1 for .NET"
description: "Bindings for .NET Framework for Node.js/Deno/Bun"
category: "web"
---

# Node PS1 for .NET
![WebView2 Example](/assets/images/screenshots/node-ps1-dotnet-webview2.png)

Node PS1 for .NET provides bindings for .NET Framework for Node.js/Deno/Bun. Its API style mimics Microsoft's Node API for .NET, but uses the system's built-in lower version of .NET to reduce application size. It also uses Inter-Process Communication (IPC) instead of C++ Addons to be compatible with multiple JS script hosts. This project provides first-class support for GUI programs (including WinForms and WPF) and WebView2, with ready-to-use examples.

## Features

**Modifiable**

This project is written in TS+C# (using PowerShell's `Add-Type` directive for compilation-free execution) rather than native programming languages. This means you don't need to download large native programming language build tools to develop with this project, and you can modify the source code according to your needs without waiting for the developer to add this feature. This is especially useful for scenarios like "adding support for system-specific APIs".

**Lightweight**

This project uses the system's built-in .NET Framework instead of higher-version .NET runtime. Therefore, users don't need to download large higher-version .NET runtime to run this software.

**GUI Support**

This project provides first-class support for GUI, including WinForms and WPF, as well as WebView2. All these examples are ready to use out of the box.

**High Performance**

This project is specifically optimized for high-frequency IPC interaction scenarios such as drag-and-drop. You can run the Drag Box example included in the project examples to experience it.

**Standard API**

This project's API mimics Microsoft's Node API for .NET project. Users can get started without learning new APIs.

**Multi-Host**

This project supports Node.js, Deno, and Bun simultaneously. Users can choose their favorite JS runtime.

[Learn more](https://github.com/DevScholar/node-ps1-dotnet)
