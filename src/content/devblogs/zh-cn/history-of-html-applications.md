---
title: "HTML 应用发展史"
description: "探索 HTML 应用从 1990 年代至今的演变历程。"
pubDate: "2026-02-24"
author: "DevScholar"
---

# HTML 应用发展史

本文所述 "HTML 应用程序"是指使用 HTML 技术开发的桌面应用程序，例如基于微软的 MSHTA 和 Electron 平台的应用程序。这种技术旨在使得 HTML 可以离线运行和分发，并赋予其桌面应用程序特有的操作系统 API 访问权限，比如文件操作或读写注册表。

## MSHTA

1996 年，微软发布了 Internet Explorer (IE) 3.0，它加入了 CSS 和 JS 等标准功能，但是也加入了 ActiveX 等开箱即用的私有功能[1]。用户可以利用 ActiveX 控件 和 ActiveXObject 对象直接调用系统 API，进行文件读写等特权操作。请注意在 1996 年，桌面应用程序开发才刚起步，没有人注意安全问题。这源于微软希望把 IE 塑造为又一个 Windows 开发平台的愿景，因为 HTML 很适合构建用户界面，JS 也很容易掌握。当时 Visual Basic (VB) 虽然易用，但是如果想要艺术化界面就需要用到大量晦涩难懂的 Windows API 进行自绘，事件处理等等。C++ 和 Win32 API 配合更是灾难，仅仅是`CreateWindow`函数就需要填入整整 11 个参数[2]，再叠加 C++ 的难度。于是微软决定把 IE 变成又一个开发平台。而当时 IE 的竞争对手网景浏览器 (Netscape) 支持 NPAPI 和 Java 小应用程序，它们基于开放标准，但是能做的事情比 IE 少。NPAPI 虽然可以调用系统 API，但是用户需按需安装某个浏览器插件。Java 小应用程序更是权限受限。

就这样，微软多了一个 Windows 技术的开发平台。但是因为网页运行在浏览器里面，它始终有不可去除的浏览器边框。而这时，微软的程序员们也苦 VB 和 C++ 已久，他们也在积极探索利用 HTML 编写应用程序的可能性，例如用 HTML 作为 C++ 应用程序界面的`CHtmlView`，以及 VB 中的"DHTML 应用程序"项目类型，把 VB 代码编译为视觉上隐藏的 ActiveX 控件给 JS 调用。以及随 IE5.0（1999 年）一同推出的 Microsoft (R) HTML 应用程序主机 (MSHTA)[3]。它是微软提供的一个用于创建 HTML 应用程序的组件。它允许开发人员使用 HTML、CSS 和 JavaScript 来构建功能完善的桌面应用程序，称为 HTML 应用程序 (HTA)。HTA 只能在 Windows 操作系统上运行，可以访问操作系统的文件系统的 API。最重要的是，HTA 没有浏览器边框，看上去就像普通的桌面应用程序一样。而且它提供了`HTA:APPLICATION`标签，可以控制应用程序的特性，比如使用某种特定的窗口边框，设置是否显示最大化和向下还原按钮等。

当时，其他操作系统，比如 Linux 和 macOS，并没有提供类似 HTA 的功能，因为这些平台上的人注重性能而忽略业余开发者，认为 C++ 等是编写应用程序的更好方案。

由于第三方开发者不断催促微软，再加上网景浏览器的竞争，于是微软不断为 IE 开发新功能。但是因为 HTML 4.01 等标准化技术发展停滞，于是微软不得不以专有扩展的形式发布 IE 的新功能，还将许多功能提交给 W3C 请求标准化。`innerHTML`等小型变更通常被接受，但是例如 IE 特有滤镜和矢量图形标记语言 (VML) 等大型功能通常被拒绝。等到 IE 6 发布（2001 年），IE 的市占率已达到惊人的 98%。但是 HTML 属于公开标准，并非微软一家所能控制。于是，为了盈利，微软决定停止积极开发 IE，而是转而将力量投入微软的（在那时是专有且仅限 Windows 运行的）.NET 平台当中，推出了 WinForms 和 WPF 等多项技术。而 HTA 的发展则随着 IE 的发展陷入停滞。

## PhoneGap 与 Cordova

