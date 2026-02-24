---
title: "The History of HTML Applications"
description: "Exploring the evolution of HTML applications from the 1990s to today."
pubDate: "2026-02-24"
author: "DevScholar"
---

# The History of HTML Applications

This article refers to desktop applications developed using HTML technologies, such as those based on Microsoft's MSHTA and the Electron platform. This technology enables HTML to run offline and be distributed as a standalone application, while granting it access to operating system APIs typical of desktop applications, such as file operations or reading and writing to the registry.

## MSHTA

In 1996, Microsoft released Internet Explorer (IE) 3.0, which added standard features like CSS and JS, but also included ready-to-use proprietary features like ActiveX[1]. Users could use ActiveX controls and the ActiveXObject object to directly call system APIs for privileged operations like file reading and writing. It is worth noting that in 1996, desktop application development was still in its infancy, and nobody was concerned about security issues. This stemmed from Microsoft's vision of shaping IE as another Windows development platform, since HTML is well-suited for building user interfaces and JS is easy to learn. At the time, Visual Basic (VB) was easy to use, but achieving artistic UI required using numerous obscure Windows APIs for custom drawing, event handling, and more. The combination of C++ and the Win32 API was even more of a disaster; the `CreateWindow` function alone required filling in a full 11 parameters[2], compounded by the difficulty of C++. So Microsoft decided to turn IE into another development platform. At the time, Microsoft's competitor, the Netscape browser, supported NPAPI and Java applets, which were based on open standards but could do less than IE. NPAPI could call system APIs, but users needed to install a specific browser plugin on demand. Java applets had even more restricted permissions.

This is how Microsoft gained another Windows technology development platform. However, because the web page ran inside a browser, it always had an unremovable browser chrome. Around that time, Microsoft's programmers had also been suffering from VB and C++ for a long time, and they were actively exploring the possibility of writing applications using HTML. For example, using HTML as the interface for C++ applications via `CHtmlView`, and the "DHTML Application" project type in VB, which compiled VB code into visually hidden ActiveX controls for JS to call. There was also Microsoft(R) HTML Application Host (MSHTA)[3], released alongside IE 5.0 in 1999. It is a component provided by Microsoft for creating HTML applications. It allows developers to build fully functional desktop applications using HTML, CSS, and JavaScript, called HTML Applications (HTA). HTA can only run on Windows and can access the operating system's file system APIs. Most importantly, HTA has no browser chrome and looks like a regular desktop application. It also provides the `HTA:APPLICATION` tag to control application characteristics, such as using a specific window frame, setting whether to show maximize and minimize buttons, and so on.

At the time, other operating systems like Linux and macOS did not provide functionality similar to HTA, because people on those platforms focused on performance and overlooked hobbyist developers, considering C++ and other languages better solutions for writing applications.

Due to constant pressure from third-party developers and competition from Netscape, Microsoft kept developing new features for IE. However, because standardization efforts for technologies like HTML 4.01 had stalled, Microsoft had to release IE's new features as proprietary extensions, and submitted many features to the W3C requesting standardization. Small changes like `innerHTML` were usually accepted, but larger features like IE-specific filters and Vector Markup Language (VML) were usually rejected. By the time IE 6 was released in 2001, IE's market share had reached an astonishing 98%. However, HTML is a public standard, not something Microsoft could control alone. So, for profit, Microsoft decided to stop actively developing IE and instead shifted focus to Microsoft's (at that time, proprietary and Windows-only) .NET platform, launching technologies like WinForms and WPF. Meanwhile, HTA's development stalled along with IE's development.

## PhoneGap and Cordova

While HTA was stalling on the desktop, HTML applications found new life on another battlefield. In 2008, as the iPhone ushered in the smartphone era, developers faced an awkward situation: iOS native development required Objective-C, Android required Java, and each platform required separate application code. While web technologies could run in mobile browsers, they could not access hardware functions like the camera, GPS, or contacts.

In 2009, Brian Leroux and others at Nitobi developed PhoneGap[4]. This was a clever hack: it embedded a WebView control in a native application, using HTML/CSS/JavaScript as the UI layer, then calling underlying native APIs through a JavaScript Bridge. Developers only needed to write one set of web code to package native applications for multiple platforms like iOS, Android, and BlackBerry.

PhoneGap's core innovation was the Hybrid App pattern. Unlike HTA, which directly called system APIs, PhoneGap exposed native capabilities to JavaScript through a plugin architecture. For example, for the camera feature, PhoneGap provided a unified JavaScript API, while the underlying code called iOS's UIImagePickerController or Android's Camera Intent respectively. This abstraction allowed web developers to build "native-like" applications without learning native languages.

