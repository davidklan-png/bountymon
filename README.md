# 💰 Bountymon

> Kill subscriptions. Collect bounties. Build sovereignty.

Bountymon is a bounty tracking system for self-hosted apps. Track how much money you've saved by replacing paid SaaS with self-hosted alternatives.

![Bountymon Preview](https://bountymon.com/preview.png)

## 🎯 What is a Bounty?

A **bounty** is the dollar value of a SaaS subscription you've escaped by self-hosting:

```
Bounty = Annual Subscription Cost × Years of Use
```

For example:
- Replace Dropbox Pro ($120/yr) with Nextcloud for 2 years → **$240 bounty**
- Replace Google Photos ($150/yr) with Immich for 1 year → **$150 bounty**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/davidklan-png/bountymon.git
cd bountymon

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to see your bounty board.

### Adding Bounties

Edit `src/data/bounties.json`:

```json
{
  "id": "my-app",
  "app_name": "My Self-Hosted App",
  "replaced_service": "Expensive SaaS",
  "annual_cost": 120,
  "years_of_use": 2,
  "bounty_value": 240,
  "status": "live",
  "start_date": "2024-01-15",
  "documentation_url": "https://github.com/...",
  "notes": "Optional notes"
}
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.astro      # Site header
│   ├── Stats.astro       # Stats dashboard
│   └── BountyTable.astro # Bounty table
├── data/
│   └── bounties.json     # Your bounty data
├── layouts/
│   └── Layout.astro      # Base layout
├── pages/
│   └── index.astro       # Main page
└── styles/
    └── global.css        # Global styles
```

## 🚢 Deployment

### Cloudflare Pages (Recommended)

1. Push to GitHub
2. Connect repo to Cloudflare Pages
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add custom domain: `bountymon.com`

### Other Platforms

```bash
# Build for production
npm run build

# Output in dist/ folder
# Deploy to any static host
```

## 🎨 Customization

### Theming

Edit `src/styles/global.css` to customize colors. The default uses a dark theme with Tailwind CSS.

### Status Types

- `live` - ✅ In production
- `in-progress` - 🔄 Currently building
- `planned` - 📋 On the roadmap

## 📊 Stats Tracked

- **Total Bounty** - Sum of all live bounties
- **Annual Savings** - Ongoing yearly savings
- **Live Count** - Number of apps in production
- **In Progress** - Apps being built
- **Planned** - Future bounties

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a PR

## 📝 License

MIT - See [LICENSE](LICENSE) for details.

## 🙏 Inspiration

Built by people tired of paying for SaaS subscriptions. Self-host everything.

---

**Tagline**: Kill subscriptions. Collect bounties. Build sovereignty. 💰