当桌面端的 HTA 陷入停滞时，HTML 应用却在另一个战场找到了生机。2008 年，随着 iPhone 开启智能手机时代，开发者面临一个尴尬局面：iOS 原生开发需要 Objective-C，Android 需要 Java，每个平台都要单独编写应用。而 Web 技术虽然可以运行在移动浏览器中，但无法访问相机、GPS、联系人等硬件功能。

2009 年，Nitobi 公司的 Brian Leroux 等人开发了 PhoneGap[4]。这是一个巧妙的 hack：它在原生应用中嵌入一个 WebView 控件，让 HTML/CSS/JavaScript 作为界面层，然后通过 JavaScript Bridge 调用底层的原生 API。开发者只需编写一套 Web 代码，就能打包成 iOS、Android、BlackBerry 等多个平台的原生应用。

PhoneGap 的核心创新在于**混合应用 (Hybrid App)**模式。它不像 HTA 那样直接调用系统 API，而是通过插件架构将原生能力暴露给 JavaScript。比如相机功能，PhoneGap 提供统一的 JavaScript API，底层则分别调用 iOS 的 UIImagePickerController 或 Android 的 Camera Intent。这种抽象让 Web 开发者无需学习原生语言，就能构建"类原生"应用。

2011 年，Adobe 收购了 Nitobi，并将 PhoneGap 的核心代码捐赠给 Apache 基金会，更名为 Apache Cordova[5]。这一举措确保了技术的开放性，但也埋下了分裂的种子。Adobe 保留了 PhoneGap 的品牌，推出基于云的 PhoneGap Build 服务，而 Cordova 则成为社区驱动的开源项目。

Cordova 迅速成为移动开发的主流方案之一。它的优势显而易见：开发成本低（一套代码跨平台）、技术门槛低（Web 开发者即可上手）、生态丰富（npm 上的插件数以万计）。2010 年代中期的许多知名应用，如 Instagram、Uber、Wikipedia 的早期版本，都曾使用 Cordova 或其衍生技术。

然而，Cordova 的局限也日益明显。首先是**性能问题**。WebView 的渲染性能始终不如原生 UI，复杂列表滚动、动画效果经常出现卡顿。其次是**体验割裂**。虽然应用可以打包成 APK 或 IPA，但界面风格与原生应用差异明显，用户能明显察觉"这是一个套了壳的网页"。更严重的是**插件依赖**。每当 iOS 或 Android 发布新系统版本，Cordova 插件需要单独更新，而许多插件由个人维护，更新滞后甚至 abandoned，导致应用无法及时适配新系统。

## Capacitor

2018 年，Ionic 团队推出了 Capacitor[6]，作为 Cordova 的精神继承者。它保留了混合应用的基本架构，也就是 WebView 渲染 + Native Bridge，但在设计上做了现代化改进。

Capacitor 最大的变化是**拥抱现代 Web 标准**。它不再依赖特定框架，支持任何前端工具链（React、Vue、Angular、Svelte 均可）。更重要的是，它利用了 Progressive Web Apps (PWA) 的技术栈：Service Worker 用于离线支持，Web App Manifest 用于安装配置。这意味着同一个 Capacitor 应用，既可以作为原生应用分发到应用商店，也可以作为 PWA 直接通过浏览器访问。

在架构上，Capacitor 简化了插件系统。Cordova 的插件需要为每个平台编写复杂的原生代码，而 Capacitor 鼓励使用 JavaScript 实现功能，仅在必要时调用原生 API。它还提供了更清晰的 Native Bridge，支持 TypeScript 类型定义，让 Web 与原生层的通信更可靠。

但 Capacitor 并未解决混合应用的根本矛盾：**WebView 的性能天花板**。虽然现代 WebView（iOS 的 WKWebView、Android 的 WebView 基于 Chromium）性能已大幅提升，但在重度图形场景（3D 游戏、视频编辑、复杂动画）下，仍无法与原生或 React Native、Flutter 等方案竞争。

此外，Capacitor 和 Cordova 都面临**应用商店的审查风险**。苹果在 2020 年代加强了对"壳应用"（App Wrapper）的限制，如果应用内容主要是网页，且功能与网站无异，可能被拒绝上架。这迫使开发者必须在 Web 层提供比网站更丰富的功能，或转向原生渲染方案。

## WinJS 与 Windows 8

