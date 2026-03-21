---
title: "用 JavaScript 编写 Adwaita 风格应用"
description: "介绍如何使用 node-with-gjs 库调用 libadwaita 构建符合 GNOME Human Interface Guidelines 的现代 Linux 桌面应用。"
pubDate: "2026-03-21"
author: "DevScholar"
---

# 用 JavaScript 编写 Adwaita 风格应用

Adwaita 是 GNOME 桌面环境的设计语言和默认主题，libadwaita 是实现这套设计语言的 GTK4 库。它提供了一系列符合 GNOME Human Interface Guidelines（HIG）的控件和样式，让开发者更容易创建与系统风格一致的应用。通过 Node with GJS，JavaScript 开发者也能使用 libadwaita 构建现代 Linux 桌面应用。

![Adwaita 计数器示例](/assets/images/screenshots/node-with-gjs/adw/counter.png)

libadwaita 需要单独安装。Ubuntu/Debian 用户运行 `apt install libadwaita-1-0`，Fedora 用户运行 `dnf install libadwaita`，Arch 用户运行 `pacman -S libadwaita`。安装完成后在代码中导入 Adw 模块，版本号是 1。

libadwaita 应用的入口是 Adw.Application，它继承自 Gtk.Application，额外处理了主题切换等 Adwaita 特有的功能。窗口使用 Adw.ApplicationWindow 而不是 Gtk.ApplicationWindow，它支持自适应布局，在窄屏上会自动调整。最常用的布局组件是 Adw.ToolbarView，它提供了一个带有顶部和底部工具栏的内容区域。

```typescript
import Gtk from 'gi://Gtk?version=4.0';
import Adw from 'gi://Adw?version=1';

let clickCount = 0;

const app = new Adw.Application({ application_id: 'org.adwaita.counter' });

app.connect('activate', () => {
    const window = new Adw.ApplicationWindow({
        application: app,
        title: 'Adwaita Counter App',
        default_width: 400,
        default_height: 300
    });

    const toolbarView = new Adw.ToolbarView();

    const headerBar = new Adw.HeaderBar({
        title_widget: new Gtk.Label({ label: 'Adwaita Counter App' })
    });
    toolbarView.add_top_bar(headerBar);

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

    toolbarView.set_content(box);
    window.set_content(toolbarView);
    window.present();
});

app.run([]);
```

Adw.HeaderBar 是 Adwaita 风格的标题栏，它把窗口标题和控制按钮（关闭、最小化、最大化）整合在一起，节省了传统菜单栏占用的空间。title_widget 属性可以设置标题区域的控件，这里用一个 Label 显示应用名称。HeaderBar 还可以通过 add_start_title_widget 和 add_end_title_widget 在标题两侧添加按钮，常用于放置搜索按钮、菜单按钮等。

ToolbarView 的 add_top_bar 方法添加顶部工具栏，set_content 方法设置主内容区域。这种布局结构让应用自动拥有了一致的标题栏样式，无需手动处理窗口装饰。底部工具栏可以通过 add_bottom_bar 添加，常用于放置操作按钮或状态信息。

Adwaita 的样式系统建立在 GTK4 的 CSS 机制之上，但提供了一套预定义的 CSS 类名。title-1 是最大的标题样式，title-2、title-3、title-4 依次变小。suggested-action 是建议操作的按钮样式，destructive-action 是危险操作（如删除）的样式。这些样式会自动适配系统的浅色和深色主题，开发者不需要关心具体的颜色值。

libadwaita 还提供了一些高级控件。Adw.PreferencesPage 和 Adw.PreferencesGroup 用于构建设置界面，Adw.Clamp 可以限制内容的最大宽度，在大屏幕上保持可读性，Adw.StatusPage 用于显示空状态或错误提示。Adw.Toast 和 Adw.ToastOverlay 提供了轻量级的消息提示机制。

Adwaita 应用的 application_id 很重要，它不仅用于标识应用，还影响主题切换、桌面集成等功能。建议使用反向域名格式，如 org.example.myapp。如果应用需要沙箱运行（如 Flatpak），这个 ID 还需要与 Flatpak manifest 中的 ID 一致。

与纯 GTK4 应用相比，使用 libadwaita 的好处是自动获得与 GNOME 系统一致的外观和行为。应用会跟随系统主题切换浅色和深色模式，控件样式符合 HIG 规范，用户无需额外学习就能上手。缺点是应用风格与 GNOME 绑定，在其他桌面环境（如 KDE Plasma）中可能显得格格不入。如果目标是跨桌面环境的通用 Linux 应用，可能需要考虑使用纯 GTK4 并自定义样式。

运行示例的方法是执行 `node start.js your-file.ts`。完整示例可以在 node-with-gjs-examples 仓库的 adwaita 目录中找到。由于 libadwaita 只在 Linux 上可用，这个方案目前只支持 Linux 平台。
