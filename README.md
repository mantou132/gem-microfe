## 前端微服务化实践

复杂的 webapp 带给我们的挑战：跨部门，跨技术栈，独立开发、独立部署

之前对方案有一些[思考](https://note.xianqiao.wang/post/fu-za-xi-tong-gou-jia)

这里是使用 [gem](https://github.com/mantou132/gem) 做一个实践。
基于 WebComponents，没有 iframe。

这里有一个限制，宿主环境和子 app 必须都使用 gem ，至少都使用 `gem/lib/history` 操作浏览器历史记录，
不然不能保证浏览器历史记录栈是正确的。
暂时没有找到更好的方案。

### 目录介绍

- host: host app 的源代码
- app: 子 app 的源代码
- dist: host 和 app 都独立打包到该目录

### 开发

```bash
npm i

# 子 app 的开发
npm run start:app

# 子 app 构建
npm run build:app

# 宿主 app 开发
npm run start::host
```
