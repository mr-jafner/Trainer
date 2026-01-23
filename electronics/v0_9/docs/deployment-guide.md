# Deployment Guide: OpenBSD httpd

Standard deployment process for Vite/React apps to OpenBSD httpd.

## Prerequisites

- Node.js (for building) — on local machine or any build server
- SSH access to your OpenBSD server
- httpd configured and running

## Step 1: Build

```bash
cd your-project
npm install
npm run build
```

This creates a `dist/` folder with static files:
- `index.html`
- `assets/` (minified JS/CSS with cache-busting hashes)

## Step 2: Set Base Path

**Before building**, edit `vite.config.js` to match your deployment URL:

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/your-path/',  // Must match URL path exactly
})
```

Examples:
| URL | base value |
|-----|------------|
| `jafner.com/learning_guitar/v0/` | `'/learning_guitar/v0/'` |
| `jafner.com/turbo-learning/` | `'/turbo-learning/'` |
| `jafner.com/` (root) | `'/'` |

**Trailing and leading slashes matter!**

## Step 3: Create Directory on Server

```bash
ssh user@yourserver.com "doas mkdir -p /var/www/htdocs/your-path"
```

## Step 4: Upload Files

```bash
scp -r dist/* user@yourserver.com:/var/www/htdocs/your-path/
```

## Step 5: Fix Permissions (CRITICAL)

Files uploaded via scp inherit your local UID, not the web server user. **httpd runs as `www`** and will return 403 Forbidden if it can't read the files.

**Always run this after uploading:**

```bash
ssh user@yourserver.com "doas chown -R www:www /var/www/htdocs/your-path/ && doas chmod -R 755 /var/www/htdocs/your-path/"
```

Or if you're on the server directly:

```bash
doas chown -R www:www /var/www/htdocs/your-path/
doas chmod -R 755 /var/www/htdocs/your-path/
```

## Step 6: Configure httpd (if needed)

Add to your server block in `/etc/httpd.conf`:

```conf
location "/your-path/*" {
    directory index index.html
}
```

For SPA routing (if your app uses client-side routing):

```conf
location "/your-path/*" {
    directory index index.html
    # Fallback for client-side routes
    error document 404 "/your-path/index.html"
}
```

Then reload:

```bash
doas rcctl reload httpd
```

## Quick Deploy Script

Save as `deploy.sh` in your project root:

```bash
#!/bin/bash

# Configuration
SERVER="user@yourserver.com"
REMOTE_PATH="/var/www/htdocs/your-path"

# Build
echo "Building..."
npm run build

# Upload
echo "Uploading..."
scp -r dist/* $SERVER:$REMOTE_PATH/

# Fix permissions
echo "Fixing permissions..."
ssh $SERVER "doas chown -R www:www $REMOTE_PATH/ && doas chmod -R 755 $REMOTE_PATH/"

echo "Done! Deployed to $REMOTE_PATH"
```

Make executable: `chmod +x deploy.sh`

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| 403 Forbidden | Wrong file permissions | Run chown/chmod commands above |
| 403 on assets (JS/CSS) | Same as above | Same fix — permissions |
| Blank page | Wrong `base` in vite.config.js | Must match URL path exactly |
| Blank page | Missing assets | Check browser console for 404s on .js/.css |
| Routes not working | SPA fallback missing | Add error document 404 directive |
| MIME type errors | Actually a 403 (httpd returns HTML error) | Fix permissions |

## Updating

For updates, just repeat steps 4-5:

```bash
npm run build
scp -r dist/* user@yourserver.com:/var/www/htdocs/your-path/
ssh user@yourserver.com "doas chown -R www:www /var/www/htdocs/your-path/ && doas chmod -R 755 /var/www/htdocs/your-path/"
```

Or use the deploy script.

## Version Management

Using `/v0/`, `/v1/` paths is smart for versioning:

```
/var/www/htdocs/
└── my-app/
    ├── v0/    ← stable
    ├── v1/    ← new version in testing
    └── latest → v1  (symlink, optional)
```

Create symlink:
```bash
doas ln -sf /var/www/htdocs/my-app/v1 /var/www/htdocs/my-app/latest
```
