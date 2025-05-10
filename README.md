### 项目简介
该项目是一个基于Next.js框架开发的电商类应用（推测为花店小程序/网站），主要涉及支付功能实现与基础UI组件开发。

### 核心功能
- 支付模块 ：支持微信、支付宝、银行卡三种支付方式，通过 app/api/payment/route.ts 处理支付请求，返回二维码或跳转链接（当前为模拟数据）； app/payment/wechat/page.tsx 包含支付状态检查逻辑（模拟支付成功后跳转）。
- UI组件 ：封装了 RadioGroup 单选组件（ components/ui/radio-group.tsx ），基于Radix UI库实现，包含样式类名管理和交互逻辑。
### 技术栈
- 框架：Next.js（package.json中包含 next dev 等脚本）；
- 依赖库：Radix UI（提供基础交互组件）、clsx/class-variance-authority（样式管理）等；
- 目录结构：遵循Next.js约定， app 目录存放页面路由， components 存放可复用组件， public 存放静态资源。



需要先安装项目依赖以确保后续运行正常。

flower-shop-mini-main 终端

pnpm install

用户之前运行pnpm install时提示pnpm未找到，需要先全局安装pnpm以解决依赖安装问题。

flower-shop-mini-main 终端

npm install -g pnpm

用户已全局安装pnpm，现在需要重新运行pnpm install安装项目依赖。

flower-shop-mini-main 终端

pnpm install

需要启动开发服务器以运行项目。

flower-shop-mini-main 终端

pnpm dev

需要检查开发服务器启动命令的运行状态和输出日志，确认是否成功启动。
