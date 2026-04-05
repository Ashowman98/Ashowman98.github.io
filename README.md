# Personal Homepage (GitHub Pages)

这是一个纯静态个人主页模板，包含：

- 个人简介（Home）
- 论文列表（Publications）
- 照片相册（Gallery，支持点击放大）
- 联系方式（Contact）
- 中英双语切换（UI 文案）

## 目录结构

```text
.
├── index.html
└── assets
    ├── css
    │   └── styles.css
    ├── images
    │   ├── photo-01.svg
    │   ├── photo-02.svg
    │   ├── photo-03.svg
    │   └── photo-04.svg
    └── js
        └── main.js
```

## 你需要替换的内容

1. `index.html`
- `Your Name`
- 联系方式（邮箱、Scholar、GitHub）

2. `assets/js/main.js`
- `publications[]`：按你的真实论文替换 `title/authors/year/url/venue`
- `photos[]`：替换成你的图片路径和说明（推荐放在 `assets/images/`）

## 本地预览

直接双击 `index.html` 即可查看，或者使用任意静态服务器预览。

## GitHub Pages 部署（用户名主页站）

以下命令在项目根目录执行（将 `<USERNAME>` 替换为你的 GitHub 用户名）：

```powershell
git init
git add .
git commit -m "init personal homepage"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<USERNAME>.github.io.git
git push -u origin main
```

然后在 GitHub 仓库页面：

1. 进入 `Settings` -> `Pages`
2. `Build and deployment` 选择 `Deploy from a branch`
3. Branch 选择 `main`，Folder 选择 `/ (root)`，保存

部署完成后访问：

- `https://<USERNAME>.github.io`

## 备注

- 当前示例图片是 SVG 占位图。上线前建议替换为压缩后的 WebP/JPG 实拍照片。
- 本项目无后端依赖，适合长期低维护托管。
