---
title: "用 JavaScript 编写 WPF 桌面应用"
description: "介绍如何使用 node-ps1-dotnet 库在 Node.js、Deno 或 Bun 中调用 Windows Presentation Foundation 构建现代桌面应用。"
pubDate: "2026-03-21"
author: "DevScholar"
---

# 用 JavaScript 编写 WPF 桌面应用

Windows Presentation Foundation（WPF）是微软在 .NET Framework 3.0 时代推出的 UI 框架，相比上一代的 WinForms，它引入了 XAML 标记语言、数据绑定、样式模板、矢量图形渲染等现代特性。WPF 的设计理念是分离界面与逻辑，界面用 XAML 声明式描述，逻辑用代码处理，但在 Node PS1 for .NET 中我们直接用 JavaScript 代码构建界面，这种方式更接近传统 WinForms 的编程风格，只是换用了 WPF 的控件和布局系统。

![WPF 计数器示例](/assets/images/screenshots/node-ps1-dotnet/examples/wpf/counter.png)

WPF 需要加载三个核心程序集：PresentationFramework 包含控件和窗口类型，PresentationCore 包含图形和媒体相关的基础类型，WindowsBase 包含依赖属性、事件等基础设施。加载完成后就可以通过 `dotnet.System.Windows` 访问 WPF 的类型系统。

WPF 的布局系统与 WinForms 有本质区别。WinForms 使用绝对定位，控件有 Location 属性指定坐标。WPF 则使用布局容器，容器负责安排子控件的位置和大小。常用的容器有 StackPanel（栈式排列）、Grid（网格布局）、Canvas（绝对定位）、WrapPanel（换行排列）等。下面这个计数器示例使用 StackPanel 作为根容器，子控件会按添加顺序从上到下排列。

```typescript
import dotnet from '@devscholar/node-ps1-dotnet';

dotnet.load('PresentationFramework');
dotnet.load('PresentationCore');
dotnet.load('WindowsBase');

const System = dotnet.System as any;
const Windows = System.Windows;
const Controls = System.Windows.Controls;
const Media = System.Windows.Media;

let clickCount = 0;

const mainWindow = new Windows.Window();
mainWindow.Title = "WPF Counter App";
mainWindow.Width = 400;
mainWindow.Height = 300;
mainWindow.WindowStartupLocation = Windows.WindowStartupLocation.CenterScreen;

const stackPanel = new Controls.StackPanel();
stackPanel.Margin = new Windows.Thickness(20);
stackPanel.HorizontalAlignment = Windows.HorizontalAlignment.Center;
stackPanel.VerticalAlignment = Windows.VerticalAlignment.Center;

const label = new Controls.Label();
label.Content = "Clicks: 0";
label.FontSize = 32;
label.FontFamily = new Media.FontFamily("Arial");
label.HorizontalContentAlignment = Windows.HorizontalAlignment.Center;
label.Margin = new Windows.Thickness(0, 0, 0, 20);
stackPanel.Children.Add(label);

const button = new Controls.Button();
button.Content = "Click to Add";
button.FontSize = 18;
button.Padding = new Windows.Thickness(20, 10, 20, 10);
button.HorizontalAlignment = Windows.HorizontalAlignment.Center;

button.add_Click((sender: any, e: any) => {
    clickCount++;
    label.Content = `Clicked ${clickCount} times`;
});

stackPanel.Children.Add(button);

mainWindow.Content = stackPanel;

const app = new Windows.Application();
app.Run(mainWindow);
```

WPF 的边距使用 Thickness 类型，可以同时设置四个方向的边距，构造函数接受四个参数依次是左、上、右、下。控件的 Content 属性用于设置内容，Label 显示文本就设置 Content 为字符串，Button 同样如此。HorizontalAlignment 和 VerticalAlignment 控制控件在容器中的对齐方式，设为 Center 表示居中。

窗口的 WindowStartupLocation 属性设为 CenterScreen 可以让窗口启动时居中显示，这比 WinForms 用枚举值 1 更直观。最后创建 Application 实例并调用 Run 方法启动消息循环，这一点与 WinForms 类似。

