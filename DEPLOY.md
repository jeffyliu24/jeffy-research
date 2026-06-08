# 发布 jeffy 博客

这个博客是静态网站，适合发布到 GitHub Pages、Netlify、Vercel 或 Cloudflare Pages。

## 先生成发布目录

在项目根目录运行：

```powershell
C:\Users\13210\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts\build-posts.js
C:\Users\13210\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts\build-site.js
```

生成后的发布目录是：

```text
dist/
```

## 最简单：Netlify Drop

1. 打开 `https://app.netlify.com/drop`
2. 登录或注册 Netlify。
3. 把 `dist/` 文件夹拖进去。
4. Netlify 会给你一个公网网址，通常类似：

```text
https://something-random.netlify.app
```

后续可以在 Netlify 后台把站点名改成类似：

```text
https://jeffy-blog.netlify.app
```

## GitHub Pages 路线

如果电脑安装了 Git，并且你有 GitHub 账号：

1. 新建一个 GitHub 仓库，比如 `jeffy-blog`。
2. 把本项目推送到 GitHub。
3. 在仓库 Settings -> Pages 中选择发布分支。
4. 网址通常是：

```text
https://你的用户名.github.io/jeffy-blog/
```

## 自定义域名

以后如果你买了域名，可以在 Netlify、Vercel 或 GitHub Pages 后台绑定，例如：

```text
https://jeffy.blog
```