In 2011, Adobe acquired Nitobi and donated PhoneGap's core code to the Apache Foundation, renaming it Apache Cordova[5]. This move ensured the technology's openness, but also sowed the seeds of division. Adobe retained the PhoneGap brand and launched the cloud-based PhoneGap Build service, while Cordova became a community-driven open-source project.

Cordova quickly became one of the mainstream solutions for mobile development. Its advantages were clear: low development cost (one codebase across platforms), low technical barrier (web developers could get started easily), and a rich ecosystem (tens of thousands of plugins on npm). Many well-known apps from the mid-2010s, such as Instagram, Uber, and early versions of Wikipedia, used Cordova or its derivatives.

However, Cordova's limitations became increasingly apparent. First, there was the performance issue. WebView rendering performance never matched native UI, and complex list scrolling and animations often stuttered. Second, there was the experience gap. Although apps could be packaged as APKs or IPAs, their interface styles differed noticeably from native apps, and users could clearly tell "this is a web page in a shell." More serious was the plugin dependency. Whenever iOS or Android released a new system version, Cordova plugins needed separate updates, and many plugins were maintained by individuals, with updates lagging or even being abandoned, causing apps to fail to adapt to new systems in a timely manner.

## Capacitor

In 2018, the Ionic team launched Capacitor[6], as Cordova's spiritual successor. It retained the basic hybrid app architecture of WebView rendering plus Native Bridge, but made modernized improvements in design.

Capacitor's biggest change was embracing modern web standards. It no longer depended on a specific framework and supported any frontend toolchain (React, Vue, Angular, Svelte, etc.). More importantly, it leveraged the Progressive Web Apps (PWA) technology stack: Service Workers for offline support, Web App Manifest for installation configuration. This meant the same Capacitor app could be distributed as a native app to app stores or as a PWA directly through the browser.

Architecturally, Capacitor simplified the plugin system. Cordova plugins required writing complex native code for each platform, while Capacitor encouraged implementing functionality in JavaScript, only calling native APIs when necessary. It also provided a clearer Native Bridge with TypeScript type definitions, making communication between the web and native layers more reliable.

But Capacitor did not solve the fundamental contradiction of hybrid apps: the WebView performance ceiling. Although modern WebViews (WKWebView on iOS, WebView based on Chromium on Android) have significantly improved performance, in heavy graphics scenarios (3D games, video editing, complex animations), they still cannot compete with native solutions or frameworks like React Native and Flutter.

Additionally, both Capacitor and Cordova faced app store review risks. In the 2020s, Apple intensified restrictions on "shell apps" (App Wrappers). If an app's content is primarily web-based and functions are no different from the website, it may be rejected from the store. This forced developers to either provide richer functionality on the web layer than on the website, or switch to native rendering solutions.

## WinJS and Windows 8

Returning to the desktop. Although HTA had stalled, Microsoft did not give up on building desktop applications with web technologies. In 2012, with the release of Windows 8, Microsoft launched WinJS (Windows Library for JavaScript)[7]. This is a JavaScript library designed specifically for Windows Store apps (Metro/Modern UI apps), allowing developers to write native Windows applications using HTML, CSS, and JavaScript.

Unlike HTA, WinJS apps ran on the new Windows Runtime (WinRT) rather than traditional Win32 APIs. They had true native application permissions, could access file systems, cameras, sensors, and other hardware, while maintaining the development experience of web technologies. Microsoft even open-sourced WinJS, trying to attract web developers into the Windows ecosystem.

However, Windows 8's Metro interface was highly controversial, and users and developers preferred traditional desktop apps. WinJS apps were restricted to distribution through the app store and could not run on older systems like Windows 7. With the failure of Windows 10's unified platform strategy, WinJS was gradually marginalized by Microsoft, becoming another abandoned attempt at web-based desktop solutions.

It is worth noting that WinJS's philosophy was similar to Cordova/Capacitor: both were hybrids of web technology plus native runtime. But WinJS was limited to the Windows platform, while Cordova grabbed the pain point of mobile cross-platform development, so their fates were completely different.

## node-webkit and NW.js

The real turning point came from the open-source community. In 2011, Roger Wang from Intel's Open Source Technology Center launched the node-webkit project[8]. This was a bold innovation: it bundled the Node.js runtime with the WebKit rendering engine, allowing developers to write applications using web technologies while accessing underlying system APIs through Node.js.

What did this mean? Developers could finally build interfaces with HTML, write logic with JavaScript, and like traditional desktop applications, read and write files, access databases, call system commands, and all of this was cross-platform, running on Windows, macOS, and Linux. In 2014, the project was renamed NW.js to better reflect its technical essence.

