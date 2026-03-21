---
name: "KBDMouseJS"
description: "A polyfill library providing virtual keyboard and mouse event conversion for mobile devices"
category: "web"
---

# KBDMouseJS

KBDMouseJS is a polyfill library focused on retro computing scenarios, providing a virtual ANSI keyboard for mobile devices and converting touch events to standard DOM mouse events. Suitable for scenarios requiring keyboard and mouse input on phones, such as running x86 emulators or using old web pages.

## Features

**Virtual ANSI Keyboard**

Provides a complete virtual ANSI keyboard supporting various function keys and modifier keys. The keyboard automatically appears when an input field gains focus, using Shadow DOM for style encapsulation to avoid conflicts.

**Touch to Mouse Events**

Converts touch operations to standard DOM mouse events. Operation logic resembles Windows Precision Touchpad: one finger moves cursor, single tap for left click, two-finger tap for right click, two-finger slide for scroll, supports drag gestures.

**Lightweight**

Pure JavaScript implementation with no external dependencies. Use only the virtual keyboard or only the virtual mouse functionality as needed.

**Easy Integration**

Simple API design - just import CSS and JS files, place the virtual keyboard tag, and initialize VkMouse for elements that need mouse events.

**Local Network Testing**

Supports exposing the development server to local network, making it easy to connect to phone hotspot for testing on real mobile devices.

**Scenario-Specific Optimization**

Designed specifically for emulators and old web page compatibility, solving the lack of keyboard and mouse event support on touch devices in these scenarios.

[Learn more](https://github.com/DevScholar/kbdmouse-js)
