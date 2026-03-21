---
name: "VBSEngineJS"
description: "A VBScript engine implemented in TypeScript, supporting VBScript code execution in browser and Node.js environments"
category: "web"
---

# VBSEngineJS

VBSEngineJS is a VBScript engine implemented in TypeScript that supports executing VBScript code in browser and Node.js environments. With IE's retirement, modern browsers no longer support VBScript, but some legacy systems and old web pages still depend on it. VBSEngineJS provides a transition solution for running such code in modern environments.

## Features

**MSScriptControl-Compatible API**

Provides an API similar to Microsoft's MSScriptControl, including methods like addCode, run, eval, executeStatement, and addObject, making migration from legacy systems easier.

**Browser Mode**

Supports automatic parsing of VBScript code in pages, including `<script type="text/vbscript">` tags, inline event attributes, `vbscript:` protocol links, and more. Can also auto-bind event handlers.

**JavaScript Interoperability**

JavaScript objects can be exposed to VBScript via the addObject method, enabling interoperability between the two languages. Supports IE-style global variable sharing.

**Node.js Support**

In addition to browser environments, also supports running in Node.js, suitable for server-side VBScript code migration scenarios.

**Security Control**

Provides security options like maximum execution time limits to prevent infinite loops and resource exhaustion issues.

**Legacy System Compatibility**

Primarily used for legacy system compatibility, helping migrate old classic ASP code or run VBScript-dependent web pages in modern browsers.

[Learn more](https://github.com/DevScholar/vbs-engine-js)
