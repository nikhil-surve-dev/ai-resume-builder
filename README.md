<div align="center">

# ⚡ AI Resume Builder

> ⚡ Built as a portfolio project demonstrating real-world AI + frontend integration.

### *Craft ATS-Optimized Resumes in Seconds — Powered by AI.*

Build professional, ATS-optimized, recruiter-ready resumes using AI.

&nbsp;

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI_API-6366F1?style=for-the-badge&logo=openai&logoColor=white)](https://openrouter.ai)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](./LICENSE)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://vermillion-blini-c69059.netlify.app/)

&nbsp;

<img src="docs/screenshots/dashboard.png" alt="AI Resume Builder — Dashboard" width="100%" />

</div>

---

## 💡 Why This Project?

> Most resume builders are glorified fill-in-the-blank forms. This one **thinks**.

| Problem | How AI Resume Builder Solves It |
|---|---|
| Resumes get rejected by ATS scanners | AI generates keyword-rich, ATS-optimized content from your raw input |
| Writing impactful bullet points is hard | AI crafts quantified, action-driven achievement statements |
| Generic templates produce generic resumes | Every resume is uniquely generated — no two outputs are alike |
| Manual formatting wastes hours | One-click PDF export with professional typographic design |

---

## 🔥 Features

<table>
  <tr>
    <td width="50%">

### 🧠 AI Resume Generation
Leverages AI models via OpenRouter API to transform raw career data into polished, professional resume content — including summaries, bullet points, and skill extraction.

### 📊 ATS Compatibility Score
Every generated resume receives a real-time ATS score and keyword count, giving you immediate feedback on recruiter-system compatibility.

### 🎯 Smart Skill Tagging
Interactive chip-based skill input — skills are automatically woven into the generated resume for maximum keyword coverage.

</td>
<td width="50%">

### 📄 One-Click PDF Export
High-fidelity PDF generation using `html2pdf.js` — preserves typography, layout, and colors exactly as previewed on screen.

### ⚡ Real-Time Live Preview
Watch your resume take shape in a live canvas as the AI generates each section — no page reloads, no waiting.

### 🎨 Premium Design System
Custom design system with Material 3 color tokens, Manrope + Inter typography, glassmorphic surfaces, and smooth micro-animations.

</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **⚛️ Frontend** | React 19 + Vite 8 | Component-driven UI with blazing-fast HMR |
| **🎨 Styling** | CSS Modules + Design Tokens | Scoped styles with Material 3 token system |
| **🧭 Routing** | React Router v7 | Client-side navigation (Home → Results) |
| **🤖 AI Engine** | OpenRouter API (AI Models) | Natural-language resume generation |
| **📄 PDF Export** | html2pdf.js | Client-side HTML-to-PDF with A4 formatting |
| **🔤 Typography** | Google Fonts (Manrope, Inter) | Premium editorial typography |
| **🔣 Icons** | Material Symbols Outlined | Variable-weight icon system |
| **☁️ Deployment** | Netlify | CI/CD with automatic deploys from Git |

---

## 📸 Screenshots

### 🏠 Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### 📝 Form
![Form](docs/screenshots/form.png)

### 📊 Result
![Result](docs/screenshots/result.png)

### 📄 Resume
![Resume](docs/screenshots/resume.png)

---

## 📂 Project Structure

```
ai-resume-builder/
├── public/
│   ├── _redirects                   # Netlify SPA redirect rule
│   ├── favicon.svg                  # App favicon
│   └── icons.svg                    # SVG icon sprite
├── src/
│   ├── assets/
│   │   └── hero.png                 # Hero section image
│   ├── components/
│   │   └── Navbar.jsx               # Global navigation bar
│   ├── pages/
│   │   ├── HomePage.jsx             # Main form + hero + sidebar
│   │   ├── HomePage.module.css      # Scoped styles for home page
│   │   ├── ResultsPage.jsx          # Resume canvas + control panel
│   │   └── ResultsPage.module.css   # Scoped styles for results page
│   ├── services/
│   │   └── claude.js                # OpenRouter AI API integration
│   ├── App.jsx                      # Route definitions
│   ├── main.jsx                     # App entry point + BrowserRouter
│   └── index.css                    # Global design system tokens
├── docs/
│   └── screenshots/                 # UI screenshots for README
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore rules
├── CONTRIBUTING.md                  # Contribution guidelines
├── LICENSE                          # MIT License
├── README.md                        # This file
├── eslint.config.js                 # ESLint flat config
├── index.html                       # HTML shell with SEO meta tags
├── package.json                     # Dependencies & scripts
└── vite.config.js                   # Vite build configuration
```

---

## ⚡ Getting Started

### Prerequisites

| Requirement | Version | Check |
|---|---|---|
| **Node.js** | v18.0+ | `node --version` |
| **npm** | v9.0+ | `npm --version` |
| **Git** | Any | `git --version` |
| **OpenRouter API Key** | — | [Get one here](https://openrouter.ai/keys) |

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nikhil-surve-dev/ai-resume-builder.git
cd ai-resume-builder
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and add your API key:

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-your_key_here
```

> 💡 **Tip:** Get a free API key at [openrouter.ai/keys](https://openrouter.ai/keys)

### 4️⃣ Start the Development Server

```bash
npm run dev
```

### 5️⃣ Open in Browser

```
http://localhost:5173
```

Fill in the form and click **Generate Resume** to test the full AI pipeline.

---

## ❗ Troubleshooting

<details>
<summary><strong>🔴 "Missing OpenRouter API Key" error</strong></summary>

**Cause:** The `.env` file is missing or the `VITE_OPENROUTER_API_KEY` variable is not set.

**Fix:**
1. Make sure `.env` exists in the project root
2. Ensure the key starts with `sk-or-v1-`
3. Restart the dev server after editing `.env`

```bash
npm run dev
```

</details>

<details>
<summary><strong>🔴 "No response from AI" / API timeout</strong></summary>

**Cause:** OpenRouter API may be rate-limited or the model is temporarily unavailable.

**Fix:**
1. Check your API key balance at [openrouter.ai](https://openrouter.ai)
2. Verify your internet connection
3. Try again in a few seconds — transient errors are normal

</details>

<details>
<summary><strong>🔴 Port 5173 already in use</strong></summary>

**Fix:** Kill the existing process or use a different port:

```bash
# Option 1: Kill the process
npx kill-port 5173

# Option 2: Use a different port
npm run dev -- --port 3000
```

</details>

<details>
<summary><strong>🔴 Module not found errors</strong></summary>

**Fix:** Clean install dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

</details>

<details>
<summary><strong>🔴 PDF export blank or misformatted</strong></summary>

**Cause:** `html2pdf.js` requires the resume DOM to be fully rendered before export.

**Fix:** Ensure you're on the Results page with a generated resume before clicking "Download PDF". If the issue persists, try Chrome (works best).

</details>

---

## 🌐 Live Demo

> 🔗 **[View Live on Netlify →](https://vermillion-blini-c69059.netlify.app/)**

---

## 🚀 Deployment (Netlify)

### Step-by-Step

1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your GitHub repo: `ai-resume-builder`
4. Configure build settings:

| Setting | Value |
|---|---|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Node version** | `18` |

5. Add environment variables in Netlify → **Site settings** → **Environment variables**:

```
VITE_OPENROUTER_API_KEY = sk-or-v1-your_key_here
```

6. Click **Deploy site** 🎉

### SPA Redirect Fix

The file `public/_redirects` is already configured:

```
/*    /index.html   200
```

This ensures React Router works correctly on Netlify (no 404s on direct URL access).

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) before submitting a PR.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit with conventional commits (`git commit -m "feat: add amazing feature"`)
4. Push and open a PR

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**Built with ❤️ and AI by [Nikhil Surve](https://github.com/nikhil-surve-dev)**

⭐ Star this repo if you found it useful!

</div>
