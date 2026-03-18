# Winn — Personal Bio Page

A clean, warm personal bio site built for GitHub Pages.

## 📁 Folder Structure

```
winn-bio-site/
├── index.html          ← Main page
├── assets/
│   ├── css/
│   │   └── style.css   ← All styles
│   └── js/
│       └── main.js     ← Scroll animations
└── README.md
```

## 🚀 How to Deploy to GitHub Pages

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it: `your-username.github.io`  
   *(replace `your-username` with your actual GitHub username)*
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Push This Folder to GitHub

If you have Git installed, run these commands from inside this folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose `main` branch, `/ (root)` folder
5. Click **Save**

### Step 4 — Visit Your Site
After 1–2 minutes your site will be live at:
```
https://your-username.github.io
```

---

## ✏️ Customizing the Page

Open `index.html` and update:

| What to change | Where to find it |
|---|---|
| Your tagline | `<p class="tagline">` |
| Bio text | `<section class="about">` paragraphs |
| Skills / tags | `<div class="tags">` — add or remove `<span class="tag">` items |
| Email link | `href="mailto:hello@example.com"` |
| LinkedIn URL | `href="https://linkedin.com/in/yourhandle"` |
| Twitter/X URL | `href="https://twitter.com/yourhandle"` |
| GitHub URL | `href="https://github.com/yourhandle"` |
| Photo | Replace the `.photo-placeholder` div with an `<img>` tag |

### Adding a Real Photo

Replace this block in `index.html`:
```html
<div class="photo-placeholder">
  <span>W</span>
</div>
```

With:
```html
<img src="assets/img/photo.jpg" alt="Winn" class="photo-placeholder" style="object-fit:cover;" />
```

Then add your image to `assets/img/photo.jpg`.