NW.js solved several pain points from the MSHTA era. First, it was based on a modern WebKit engine, supporting HTML5 and CSS3 rather than the outdated IE engine. Second, it was truly cross-platform, no longer restricted to Windows. Most importantly, it brought Node.js's ecosystem to desktop development, allowing developers to use the hundreds of thousands of packages on npm.

However, NW.js had its limitations. Its architecture injected the entire Node.js runtime into the web environment, causing context confusion and blurred lines between the main process and renderer processes. Each window was an independent renderer process, but they shared the same Node.js context, which could easily lead to performance issues and memory leaks in complex applications.

## Electron

In 2013, Cheng Zhao at GitHub developed Atom Shell based on Chromium Content Module and Node.js, aiming to provide a framework for the Atom editor[9]. In 2015, the project was renamed Electron. Unlike NW.js, Electron adopted a clearer multi-process architecture: the main process (Node.js environment) handled system-level operations, the renderer process (Chromium environment) handled UI display, and the two communicated through IPC (Inter-Process Communication).

This separation brought several key advantages. First, improved stability, where a single window crash would not affect the entire application. Second, improved security, where renderer processes ran in sandbox by default and needed explicit APIs to access system resources. Most importantly, developers could precisely control application lifecycle and resource allocation.

Electron quickly became the de facto standard for HTML desktop applications. Well-known apps like Slack, VS Code, Discord, and Figma were all built on Electron. It even fed back into web technologies themselves; VS Code's popularity drove the adoption of TypeScript and the Language Server Protocol, and Electron's cross-platform capabilities allowed small teams to develop desktop software with full platform support.

But Electron was not without criticism. Each application bundled a complete Chromium and Node.js, resulting in large installation package sizes (typically over 100MB) and high memory usage.

## PWA

While Electron dominated the desktop, browser vendors were exploring another path: giving web applications themselves offline capabilities and system access. In 2015, Google proposed the Progressive Web Apps (PWA) concept[10], which was subsequently supported by Microsoft, Apple, and others.

PWA achieves offline caching through Service Workers, provides native-like app installation experience through Web App Manifest, and gradually expands system access capabilities through a series of Web APIs (File System Access API, Contacts API, Bluetooth API, etc.). In theory, PWA can "write once, run everywhere," without bundling a browser kernel, has a lightweight footprint, and can be distributed directly through app stores or browsers.

Microsoft actively supported PWA on Windows 10/11, allowing distribution through the Microsoft Store, somewhat returning to WinJS's original intent. However, PWA faces many limitations in practice.

First, there is the fundamental flaw in offline capabilities. Service Worker offline caching depends on the browser downloading resources in advance, making it more suitable for "enhanced web pages" rather than truly offline applications. If the user's network is unstable during the first visit, or if the caching strategy is improperly configured, the application may not start at all. This is fundamentally different from the Electron app experience of "download and run offline."

Second, there is the distribution dilemma. Although PWA can be distributed through app stores, policies vary across platforms. Apple imposes strict restrictions on PWA on iOS, not allowing third-party browser engines, and PWA cannot use full Web Push and other features. More importantly, PWA cannot distribute installation packages directly like traditional desktop applications; users must obtain them through browsers or app stores, which is very inflexible in enterprise intranet environments or scenarios requiring specific version control.

Third, there are limitations in system integration. PWA runs in a browser sandbox. Although Web APIs are continuously expanding, many low-level operations still cannot be achieved: cannot listen to global hotkeys, cannot create system tray icons, cannot keep processes running in the background, cannot access certain hardware interfaces. For advanced features requiring deep system integration, PWA still falls short.

Fourth, there is platform difference fragmentation. Different browsers have varying levels of support for Web APIs, and developers still need to deal with compatibility issues. Moreover, PWA is always confined to the browser window frame; it cannot create truly frameless windows or customize native menu bars, features that are commonplace in desktop applications but difficult to implement in PWA.

Therefore, PWA is more suitable for content-based, occasionally offline applications, not complex productivity tools. It failed to replace Electron; instead, they formed a complementary relationship: PWA for lightweight scenarios, Electron for heavy desktop applications.

## Post-Electron Era

Electron's bloat problem became increasingly prominent in the 2020s. A "Hello World" level Electron application can have a size of 150MB or more, with startup memory usage in the hundreds of megabytes. This is acceptable on modern devices with abundant SSD storage and memory, but becomes a pain point on low-end devices or scenarios that prioritize resource efficiency.

The deeper problem is technical debt. Electron is deeply bound to specific versions of Node.js and Chromium, making it difficult to adapt to new developments in JavaScript runtimes. When new-generation runtimes like Deno (2018) and Bun (2022) emerged, they provided more secure permission models, better native TypeScript support, and significant performance improvements, but Electron's architecture cannot directly leverage these advantages. Electron applications are trapped in Node.js's ecosystem and cannot enjoy the latest developments in JS infrastructure.

