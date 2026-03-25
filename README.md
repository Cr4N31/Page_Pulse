# PagePulse

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v20-blue)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-blue)](https://reactjs.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)

**PagePulse** is a lightweight website audit tool that checks semantic HTML tags and image accessibility to generate a simple SEO score. Built with **React** and **Node.js + Express**, it’s ideal for learning full-stack development and basic SEO auditing.

---

## Features

* Checks for **semantic HTML tags**: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
* Detects **images missing alt attributes**.
* Calculates a **simple SEO score** out of 100.
* Displays **issues and warnings** for improvement.
* Works with **static HTML websites**.
* Backend handles invalid URLs, fetch errors, and port conflicts gracefully.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express
* **HTML Parsing:** Cheerio
* **HTTP Requests:** node-fetch
* **CORS Handling:** cors

---

## Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/pagepulse.git
cd pagepulse
```

2. **Install server dependencies**

```bash
cd server
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

4. **Start the backend server**

```bash
cd ../server
node server.js
```

* Default port: 5050
* If 5050 is in use, the server will try 5051, 5052, etc.

5. **Start the frontend**

```bash
cd ../frontend
npm start
```

* React app will usually run on `http://localhost:3000`

---

## Usage

1. Open the frontend in your browser.
2. Enter the full URL of the website you want to audit (e.g., `https://example.com`).
3. Click **Check**.
4. View the **SEO score** and **issues detected**.

---

## Project Structure

```
pagepulse/
├─ server/                  # Backend server
│  ├─ utils/
│  │  └─ pagehealth.js      # SEO check functions
│  └─ server.js             # Express server
├─ frontend/                # React frontend
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ FormInput.jsx
│  │  │  └─ Results.jsx
│  │  └─ pages/
│  │     └─ Home.jsx
├─ README.md                # Project documentation
└─ package.json
```

---

## Notes

* Works best on **static HTML sites**. For React/Next.js or other dynamic sites, use **Puppeteer** to render pages before parsing.
* Semantic tags counted: 7 types. Fewer than 5 → warning. More than 50 → warning.
* Images missing alt text decrease your SEO score.

---

## Future Improvements

* Add **Puppeteer support** for dynamic websites.
* Generate **detailed SEO reports**, including headings (`<h1>`–`<h6>`) and meta tags.
* Add **user authentication** and save **historical page audits**.
* Deploy as a **SaaS tool** for multiple users.

---

## Current Issues

* Currently the grading system gives out results that are inaccurate.
* It detects websites that have ideal semantic tag practice but fails to read accurately how many semantic tags are actually used and also missing image alts

## License

This project is licensed under the **MIT License** © 2026 Bitrus Yacham Duniya
