---
name: "VBSEngineJS"
description: "用 TypeScript 实现的 VBScript 引擎，支持在浏览器和 Node.js 环境中执行 VBScript 代码"
category: "web"
---

# VBSEngineJS

VBSEngineJS 是一个用 TypeScript 实现的 VBScript 引擎，支持在浏览器和 Node.js 环境中执行 VBScript 代码。随着 IE 浏览器的退役，现代浏览器已不再支持 VBScript，但一些遗留系统和老旧网页仍然依赖它。VBSEngineJS 提供了一个过渡方案，让这些代码能在现代环境中运行。

## 特性

**MSScriptControl 兼容 API**

提供与微软 MSScriptControl 类似的 API，包括 addCode、run、eval、executeStatement、addObject 等方法，方便从旧系统迁移。

**浏览器模式**

支持自动解析页面中的 VBScript 代码，包括 `<script type="text/vbscript">` 标签、内联事件属性、`vbscript:` 协议链接等。还可以自动绑定事件处理程序。

**JavaScript 互操作**

通过 addObject 方法可以将 JavaScript 对象暴露给 VBScript，实现两种语言的互操作。支持 IE 风格的全局变量共享。

**Node.js 支持**

除了浏览器环境，也支持在 Node.js 中运行，适合服务端的 VBScript 代码迁移场景。

**安全控制**

提供最大执行时间限制等安全选项，防止无限循环和资源耗尽问题。

**遗留系统兼容**

主要用于兼容遗留系统，帮助迁移老旧的 ASP 经典版代码或让依赖 VBScript 的网页在现代浏览器中运行。

[了解更多](https://github.com/DevScholar/vbs-engine-js)
