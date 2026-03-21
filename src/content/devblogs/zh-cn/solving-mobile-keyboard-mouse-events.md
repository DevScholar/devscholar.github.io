---
title: "解决手机端不支持键鼠事件的问题"
description: "介绍 KBDMouseJS，一个为移动设备提供虚拟键盘和鼠标事件转换的 polyfill 库，解决触摸设备上键鼠事件不兼容的问题。"
pubDate: "2026-03-21"
author: "DevScholar"
---

# 解决手机端不支持键鼠事件的问题

移动设备的浏览器主要处理触摸事件，而不是传统的鼠标和键盘事件。这对于一些特殊场景造成了问题，比如在网页中运行 x86 模拟器需要键盘输入，或者老旧网页的拖拽功能没有考虑触摸事件。KBDMouseJS 是一个 polyfill 库，它提供虚拟 ANSI 键盘并将触摸事件转换为标准 DOM 鼠标事件。

这个项目的定位是复古计算，也就是兼容老旧网页和专业模拟器。如果你需要在手机上运行 Windows 95 模拟器，或者使用一些没有适配移动端的老旧网页，这个库可以帮助解决输入问题。

虚拟键盘的使用很简单。引入 CSS 和 JS 文件后，在页面中放置 `<virtual-keyboard>` 标签即可。键盘会在输入框获得焦点时自动弹出。

```html
<link rel="stylesheet" href="@devscholar/kbdmouse-js/dist/kbdmouse-js.css">
<script type="module">
  import "@devscholar/kbdmouse-js";
</script>
<virtual-keyboard></virtual-keyboard>
```

虚拟键盘默认使用 Shadow DOM 封装样式和结构，避免与页面其他样式冲突。如果需要禁用 Shadow DOM（比如调试或应用外部样式），可以设置 `shadow="false"` 属性。禁用后外部 CSS 可能会影响键盘外观。

虚拟鼠标的功能是将触摸操作转换为鼠标事件。它的操作逻辑类似 Windows 精密触控板：单指滑动移动光标，单指单击发送左键点击，双指单击发送右键点击，单指双击发送双击，单指点击后抬起再快速点击并保持可以拖拽，双指滑动发送滚轮事件。

```html
<script type="module">
    import { VkMouse } from "@devscholar/kbdmouse-js";

    document.addEventListener("DOMContentLoaded", function () {
        let element = document.getElementById("polyfilled-element");
        if (element) {
            let vkMouse = new VkMouse(element);
        }
    });
</script>
```

VkMouse 类接受一个 DOM 元素作为参数，为该元素启用鼠标事件 polyfill。如果需要取消 polyfill，调用 `vkMouse.detach()` 方法即可。注意这个项目不支持 HTML5 原生拖拽事件，如果需要那个功能，可以使用 drag-drop-touch-js 库。

快速开始一个新项目，首先创建项目目录并初始化 npm，然后安装 kbdmouse-js。创建 HTML 文件，引入 CSS 和 JS，放置虚拟键盘标签，并为需要鼠标事件的元素初始化 VkMouse。推荐使用 Vite 作为开发服务器，配置好启动脚本后运行 `npm run start`，在浏览器中打开 localhost:5173 即可测试。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>KBDMouseJS Demo</title>
  <link rel="stylesheet" href="@devscholar/kbdmouse-js/dist/kbdmouse-js.css">
</head>
<body>
  <textarea id="demo-textarea" placeholder="Type here..." rows="4" style="width: 100%;"></textarea>
  
  <virtual-keyboard></virtual-keyboard>
  
  <div id="target-area">
    <p>Draw or drag here with touch</p>
  </div>
  
  <script type="module">
    import { VkMouse } from "@devscholar/kbdmouse-js";
    
    document.addEventListener("DOMContentLoaded", function () {
      let element = document.getElementById("target-area");
      if (element) {
        let vkMouse = new VkMouse(element);
      }
    });
  </script>
</body>
</html>
```

开发时可以使用 `npm run dev:expose` 将页面暴露到局域网，这样可以把电脑连接到手机热点，在手机上打开网页进行测试。KBDMouseJS 的适用场景比较特定，主要是模拟器和老旧网页兼容。如果你的项目是这些场景，这个库可以省去自己实现触摸到鼠标事件转换的工作。
