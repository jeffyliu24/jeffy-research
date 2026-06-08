# jeffy

jeffy 的个人博客，用来更新文献笔记、阅读记录和技术性的想法。

## 本地预览

推荐用本地服务器打开：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

如果你的电脑没有 Python，也可以直接双击 `index.html` 查看页面。

## 更新文章

现在每篇文章都是 `posts/` 文件夹里的一个 Markdown 文件。比如：

- `posts/how-to-read-a-paper.md`
- `posts/paper-figures.md`

新写一篇文章时，复制一个已有 `.md` 文件，改文件名和内容即可。

文章开头这段叫“文章信息”，用于生成首页卡片：

```md
---
title: 我的第一篇文献笔记
type: 文献笔记
category: literature
date: 2026-06-08
summary: 这里写一两句话摘要，显示在首页卡片上。
tags: 文献, 笔记
---
```

正文写在第二个 `---` 下面：

```md
## 小标题

这里写正文。正文可以很长，段落之间空一行。
```

注意：

- 文件名就是文章链接名，建议只用英文、小写字母、数字和短横线，比如 `my-first-note.md`。
- `category` 写 `literature` 会进入文献笔记区。
- `category` 写 `idea` 会进入技术想法区。
- `tags` 用英文逗号分隔。

改完或新增文章后，运行：

```powershell
C:\Users\13210\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe scripts\build-posts.js
```

这个命令会重新生成 `posts-data.js`，网站就能看到新文章。

## 插入图片或图表

把图片放到 `assets/images/` 文件夹，比如：

```text
assets/images/my-chart.png
```

然后在文章里写：

```md
![我的图表说明](assets/images/my-chart.png)
```

如果是 SVG、PNG、JPG 都可以。图表说明会显示在图片下面。

## 插入表格

在文章里直接写 Markdown 表格：

```md
| 指标 | 结果 | 备注 |
| --- | --- | --- |
| 准确率 | 92% | 示例数据 |
| 样本量 | 128 | 示例数据 |
```

## 建议的文献笔记结构

可以参考 `notes/literature-template.md`。等文章变多后，再把每篇笔记拆成独立 Markdown 页面，并加入搜索和标签页。
