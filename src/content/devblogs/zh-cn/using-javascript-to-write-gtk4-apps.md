---
title: "用 JavaScript 编写 GTK4 桌面应用"
description: "介绍如何使用 node-with-gjs 库在 Node.js、Deno 或 Bun 中调用 GTK4 构建原生 Linux 桌面应用。"
pubDate: "2026-03-21"
author: "DevScholar"
---

# 用 JavaScript 编写 GTK4 桌面应用

GTK 是 GNOME 桌面环境的 UI 工具包，GTK4 是目前的最新版本，被 Fedora、Ubuntu、Debian 等主流 Linux 发行版广泛采用。传统上 GTK 应用使用 C、Vala 或 Python 编写，但通过 GJS（GNOME JavaScript）运行时，JavaScript 开发者也能直接调用 GTK 的全部 API。Node with GJS 这个库把 GJS 带到了 Node.js 生态中，通过 IPC 机制让 Node.js、Deno、Bun 都能与 GJS 交互。

GJS 基于 GObject Introspection 技术，这是一种在运行时动态绑定 C 库的机制。GTK 及其相关库都提供了 GIR（GObject Introspection Repository）文件，描述了类型、方法、信号等信息。GJS 读取这些描述文件后就能在 JavaScript 中调用原生 API。Node with GJS 通过 Unix 管道实现 Node.js 和 GJS 进程之间的通信，所以不需要编译 C++ 扩展，兼容性很好。

![GTK4 计数器示例](/assets/images/screenshots/node-with-gjs/gtk4/counter.png)

使用前需要确保系统安装了 GTK4 和 GJS。基于 GNOME 的发行版通常已经预装了这些依赖。Ubuntu/Debian 用户可以运行 `apt install libgtk-4-1 gjs`，Fedora 用户运行 `dnf install gtk4 gjs`，Arch 用户运行 `pacman -S gtk4 gjs`。安装完成后就可以通过 npm 安装 node-with-gjs 库。

GTK4 应用的入口是 Gtk.Application 类，它封装了应用生命周期、窗口管理、菜单集成等功能。创建 Application 实例时需要提供一个唯一的 application_id，通常使用反向域名格式如 org.gtk.counter。应用启动后触发 activate 信号，在回调中创建窗口和控件。

```typescript
import Gtk from 'gi://Gtk?version=4.0';

let clickCount = 0;

const app = new Gtk.Application({ application_id: 'org.gtk.counter' });

app.connect('activate', () => {
    const window = new Gtk.ApplicationWindow({
        application: app,
        title: 'GTK Counter App',
        default_width: 400,
        default_height: 300
    });

    window.connect('close-request', () => {
        app.quit();
        return false;
    });

    const box = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        spacing: 10,
        halign: Gtk.Align.CENTER,
        valign: Gtk.Align.CENTER
    });
    box.set_margin_start(20);
    box.set_margin_end(20);
    box.set_margin_top(20);
    box.set_margin_bottom(20);

    const label = new Gtk.Label({
        label: 'Clicks: 0',
        css_classes: ['title-1']
    });

    const button = new Gtk.Button({
        label: 'Click to Add',
        css_classes: ['suggested-action']
    });

    button.connect('clicked', () => {
        clickCount++;
        label.set_label(`Clicked ${clickCount} times`);
    });

    box.append(label);
    box.append(button);

    window.set_child(box);
    window.present();
});

app.run([]);
```

导入语句 `import Gtk from 'gi://Gtk?version=4.0'` 是 GJS 特有的语法，gi:// 前缀表示从 GObject Introspection 仓库加载，version 参数指定版本。GTK4 的布局系统使用容器控件，Gtk.Box 是最常用的容器之一，子控件按水平或垂直方向线性排列。orientation 属性控制排列方向，spacing 控制子控件间距。halign 和 valign 控制控件在分配空间内的对齐方式。

