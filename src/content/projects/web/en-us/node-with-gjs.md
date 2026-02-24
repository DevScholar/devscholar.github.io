---
name: "Node with GJS"
description: "Bindings for GNOME JavaScript for Node.js/Deno/Bun"
category: "web"
---

# Node with GJS
![WebKitGTK Example](/assets/images/screenshots/node-with-gjs-webkitgtk.png)

Node with GJS provides bindings for GNOME JavaScript (GJS) for Node.js/Deno/Bun. Its API style mimics GJS with module support (`-m`) enabled. It also uses Inter-Process Communication (IPC) instead of C++ Addons to be compatible with multiple JS script hosts. This project provides first-class support for GUI programs (including GTK 4 and Adwaita) and WebKitGTK, with ready-to-use examples.

## Features

**Modifiable**

This project is written in TS+JS (using JSDoc to solve GJS's lack of TypeScript support while adding type annotations for better development; Node.js side uses TS) rather than native programming languages. This means you don't need to download large native programming language build tools to develop with this project, and you can modify the source code according to your needs without waiting for the developer to add this feature. This is especially useful for scenarios like "adding support for system-specific APIs".

**Lightweight**

This project uses the system's built-in GJS runtime, which is usually pre-installed on Linux distributions using GNOME. Therefore, users don't need to download large third-party dependencies to run this software.

**GUI Support**

This project provides first-class support for GUI, including GTK 4 and Adwaita, as well as WebKitGTK. All these examples are ready to use out of the box.

**High Performance**

This project is specifically optimized for high-frequency IPC interaction scenarios such as drag-and-drop. You can run the Drag Box example included in the project examples to experience it.

**Standard API**

This project's API mimics GJS with module support (`-m`) enabled. Users can get started without learning new APIs.

**Multi-Host**

This project supports Node.js, Deno, and Bun simultaneously. Users can choose their favorite JS runtime.

[Learn more](https://github.com/DevScholar/node-with-gjs)