This sparked exploration of a series of alternatives.

Tauri[11] uses a lightweight backend written in Rust, using the operating system's native WebView for frontend rendering. Windows uses WebView2, macOS uses WKWebView, and Linux uses WebKitGTK. Since bundling a browser kernel is unnecessary, application sizes can be compressed to 3 to 5MB, and memory usage is significantly reduced. However, Tauri requires developers to use Rust for system interactions, which is a barrier for pure web developers. Although it provides JavaScript APIs, complex functionality still requires diving deep into the Rust ecosystem, losing the convenience of full-stack JavaScript.

WebUI[12] is a C language-written cross-platform library that does not bundle a browser kernel but uses browsers already installed on the user's computer as the rendering engine. Chrome, Firefox, and Edge can all be used, communicating with the local backend via WebSocket. The size is extremely small, just a single executable. But it is limited by the browser window; it cannot create truly frameless applications, cannot disable the browser's developer tools, and the interface always carries traces of the browser. Relying on an external browser also means rendering consistency cannot be guaranteed; different browser versions may cause compatibility issues.

Wails[13] is similar to Tauri, but uses Go as the backend language, also relying on native WebView. It solves the size problem but locks developers into the Go ecosystem.

Flutter Desktop and React Native Desktop abandon the web technology stack altogether, using self-drawn rendering engines. Although they have excellent performance, they lose the openness and ecosystem advantages of web development.

The common dilemma of these solutions is: keeping the web technology stack results in large sizes, reducing size introduces native language barriers, keeping it lightweight limits it to browser windows. No one has found the perfect balance point.

## New Possibilities

Facing this dilemma, I developed two experimental projects to explore different paths.

node-ps1-dotnet[14] is a desktop application framework based on Node.js and PowerShell. It leverages the ubiquitous PowerShell and .NET runtime on Windows, allowing Node.js applications to call complete Windows APIs and .NET class libraries without bundling Chromium. The frontend can use the system's built-in WebView2, while the backend deeply integrates with the system through PowerShell scripts. This significantly reduces application size while maintaining the JavaScript and TypeScript development experience.

node-with-gjs[15] is the corresponding solution for Linux. GJS is GNOME project's JavaScript binding, allowing the use of JavaScript to call GTK and native system APIs.

The core idea of these two projects is to use runtimes that already exist on the operating system, rather than bundling their own browser and Node.js runtime. This greatly reduces distribution size while allowing deep integration of system capabilities. They adapt not only to Node.js but also to Deno and Bun, and provide first-class support for GUI development and WebView development, with ready-to-use examples.

However, they are currently limited to specific platforms. node-ps1-dotnet mainly targets Windows, and node-with-gjs targets Linux. To build truly cross-platform applications, developers need to handle platform differences and write conditional code.

## Next Step

Based on the above exploration, I am developing a unified cross-platform abstraction layer. On Windows, it uses the [node-ps1-dotnet](https://github.com/DevScholar/node-ps1-dotnet) architecture, using WebView2 for interface rendering, and PowerShell and .NET for system interaction. On Linux, it uses the [node-with-gjs](https://github.com/DevScholar/node-with-gjs) architecture, using WebKitGTK for interface rendering, and GJS and GTK for system interaction.

Currently, I do not plan to support macOS, because I cannot afford a MacBook and have not done development on macOS. However, if there is genuine demand, I can try installing an x86 Hackintosh virtual machine on my computer for development. Although newer macOS versions no longer release x86 versions, since my project does not use native code, only scripting languages and IPC, and Apple does not frequently change the JavaScript for Automation API, development should theoretically be possible.

Developers only need to write one set of HTML, CSS, JavaScript frontend code, along with unified JavaScript API calls, without worrying about whether the underlying layer is PowerShell or GJS. The framework will automatically route system API calls to the corresponding platform's native mechanism.

This solution attempts to combine the advantages of various approaches: maintaining the openness and ecosystem of the web technology stack, significantly reducing application size, supporting deep system integration, and being able to adapt to new-generation JavaScript runtimes like Deno and Bun. The architecture no longer hardcodes Node.js but is abstracted as a general JS runtime interface.

From MSHTA's system binding, to Electron's self-contained architecture, to new-generation solutions returning to native system capabilities, the technical trajectory of HTML desktop applications has gone through a cycle. MSHTA used the system's existing runtimes, Electron chose to bundle everything, and new-generation solutions return to the approach of using system runtimes. This time, web standards are more mature, the open-source ecosystem is more complete, and developers have a deeper understanding of cross-platform development.

HTML desktop applications are still evolving.

---

**References**

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
