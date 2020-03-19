## 前端微服务化实践

复杂的 webapp 带给我们的挑战：跨部门，跨技术栈，独立开发、独立部署

之前对方案有一些[思考](https://note.xianqiao.wang/post/fu-za-xi-tong-gou-jia)

这里是使用 [`<gem-frame>`](https://github.com/mantou132/gem-frame) 做一个实践。

### 目录介绍

- host: Gem 父 app
- app: Gem 子 app
- react: React 子 app
- vue: Vue 子 app

### 开发

```bash
npm i

# 子 app 的开发
npm run start:react

# 构建打包
npm run build

# 宿主 app 开发
# 依赖子 app 构建产物
npm run start:host
```
