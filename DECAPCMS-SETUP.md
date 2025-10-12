# DecapCMS Setup Guide for ReactCoffeMenu

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Servers

**You need TWO terminals running simultaneously:**

#### Terminal 1 - Vite Dev Server
```bash
npm run dev
```
This starts the React app at http://localhost:5173

#### Terminal 2 - DecapCMS Local Backend
```bash
npm run cms
```
This starts the DecapCMS proxy server

### Step 3: Access the CMS

Open your browser and go to:
```
http://localhost:5173/admin
```

You should see the DecapCMS login screen. Since you're using local backend, there's no authentication required - just click to enter.

---

## 🔧 Troubleshooting

### Issue 1: "Cannot GET /admin" or 404 Error

**Problem**: The admin page isn't accessible.

**Solutions**:
1. Make sure you've run `npm run dev` first
2. Check that `public/admin/` folder exists with `index.html` and `config.yml`
3. Clear browser cache and reload
4. Try accessing directly: `http://localhost:5173/admin/` (with trailing slash)

### Issue 2: "Error loading config.yml"

**Problem**: DecapCMS can't load its configuration.

**Solutions**:
1. Check `public/admin/config.yml` exists and is valid YAML
2. Make sure `local_backend: true` is set and NOT commented out
3. Ensure the `backend:` section (git-gateway) IS commented out for local dev

### Issue 3: "Failed to fetch" or CORS errors

**Problem**: The local backend proxy isn't running.

**Solutions**:
1. **IMPORTANT**: You MUST run `npm run cms` in a separate terminal
2. The proxy should start on `http://localhost:8081`
3. Check the terminal output for any errors
4. Kill any existing proxy processes: `pkill -f decap-server`

### Issue 4: Changes not showing in CMS

**Problem**: You can access the CMS but don't see your content.

**Solutions**:
1. Check that `content/` folder exists with markdown files
2. Verify the paths in `config.yml` match your folder structure
3. The CMS reads from the file system via the proxy server
4. Restart both dev server and proxy after config changes

---

## 📁 File Structure

```
ReactCoffeMenu/
├── public/
│   └── admin/
│       ├── index.html      ← DecapCMS admin UI
│       └── config.yml      ← CMS configuration
├── content/
│   ├── menu-items/         ← Menu item markdown files
│   ├── promotions/         ← Promotion markdown files
│   └── settings/           ← Site settings
└── src/
    └── lib/
        └── content-loader.js  ← Loads menu data (currently static)
```

---

## ⚙️ Configuration Files

### `public/admin/config.yml`

Key settings for local development:
```yaml
# Local development (MUST be enabled)
local_backend: true

# Production backend (MUST be commented out for local dev)
# backend:
#   name: git-gateway
#   branch: main

media_folder: "public/uploads"
public_folder: "/uploads"
locale: "ru"
```

### `public/admin/index.html`

Loads DecapCMS from CDN:
```html
<script src="https://unpkg.com/decap-cms@^3.4.0/dist/decap-cms.js"></script>
```

---

## 🎯 What You Can Edit in CMS

Once the CMS is running, you can:

### 1. Menu Items (`/admin/#/collections/menu-items`)
- Add new coffee, tea, or matcha items
- Edit existing items (name, description, prices, sizes)
- Mark items as unavailable
- Change display order
- Upload images

### 2. Promotions (`/admin/#/collections/promotions`)
- Add new promotions
- Edit existing promotions
- Set discount percentages
- Mark promotions as active/inactive

### 3. Site Settings (`/admin/#/collections/settings`)
- Update site name
- Change logo
- Edit business hours
- Update contact information

---

## 🔄 Workflow

### Local Development
1. Start Vite dev server: `npm run dev`
2. Start CMS proxy: `npm run cms` (in another terminal)
3. Edit content at: `http://localhost:5173/admin`
4. Changes are saved to markdown files in `content/`
5. Currently, the app loads static data from `src/lib/content-loader.js`

### Production Deployment
1. Update `public/admin/config.yml`:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   local_backend: false  # or remove this line
   ```
2. Deploy to Netlify
3. Enable Netlify Identity + Git Gateway
4. Access CMS at: `https://your-site.com/admin`

---

## 🚨 Common Mistakes

### ❌ Wrong:
```yaml
# Both enabled - CONFLICT!
local_backend: true
backend:
  name: git-gateway
```

### ✅ Correct (Local Dev):
```yaml
# backend:
#   name: git-gateway
local_backend: true
```

### ✅ Correct (Production):
```yaml
backend:
  name: git-gateway
# local_backend: true  ← Commented out or removed
```

---

## 📝 Next Steps

Currently, the app uses **static data** from `src/lib/content-loader.js`. To make it dynamic:

1. **Install a markdown parser**:
   ```bash
   npm install gray-matter
   ```

2. **Load markdown files dynamically** in `content-loader.js`

3. **Or use a build-time solution** with Vite plugins

For this learning project, static data is fine and shows the same content as the CMS would provide!

---

## 🆘 Still Having Issues?

1. Check both terminal outputs for errors
2. Ensure ports 5173 and 8081 are not in use
3. Try restarting both servers
4. Clear browser cache
5. Check browser console (F12) for JavaScript errors

---

## 📚 Resources

- [DecapCMS Docs](https://decapcms.org/docs/)
- [Local Backend Setup](https://decapcms.org/docs/working-with-a-local-git-repository/)
- [Vite Public Directory](https://vitejs.dev/guide/assets.html#the-public-directory)

---

Made with ❤️ and ☕