回到桌面端。HTA 虽然停滞，但微软并未放弃用 Web 技术构建桌面应用的尝试。2012 年，随着 Windows 8 的发布，微软推出了 WinJS（Windows Library for JavaScript）[7]。这是一个专为 Windows 应用商店应用（Metro/Modern UI 应用）设计的 JavaScript 库，允许开发者使用 HTML、CSS 和 JavaScript 编写原生 Windows 应用。

与 HTA 不同，WinJS 应用运行在全新的 Windows Runtime（WinRT）之上，而非传统的 Win32 API。它们拥有真正的原生应用权限，可以访问文件系统、摄像头、传感器等硬件，同时保持了 Web 技术的开发体验。微软甚至将 WinJS 开源，试图吸引 Web 开发者进入 Windows 生态系统。

然而，Windows 8 的 Metro 界面饱受争议，用户和开发者更青睐传统的桌面应用。WinJS 应用被限制在应用商店中分发，且无法运行在 Windows 7 等旧系统上。随着 Windows 10 统一平台战略的失败，WinJS 也逐渐被微软边缘化，成为又一个被遗弃的 Web 桌面化尝试。

值得注意的是，WinJS 的理念与 Cordova/Capacitor 有相似之处：都是 Web 技术 + 原生运行时的混合。但 WinJS 局限于 Windows 平台，而 Cordova 抓住了移动跨平台的痛点，因此命运截然不同。

## node-webkit 与 NW.js

真正的转机来自开源社区。2011 年，英特尔开源技术中心的 Roger Wang 启动了 node-webkit 项目[8]。这是一个大胆的创新：它将 Node.js 运行时与 WebKit 渲染引擎捆绑在一起，让开发者可以用 Web 技术编写应用，同时通过 Node.js 访问底层系统 API。

这意味着什么？开发者终于可以用 HTML 构建界面，用 JavaScript 编写逻辑，并且像传统桌面应用一样读写文件、访问数据库、调用系统命令，而且这一切是跨平台的，可以在 Windows、macOS 和 Linux 上运行。2014 年，项目更名为 NW.js，以更好地反映其技术本质。

NW.js 解决了 MSHTA 时代的几个痛点：首先，它基于现代的 WebKit 内核，支持 HTML5 和 CSS3，而非老旧的 IE 引擎；其次，它是真正的跨平台，不再受制于 Windows；最重要的是，它将 Node.js 的生态系统带入了桌面开发，开发者可以使用 npm 上数十万个包。

然而，NW.js 也有其局限。它的架构是将整个 Node.js 运行时注入 Web 环境，这导致上下文混乱，主进程和渲染进程的界限模糊。每个窗口都是一个独立的渲染进程，但共享同一个 Node.js 上下文，这在复杂应用中容易引发性能问题和内存泄漏。

## Electron

2013 年，GitHub 的 Cheng Zhao 基于 Chromium Content Module 和 Node.js 开发了 Atom Shell，旨在为 Atom 编辑器提供框架[9]。2015 年，项目更名为 Electron。与 NW.js 不同，Electron 采用了更清晰的多进程架构：主进程（Node.js 环境）负责系统级操作，渲染进程（Chromium 环境）负责界面展示，两者通过 IPC（进程间通信）交互。

这种分离带来了几个关键优势。首先，稳定性提升，单个窗口的崩溃不会影响整个应用；其次，安全性改善，渲染进程默认运行在沙箱中，需要通过显式 API 才能访问系统资源；最重要的是，开发者可以精确控制应用的生命周期和资源分配。

Electron 迅速成为 HTML 桌面应用的事实标准。Slack、VS Code、Discord、Figma 等知名应用都基于 Electron 构建。它甚至反哺了 Web 技术本身，VS Code 的流行推动了 TypeScript 和 Language Server Protocol 的普及，而 Electron 的跨平台能力让小型团队也能开发出全平台支持的桌面软件。

但 Electron 并非没有批评。每个应用都捆绑完整的 Chromium 和 Node.js，导致安装包体积庞大（通常超过 100MB），内存占用高。

## PWA

在 Electron 统治桌面端的同时，浏览器厂商也在探索另一条路径：让 Web 应用本身具备离线能力和系统访问权限。2015 年，Google 提出了 Progressive Web Apps (PWA) 概念[10]，随后得到了微软、苹果等厂商的支持。

PWA 通过 Service Worker 实现离线缓存，通过 Web App Manifest 提供类原生应用的安装体验，还通过一系列 Web API（File System Access API、Contacts API、Bluetooth API 等）逐步扩展系统访问能力。理论上，PWA 可以"一次编写，到处运行"，无需捆绑浏览器内核，体积轻量，且能通过应用商店或浏览器直接分发。

