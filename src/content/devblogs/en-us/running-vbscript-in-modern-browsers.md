---
title: "Running VBScript in Modern Browsers"
description: "Introducing VbsEngineJS, a VBScript engine implemented in TypeScript that supports executing VBScript code in browser and Node.js environments."
pubDate: "2026-03-21"
author: "DevScholar"
---

# Running VBScript in Modern Browsers

VBScript is a scripting language Microsoft introduced in 1996, once one of the primary scripting languages for classic ASP and Internet Explorer. With IE's retirement, VBScript has faded from mainstream use. Modern browsers no longer support VBScript, but some legacy systems and old web pages still depend on it. VbsEngineJS is a VBScript engine implemented in TypeScript that can execute VBScript code in modern browsers and Node.js.

VbsEngineJS is designed to provide an API similar to Microsoft's MSScriptControl. The core VbsEngine class offers methods like addCode, run, eval, and executeStatement for adding code, calling functions, executing statements, and evaluating expressions. The addObject method exposes JavaScript objects to VBScript, enabling interoperability between the two languages.

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

The code above demonstrates basic usage. addCode defines the Multiply function and Calculator class, while run calls the function and returns the result. addObject exposes the JavaScript object myApp as the MyApp variable in VBScript - the third parameter true means object methods are also exposed. After that, MyApp.greet can be called from VBScript.

In browser mode, VbsEngineJS can automatically handle VBScript code in the page. It parses `<script type="text/vbscript">` tags, inline event attributes like `onclick="vbscript:..."`, and `vbscript:` protocol links. It can also auto-bind event handlers - for example, a Sub named `Button1_OnClick` automatically binds to the click event of the element with id Button1.

```typescript
const browserEngine = new VbsEngine({
  mode: 'browser',
  parseScriptElement: true,
  parseInlineEventAttributes: true,
  parseEventSubNames: true
});
```

Engine options include mode (runtime mode), injectGlobalThis (IE-style global variable sharing), maxExecutionTime (maximum execution time limit), and more. Browser mode has additional options like parseScriptElement, parseInlineEventAttributes, parseEventSubNames, parseVbsProtocol, and overrideJsEvalFunctions to control the scope of automatic parsing behavior.

Security is a critical concern. The VBScript engine executes arbitrary code, posing risks like code injection, infinite loops, and resource exhaustion. JavaScript objects exposed to VBScript can be accessed and modified by scripts. In production environments, you should limit execution time, carefully expose objects, and avoid executing untrusted code.

```typescript
const engine = new VbsEngine({
  injectGlobalThis: true,
  maxExecutionTime: 5000
});
```

To quickly start a new project, first install the dependency with `npm install @devscholar/vbs-engine-js`. For browser usage, create an HTML file, import the module, and instantiate VbsEngine. For Node.js usage, create a JS file and note that you need to set `"type": "module"` in package.json to support ES module syntax.

VbsEngineJS's primary use case is legacy system compatibility. If your project needs to migrate old classic ASP code or run VBScript-dependent web pages in modern browsers, this engine serves as a transition solution. It's not intended for new projects to develop with VBScript, but rather to solve historical legacy issues. Complete API documentation and more examples can be found in the project repository.