再来看一个拖动方块的例子，这个例子展示了 Canvas 布局和坐标变换的使用。Canvas 是 WPF 中唯一支持绝对定位的布局容器，子控件通过 Canvas.Left 和 Canvas.Top 附加属性定位。但这里我们使用另一种方式，TranslateTransform 变换，它可以在不改变控件实际位置属性的情况下移动控件的渲染位置，这种方式性能更好，适合频繁更新的场景。

```typescript
import dotnet from '@devscholar/node-ps1-dotnet';

dotnet.load('PresentationFramework');
dotnet.load('PresentationCore');
dotnet.load('WindowsBase');

const System = dotnet.System as any;
const Windows = System.Windows;
const Controls = System.Windows.Controls;
const Media = System.Windows.Media;

const mainWindow = new Windows.Window();
mainWindow.Title = "WPF Draggable Box Example";
mainWindow.Width = 800;
mainWindow.Height = 600;
mainWindow.WindowStartupLocation = Windows.WindowStartupLocation.CenterScreen;

const canvas = new Controls.Canvas();
canvas.Background = Media.Brushes.LightGray;

const box = new Controls.Border();
box.Width = 100;
box.Height = 100;
box.Background = Media.Brushes.Red;
box.BorderBrush = Media.Brushes.DarkRed;
box.BorderThickness = new Windows.Thickness(2);

const transform = new Media.TranslateTransform();
box.RenderTransform = transform;

transform.X = 350;
transform.Y = 250;

canvas.Children.Add(box);

let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startBoxX = 0;
let startBoxY = 0;

box.add_MouseDown((sender: any, e: any) => {
    isDragging = true;
    const pos = e.GetPosition(canvas);
    startMouseX = pos.X;
    startMouseY = pos.Y;
    startBoxX = transform.X;
    startBoxY = transform.Y;
    box.Background = Media.Brushes.DarkRed;
    box.CaptureMouse();
});

box.add_MouseUp((sender: any, e: any) => {
    isDragging = false;
    box.Background = Media.Brushes.Red;
    box.ReleaseMouseCapture();
});

box.add_MouseMove((sender: any, e: any) => {
    if (isDragging) {
        const currentPos = e.GetPosition(canvas);
        transform.X = startBoxX + (currentPos.X - startMouseX);
        transform.Y = startBoxY + (currentPos.Y - startMouseY);
    }
});

mainWindow.Content = canvas;

const app = new Windows.Application();
app.Run(mainWindow);
```

Border 控件是一个装饰器，可以给子内容添加边框和背景，这里我们把它当作一个带边框的色块使用。Background 属性接受 Brush 类型，Media.Brushes 提供了一系列预定义的纯色画刷。RenderTransform 属性可以设置任意变换，TranslateTransform 是平移变换，修改它的 X 和 Y 属性就能移动控件。

鼠标事件处理中，e.GetPosition(canvas) 方法获取鼠标相对于 canvas 的坐标，这是 WPF 特有的设计，可以方便地获取相对于任意元素的位置。CaptureMouse 和 ReleaseMouseCapture 用于捕获和释放鼠标，捕获鼠标后即使鼠标移出控件范围也能继续接收鼠标移动事件，这对于拖动操作很重要。

WPF 相比 WinForms 的优势在于更现代的渲染架构。WPF 基于 DirectX，支持硬件加速、矢量图形、透明效果、动画等特性。布局系统也更灵活，可以更容易地创建自适应大小的界面。缺点是学习曲线较陡，概念较多，而且内存占用通常比 WinForms 高。如果只是需要简单的工具窗口，WinForms 可能更合适。如果需要复杂的界面效果或者计划后续迁移到 Web 技术，WPF 是更好的选择。

运行方式与 WinForms 示例相同，执行 `node start.js your-file.ts` 即可。更多示例可以参考 node-ps1-dotnet-examples 仓库中的 wpf 目录。