微软在 Windows 10/11 中积极支持 PWA，允许其通过 Microsoft Store 分发，某种程度上回归了 WinJS 的初心。然而，PWA 在实际应用中面临诸多限制：

首先是**离线能力的本质缺陷**。Service Worker 的离线缓存依赖于浏览器事先下载资源，它更适合"增强型网页"而非真正的离线应用。一旦用户首次访问时网络不畅，或者缓存策略配置不当，应用可能根本无法启动。这与 Electron 应用"下载即可离线运行"的体验有本质区别。

其次是**分发的困境**。虽然 PWA 可以通过应用商店分发，但各平台政策不一。苹果对 iOS 上的 PWA 限制极严，不允许第三方浏览器引擎，PWA 无法使用完整的 Web Push 等功能。更重要的是，PWA 无法像传统桌面应用那样直接分发安装包，用户必须通过浏览器或应用商店获取，这在企业内网环境或需要特定版本控制的场景下极不灵活。

再者是**系统集成的局限**。PWA 运行在浏览器沙箱中，虽然 Web API 在不断扩展，但许多底层操作仍无法实现：无法监听全局快捷键、无法创建系统托盘图标、无法在后台保持进程运行、无法访问某些硬件接口。对于需要深度系统集成的高级功能，PWA 仍然力不从心。

最后是**平台差异的碎片化**。不同浏览器对 Web API 的支持程度不一，开发者仍需处理兼容性问题。而且 PWA 始终受限于浏览器窗口的框架，它无法创建真正的无边框窗口，无法自定义原生菜单栏，这些在桌面应用中习以为常的功能在 PWA 中难以实现。

因此，PWA 更适合内容型、偶尔离线的应用，而非功能复杂的生产力工具。它未能替代 Electron，反而与 Electron 形成了互补：轻量级场景用 PWA，重度桌面应用仍需要 Electron。

## 后 Electron 时代

Electron 的臃肿问题在 2020 年代愈发突出。一个"Hello World"级别的 Electron 应用体积可达 150MB 以上，启动内存占用数百兆。这在 SSD 和内存充裕的现代设备上尚可接受，但在低配设备或注重资源效率的场景下成为痛点。

更深层的问题是技术债务。Electron 深度绑定 Node.js 和 Chromium 的特定版本，难以适配 JavaScript 运行时的新发展。当 Deno（2018）和 Bun（2022）等新一代运行时出现时，它们提供了更安全的权限模型、更好的 TypeScript 原生支持、显著的性能提升，但 Electron 的架构无法直接利用这些优势。Electron 应用被困在 Node.js 的生态中，无法享受 JS 基础设施的最新成果。

这催生了一系列替代方案的探索。

Tauri[11] 采用 Rust 编写的轻量级后端，使用操作系统原生的 WebView 渲染前端。Windows 上用的是 WebView2，macOS 上用 WKWebView，Linux 上用 WebKitGTK。由于不需要捆绑浏览器内核，应用体积可以压缩到 3 到 5MB，内存占用也大幅降低。不过 Tauri 要求开发者用 Rust 处理系统交互，这对纯 Web 开发者来说是个门槛。虽然它提供了 JavaScript API，但复杂功能仍然需要深入 Rust 生态，这就失去了全栈 JavaScript 的便利性。

WebUI[12] 是一个 C 语言编写的跨平台库，它不用捆绑浏览器内核，而是调用用户电脑上已经安装的浏览器作为渲染引擎。Chrome、Firefox、Edge 都可以用，通过 WebSocket 和本地后端通信。体积极小，只有一个可执行文件。但它受限于浏览器窗口，无法创建真正的无边框应用，也无法禁用浏览器的开发者工具，界面始终带有浏览器的痕迹。依赖外部浏览器还意味着无法保证渲染一致性，不同版本的浏览器可能导致兼容性问题。

Wails[13] 和 Tauri 类似，不过后端用的是 Go 语言，同样依赖原生 WebView。它解决了体积问题，但把开发者锁定在了 Go 生态中。

Flutter Desktop 和 React Native Desktop 则放弃了 Web 技术栈，改用自绘渲染引擎。虽然性能优秀，但失去了 Web 开发的开放性和生态优势。

