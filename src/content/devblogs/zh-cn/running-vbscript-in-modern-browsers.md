---
title: "在现代浏览器中运行 VBScript 的方法"
description: "介绍 VbsEngineJS，一个用 TypeScript 实现的 VBScript 引擎，支持在浏览器和 Node.js 环境中执行 VBScript 代码。"
pubDate: "2026-03-21"
author: "DevScholar"
---

# 在现代浏览器中运行 VBScript 的方法

VBScript 是微软在 1996 年推出的脚本语言，曾经是 ASP 经典版和 IE 浏览器的主要脚本语言之一。随着 IE 浏览器的退役，VBScript 也逐渐淡出了主流视野。现代浏览器已经不再支持 VBScript，但一些遗留系统和老旧网页仍然依赖它。VbsEngineJS 是一个用 TypeScript 实现的 VBScript 引擎，可以在现代浏览器和 Node.js 中执行 VBScript 代码。

VbsEngineJS 的设计目标是提供与微软 MSScriptControl 类似的 API。核心类 VbsEngine 提供了 addCode、run、eval、executeStatement 等方法，可以添加代码、调用函数、执行语句和计算表达式。addObject 方法可以将 JavaScript 对象暴露给 VBScript，实现两种语言的互操作。

```typescript
import { VbsEngine } from '@devscholar/vbs-engine-js';

const engine = new VbsEngine();

engine.addCode(`
  Function Multiply(a, b)
      Multiply = a * b
  End Function
  
  Class Calculator
      Public Function Add(x, y)
          Add = x + y
      End Function
  End Class
`);

const product = engine.run('Multiply', 6, 7);
console.log(product);

const myApp = {
  name: 'MyApp',
  greet: (name: string) => `Hello, ${name}!`
};
engine.addObject('MyApp', myApp, true);

engine.executeStatement('result = MyApp.greet("World")');
const result = engine.eval('result');
console.log(result);
```

上面的代码展示了基本用法。addCode 定义了 Multiply 函数和 Calculator 类，run 方法调用函数并返回结果。addObject 将 JavaScript 对象 myApp 暴露为 VBScript 中的 MyApp 变量，第三个参数 true 表示同时暴露对象的方法。之后在 VBScript 中就可以调用 MyApp.greet 了。

浏览器模式下，VbsEngineJS 可以自动处理页面中的 VBScript 代码。它会解析 `<script type="text/vbscript">` 标签、内联事件属性如 `onclick="vbscript:..."`、以及 `vbscript:` 协议链接。还可以自动绑定事件处理程序，比如名为 `Button1_OnClick` 的 Sub 会自动绑定到 id 为 Button1 的元素的 click 事件。

```typescript
const browserEngine = new VbsEngine({
  mode: 'browser',
  parseScriptElement: true,
  parseInlineEventAttributes: true,
  parseEventSubNames: true
});
```

引擎选项包括 mode（运行模式）、injectGlobalThis（IE 风格的全局变量共享）、maxExecutionTime（最大执行时间限制）等。浏览器模式下还有 parseScriptElement、parseInlineEventAttributes、parseEventSubNames、parseVbsProtocol、overrideJsEvalFunctions 等选项，控制自动解析行为的范围。

安全性是需要特别注意的问题。VBScript 引擎执行的是任意代码，存在代码注入、无限循环、资源耗尽等风险。暴露给 VBScript 的 JavaScript 对象可以被脚本访问和修改。在生产环境中使用时，应该限制执行时间、谨慎暴露对象、避免执行不可信的代码。

```typescript
const engine = new VbsEngine({
  injectGlobalThis: true,
  maxExecutionTime: 5000
});
```

快速开始一个新项目，首先安装依赖 `npm install @devscholar/vbs-engine-js`。浏览器使用时创建 HTML 文件，引入模块并实例化 VbsEngine。Node.js 使用时创建 JS 文件，注意在 package.json 中设置 `"type": "module"` 以支持 ES 模块语法。

VbsEngineJS 的主要用途是兼容遗留系统。如果你的项目需要迁移老旧的 ASP 经典版代码，或者需要在现代浏览器中运行依赖 VBScript 的网页，这个引擎可以作为一个过渡方案。它不是为了让新项目使用 VBScript 开发，而是为了解决历史遗留问题。完整 API 文档和更多示例可以在项目仓库中找到。