GTK4 使用 CSS 进行样式定制，css_classes 属性可以给控件添加 CSS 类名。title-1 是 GTK 预定义的大标题样式，suggested-action 是建议操作的按钮样式，通常显示为蓝色。自定义样式可以通过 Gtk.CssProvider 加载外部 CSS 文件，也可以直接在代码中定义。

事件处理使用 connect 方法，第一个参数是信号名称，第二个参数是回调函数。按钮的点击信号叫 clicked，窗口的关闭信号叫 close-request。close-request 回调需要返回 false 才能继续关闭流程，返回 true 会阻止关闭。app.quit() 用于退出应用。

窗口的 set_child 方法设置内容控件，present 方法显示窗口。最后调用 app.run([]) 启动应用，参数是命令行参数数组，空数组表示没有额外参数。

再来看一个拖动方块的例子，这个例子展示了 Gtk.Fixed 容器和事件控制器的使用。Fixed 是 GTK4 中唯一支持绝对定位的容器，子控件通过 put 方法放置到指定坐标，move 方法更新位置。GTK4 的事件处理采用事件控制器模式，GestureDrag 是专门处理拖动手势的控制器。

```typescript
import Gtk from 'gi://Gtk?version=4.0';

const app = new Gtk.Application({ application_id: 'org.gtk.dragbox' });

app.connect('activate', () => {
    const window = new Gtk.ApplicationWindow({
        application: app,
        title: 'Drag Example',
        default_width: 600,
        default_height: 400
    });

    const fixed = new Gtk.Fixed();
    fixed.set_hexpand(true);
    fixed.set_vexpand(true);

    const squareSize = 80;
    const drawingArea = new Gtk.DrawingArea();
    drawingArea.set_size_request(squareSize, squareSize);

    const drawFunction = (area: any, cr: any, width: number, height: number) => {
        cr.setSourceRGB(1.0, 0.2, 0.2);
        cr.rectangle(0, 0, width, height);
        cr.fill();
    };

    drawingArea.set_draw_func(drawFunction);

    let currentX = 260;
    let currentY = 160;
    fixed.put(drawingArea, currentX, currentY);

    const drag = new Gtk.GestureDrag();

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    drag.connect('drag-begin', (gesture: any, startX: number, startY: number) => {
        if (startX >= currentX && startX <= currentX + squareSize &&
            startY >= currentY && startY <= currentY + squareSize) {
            isDragging = true;
            dragStartX = currentX;
            dragStartY = currentY;
        }
    });

    drag.connect('drag-update', (gesture: any, offsetX: number, offsetY: number) => {
        if (!isDragging) return;
        fixed.move(drawingArea, dragStartX + offsetX, dragStartY + offsetY);
    });

    drag.connect('drag-end', (gesture: any, offsetX: number, offsetY: number) => {
        if (!isDragging) return;
        isDragging = false;
        currentX = dragStartX + offsetX;
        currentY = dragStartY + offsetY;
    });

    fixed.add_controller(drag);

    window.set_child(fixed);
    window.present();
});

app.run([]);
```

DrawingArea 是一个自定义绘制区域，set_draw_func 设置绘制回调。回调的第二个参数 cr 是 Cairo 上下文，Cairo 是 GTK 使用的 2D 图形库。setSourceRGB 设置颜色，rectangle 创建矩形路径，fill 填充路径。这里用 DrawingArea 而不是普通的 Button 或 Label，是为了演示 Cairo 绘图的基本用法。

GestureDrag 控制器需要通过 add_controller 方法添加到控件上。drag-begin 信号在按下鼠标开始拖动时触发，参数是相对于控件左上角的起始坐标。drag-update 在拖动过程中持续触发，参数是相对于起始点的偏移量。drag-end 在松开鼠标时触发。注意 GestureDrag 的坐标是相对于添加控制器的控件，而不是 Fixed 容器，所以需要在 drag-begin 中判断点击位置是否在方块范围内。

运行示例的方法是执行 `node start.js your-file.ts`，start.js 是 node-with-gjs 提供的启动脚本。由于 GJS 只在 Linux 上可用，这个库目前只支持 Linux 平台。更多示例可以参考 node-with-gjs-examples 仓库。
