---
title: "用 JavaScript 和 WebKitGTK 构建桌面应用"
description: "介绍如何使用 node-with-gjs 库在 GTK4 中嵌入 WebKitGTK 控件，用 Web 技术构建 Linux 桌面应用界面。"
pubDate: "2026-03-21"
author: "DevScholar"
---

# 用 JavaScript 和 WebKitGTK 构建桌面应用

WebKitGTK 是 WebKit 引擎的 GTK 移植版本，可以嵌入到 GTK 应用中显示网页内容。与 Electron 不同，WebKitGTK 使用系统已安装的 WebKit 运行时，不需要在应用安装包中捆绑完整的浏览器引擎，应用体积可以保持很小。通过 Node with GJS，我们可以在 JavaScript 中创建 GTK 窗口并嵌入 WebKitGTK 控件，用 HTML、CSS、JavaScript 构建界面，同时保留调用原生 API 的能力。

![WebKitGTK 计数器示例](/assets/images/screenshots/node-with-gjs/webkit/counter.png)

WebKitGTK 6.0 对应 GTK4，需要单独安装。Ubuntu/Debian 用户运行 `apt install libwebkitgtk-6.0-0`，Fedora 用户运行 `dnf install webkitgtk6.0`，Arch 用户运行 `pacman -S webkitgtk-6.0`。安装完成后就可以在代码中导入 WebKit 模块。

创建 WebView 控件前需要先创建 UserContentManager，它负责管理注入到网页的脚本和样式表，以及处理网页发送的消息。通过 register_script_message_handler 注册消息处理器后，网页端就可以通过 window.webkit.messageHandlers.handlerName.postMessage 向原生端发送消息。

```typescript
import Gtk from 'gi://Gtk?version=4.0';
import WebKit from 'gi://WebKit?version=6.0';

const app = new Gtk.Application({ application_id: 'org.gtk.webkitcounter' });

app.connect('activate', () => {
    const window = new Gtk.ApplicationWindow({
        application: app,
        title: 'WebKit Counter App',
        default_width: 500,
        default_height: 400
    });

    const box = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        spacing: 0
    });

    const contentManager = new WebKit.UserContentManager();

    contentManager.connect('script-message-received', (manager, value) => {
        const message = value.to_string();
        if (message) console.log(`[WebView] ${message}`);
    });
    contentManager.register_script_message_handler('console', null);

    const webView = new WebKit.WebView({
        vexpand: true,
        hexpand: true,
        user_content_manager: contentManager
    });

    webView.load_uri('file:///path/to/index.html');

    webView.connect('load-changed', (webview, loadEvent) => {
        if (loadEvent === WebKit.LoadEvent.FINISHED) {
            console.log('Page Loaded Successfully');
        }
    });

    box.append(webView);

    window.set_child(box);
    window.present();
});

app.run([]);
```

WebView 的 load_uri 方法加载指定 URL，可以是本地文件路径（file:// 前缀）也可以是网络地址。load-changed 信号在页面加载状态变化时触发，LoadEvent.FINISHED 表示加载完成。vexpand 和 hexpand 属性设为 true 让 WebView 占满可用空间。

网页端需要做一些适配才能与原生端通信。WebKitGTK 的消息机制与 WebView2 不同，网页端通过 window.webkit.messageHandlers.handlerName.postMessage 发送消息，而不是 window.chrome.webview.postMessage。可以在网页加载时注入一段脚本，重定向 console.log 到消息发送，这样原生端就能看到网页的控制台输出。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Counter</title>
    <script>
        (function() {
            const originalConsole = window.console;
            window.console = {
                log: function(...args) {
                    window.webkit.messageHandlers.console.postMessage(args.join(' '));
                },
                error: function(...args) {
                    window.webkit.messageHandlers.console.postMessage('[ERROR] ' + args.join(' '));
                }
            };
        })();
    </script>
</head>
<body>
    <h1>Counter App</h1>
    <p id="display">Clicks: 0</p>
    <button id="btn">Click to Add</button>

    <script>
        let clickCount = 0;
        const display = document.getElementById('display');
        const button = document.getElementById('btn');

        button.addEventListener('click', function() {
            clickCount++;
            const message = 'Button clicked ' + clickCount + ' times';
            display.textContent = message;
            console.log(message);
        });
    </script>
</body>
</html>
```

这段脚本在页面加载时立即执行，把 console.log 替换为调用 window.webkit.messageHandlers.console.postMessage。这样网页中所有的 console.log 调用都会被转发到原生端，方便调试。

完整的浏览器示例还可以添加导航工具栏，包含后退、前进按钮和地址栏。后退和前进通过 WebView 的 can_go_back、go_back、can_go_forward、go_forward 方法实现。地址栏是一个 Gtk.Entry 控件，activate 信号在用户按下回车时触发，读取输入的 URL 并调用 load_uri 加载。

```typescript
const toolbar = new Gtk.Box({
    orientation: Gtk.Orientation.HORIZONTAL,
    spacing: 5
});

const backButton = new Gtk.Button({ label: '← Back' });
const forwardButton = new Gtk.Button({ label: 'Forward →' });
const urlEntry = new Gtk.Entry({
    placeholder_text: 'Enter URL',
    hexpand: true
});

backButton.connect('clicked', () => {
    if (webView.can_go_back()) webView.go_back();
});

forwardButton.connect('clicked', () => {
    if (webView.can_go_forward()) webView.go_forward();
});

urlEntry.connect('activate', () => {
    let uri = urlEntry.get_text();
    if (!uri.startsWith('http://') && !uri.startsWith('https://') && !uri.startsWith('file://')) {
        uri = 'https://' + uri;
    }
    webView.load_uri(uri);
});

toolbar.append(backButton);
toolbar.append(forwardButton);
toolbar.append(urlEntry);

box.append(toolbar);
```

这种架构的好处是界面层完全使用 Web 技术开发，可以利用成熟的前端框架，同时原生层提供系统 API 访问能力。与 Electron 相比，应用安装包体积可以控制在几 MB 以内，因为不需要捆绑 WebKit。与纯原生开发相比，界面开发效率更高。

需要注意 WebKitGTK 的版本兼容性。WebKitGTK 6.0 对应 GTK4，而旧版本的 WebKitGTK 2.0 对应 GTK3。两者 API 有差异，不能混用。Node with GJS 目前只支持 GTK4 和 WebKitGTK 6.0。运行示例的方法是执行 `node start.js your-file.ts`，完整示例可以在 node-with-gjs-examples 仓库的 gtk-webkit 目录中找到。
