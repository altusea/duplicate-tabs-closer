# 重复标签页关闭器 Chrome 扩展

这是一个用于关闭重复标签页的 Chrome 扩展程序。

## 功能特性
- 自动检测并关闭重复的标签页
- 支持自定义白名单
- 提供一键关闭重复标签页的按钮

## 安装方法
1. 下载代码
2. 打开 Chrome 浏览器
3. 进入 `chrome://extensions/`
4. 启用"开发者模式"
5. 点击"加载已解压的扩展程序"
6. 选择本项目的根目录

## 项目结构
```
.
├── background.js       # 后台脚本
├── manifest.json       # 扩展配置文件
├── popup.html          # 弹出窗口界面
├── popup.js            # 弹出窗口逻辑
└── icons/              # 扩展图标
```

## 使用说明
1. 点击扩展图标打开弹出窗口
2. 点击"关闭重复标签页"按钮
3. 重复的标签页将被自动关闭

## 开发
欢迎提交 issue 和 pull request
