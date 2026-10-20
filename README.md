# Andini ♡ Our Little World

A complete, editable, mobile-friendly romantic scrapbook website made in **React + Vite + Tailwind CSS**, with **Framer Motion**, **Swiper**, and **Lucide React**. Not built for an anniversary or special holiday. Made for a long-distance love story **before the couple has met in person**.

## Deploy with GitHub Pages (no npm install needed on your computer)

**Best for sharing a link with Andini.** GitHub Actions installs Node packages, builds your site, and publishes it every time you push an update.

1. Create a **public** repository on GitHub called `for-andini` (or any name). Leave the optional starter README unchecked.
2. Extract the ZIP. Upload/push the **contents of `andini-scrapbook/` to the root of the repository**, keeping the hidden `.github/workflows/deploy.yml` folder intact. (An easy way to preserve that folder is via the terminal commands below.)
3. On GitHub, choose your repository's **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and watch `Publish our scrapbook ♡` run after you push to `main`.
5. Your link is `https://YOUR-GITHUB-USERNAME.github.io/for-andini/` if the repository is called `for-andini`.

To push from a terminal inside the extracted `andini-scrapbook` directory (Git and GitHub authentication required):

```bash
git init
git add .
git commit -m "A little world for Andini"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/for-andini.git
git push -u origin main
```

**No manual Vite base configuration is needed.** The workflow detects the repository name and handles subfolder paths for photos, favicon, styles, scripts, and music. It also supports a special `YOUR-GITHUB-USERNAME.github.io` repository at the domain root.

**Before publishing:** GitHub Pages is a public website, even if a paid plan permits a private source repository. Do not publish screenshots, photographs, exact details or messages without Andini's consent. The on-page **Edit memories** feature stores changes only in the browser viewing it; it does **not** synchronize those changes to GitHub or to Andini's phone. For a permanently shared scrapbook, add photos under `public/memories` and update `src/data/memories.js`, then push again.

---

## 1. Run it locally

You need **Node.js 18+** (Node 20 or 22 recommended) and an internet connection the first time you install packages.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

To prepare a production website:

```bash
npm run build
npm run preview
```

The deployable static files will be in `dist/`. You can host them on Netlify, Vercel, Cloudflare Pages or any static hosting provider. Vite settings: build command `npm run build`, output folder `dist`.

## 2. Make it personal for Andini

**All starting content lives in one file:**

`src/data/memories.js`

Change:

- `toName`, `fromName`, headline, introduction, final note
- `memories`: photo paths, captions, optional dates and personal notes
- `timeline`: how your story unfolded (no invented first in-person meeting)
- `littleThings`: front/back of each flipping note
- `notes`: torn paper quotes
- `surpriseNotes`: surprise envelopes/cards
- `loveLetter`: complete letter
- `musicTitle` and `musicSource`

The starting captions are deliberately **illustrative and non-specific**. They're not claims about exact dates, calls, shared trips, or photos together. Replace with your real memories to make the gift yours.

## 3. Replace the placeholder photos (important before sharing)

Bundled placeholders can be found in:

`public/memories/`

They are generic illustrations and sample photographs of skies, a moon, a cup of coffee, etc., **not pictures of Andini or the two of you**.

Put your photos or screenshots in the same folder, for example:

```
public/
  memories/
    our-first-screenshot.jpg
    andini-favorite-photo.jpg
    my-favorite-night.jpg
```

Then open `src/data/memories.js` and change the matching entries:

```js
memories: [
  {
    id: 'p1',
    image: '/memories/our-first-screenshot.jpg',
    caption: 'The conversation that started it all',
    date: 'Your real date, if you want one',
    note: 'What you remember about that moment.',
  },
  // other photos...
],
```

Also change `photoId` in timeline entries if you change photo IDs. For private couple media, ask Andini for consent before publishing publicly.

**VERY IMPORTANT: editing through the on-page pencil button is *local to your browser*.** An image you upload in that editor is saved to that browser's IndexedDB; your text edits live in localStorage. They will survive refreshes on that browser but **will not automatically appear on Andini's phone, in the downloaded source ZIP, or in your deployed site**. To prepare a shareable gift, edit `src/data/memories.js` and put the actual image files in `public/memories/` *before you build and deploy*. A future backend such as Supabase or Firebase could make the editor multi-device.

The editor's **Download a backup of my edits** saves a JSON containing your current content and uploaded image data, useful for safekeeping. It is not a self-contained site or a substitute for adding the assets to your project.

## 4. Music

A short original ambient placeholder track is bundled at:

`public/music/our-song.wav`

Replace the file with a track you have permission to use, and set the path in `src/data/memories.js`, for example:

```js
musicTitle: 'Our actual song',
musicSource: '/music/our-song.mp3',
```

The music player **never autoplays**. It includes play/pause, seek, mute and volume. Upload only music you are legally allowed to host.

## 5. What works now

- Responsive navigation, desktop header and mobile bottom dock
- Swipe-friendly main memory carousel (Swiper), arrows, pagination, autoplay toggle
- Different scattered-polaroid carousel
- Full-screen photo lightbox with keyboard arrows and Escape
- Photo collage and upload/edit modal
- Client-side image compression, IndexedDB image persistence, localStorage metadata
- Remove, reorder, date, caption and annotate photos
- Edit the love letter, torn-paper notes, little things, titles and signing name
- Scroll-reveal story timeline
- Flipping 'little things' notes and interactive mystery cards
- Envelope that opens to a handwritten letter and closes
- Optional background music player
- Gentle hover/click sparkles, transitions and reduced-motion support

## 6. Structure

```
public/
  memories/          # placeholder images; replace with your photos
  music/             # placeholder track
src/
  components/        # navigation, polaroids, editor, lightbox, etc.
  sections/          # each scrapbook chapter
  data/memories.js   # starting editable personal content
  hooks/useScrapbook.js
  lib/storage.js     # localStorage + IndexedDB
  App.jsx
  index.css
```

## 7. Privacy / storage / compatibility

No login, analytics, backend, or external image service is required. Fonts come from Google Fonts if online, with built-in fallbacks. Browser-stored images are compressed and stay on your device; clearing site data removes those edits. This is not password-protected. If you deploy personal content, anyone with the URL may be able to access it depending on your host. Consider an access-controlled host for private memories. The animated layout honors `prefers-reduced-motion`.

Made with love, for Andini. ♡