这些方案的共同困境在于：保持 Web 技术栈就体积庞大，缩小体积就引入原生语言门槛，保持轻量就受限于浏览器窗口。没有人找到完美的平衡点。

## 新的可能性

面对这一困境，我开发了两个实验性项目，试图探索不同的路径。

node-ps1-dotnet[14] 是一个基于 Node.js 和 PowerShell 的桌面应用框架。它利用 Windows 上无处不在的 PowerShell 和 .NET 运行时，让 Node.js 应用能够调用完整的 Windows API 和 .NET 类库，而无需捆绑 Chromium。前端可以使用系统内置的 WebView2，后端则通过 PowerShell 脚本与系统深度集成。这显著减小了应用体积，同时保持 JavaScript 和 TypeScript 的开发体验。

node-with-gjs[15] 则是面向 Linux 的对应方案。GJS 是 GNOME 项目的 JavaScript 绑定，允许使用 JavaScript 调用 GTK 和原生系统 API。

这两个项目的核心思想是利用操作系统已存在的运行时，而不是捆绑自己的浏览器和 Node.js 运行时。这样做大幅减小了分发体积，同时允许应用深度集成系统功能。它们除了适配 Node.js，也适配 Deno 和 Bun，并且为 GUI 开发和 WebView 开发提供了第一等支持，有开箱即用的示例。

不过它们目前仍局限于特定平台。node-ps1-dotnet 主要针对 Windows，node-with-gjs 针对 Linux。要构建真正的跨平台应用，开发者需要处理平台差异，编写条件代码。

## 下一步

基于以上探索，我正在开发一个统一的跨平台封装层。在 Windows 上，它使用 [node-ps1-dotnet](https://github.com/DevScholar/node-ps1-dotnet)，利用 WebView2 渲染界面，PowerShell 和 .NET 处理系统交互。在 Linux 上，它使用 [node-with-gjs](https://github.com/DevScholar/node-with-gjs)，利用 WebKitGTK 渲染界面，GJS 和 GTK 处理系统交互。

目前我没有打算支持 macOS，因为我没有钱买 MacBook 也没有在 macOS 上做过开发。不过如果确实存在需求，我可以尝试在电脑上安装 x86 黑苹果虚拟机进行开发。虽然新版 macOS 不再推出 x86 版本，但由于我的项目不使用原生代码，只使用脚本语言和 IPC，并且苹果公司不会经常变更 JavaScript for Automation 的 API，理论上可以进行开发。

开发者只需编写一套 HTML、CSS、JavaScript 前端代码，以及统一的 JavaScript API 调用，无需关心底层是 PowerShell 还是 GJS。框架会自动将系统 API 调用路由到对应平台的原生机制。

这一方案试图结合各家的优点：保持 Web 技术栈的开放性和生态，显著减小应用体积，支持深度系统集成，并且能适配 Deno、Bun 等新一代 JavaScript 运行时。架构不再硬编码 Node.js，而是抽象为通用的 JS 运行时接口。

从 MSHTA 的系统绑定，到 Electron 的自包含架构，再到新一代方案回归系统原生能力，HTML 桌面应用的技术路线经历了一个循环。MSHTA 利用系统已有的运行时，Electron 选择捆绑一切，新一代方案又回到利用系统运行时的思路。这一次，Web 标准更加成熟，开源生态也更完善，开发者对跨平台开发有了更深的理解。

HTML 桌面应用仍然在发展。

---

**参考文献**

[1] IE 3.0: https://www.webdesignmuseum.org/software/internet-explorer-3-0-in-1996

[2] CreateWindowA: https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-createwindowa

[3] MSHTA: https://learn.microsoft.com/en-us/previous-versions/ms536496(v=vs.85)

[4] PhoneGap: https://phonegap.com/

[5] Apache Cordova: https://cordova.apache.org/

[6] Capacitor: https://capacitorjs.com/

[7] WinJS: https://github.com/winjs/winjs

[8] NW.js: https://nwjs.io/

[9] Electron: https://www.electronjs.org/

[10] Progressive Web Apps: https://web.dev/progressive-web-apps/

[11] Tauri: https://tauri.app/

[12] WebUI: https://webui.dev/

[13] Wails: https://wails.io/

[14] node-ps1-dotnet: https://github.com/DevScholar/node-ps1-dotnet

[15] node-with-gjs: https://github.com/DevScholar/node-with-gjs