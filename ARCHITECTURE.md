# Bountymon Architecture

## Tech Stack
- **Framework**: Astro 5.x (static site, fast, self-hostable)
- **Styling**: Tailwind CSS 4.x
- **Data**: JSON file (src/data/bounties.json)
- **Deploy**: Cloudflare Pages → www.bountymon.com

## Data Model
```typescript
interface Bounty {
  id: string;
  app_name: string;
  replaced_service: string;
  annual_cost: number;
  years_of_use: number;
  bounty_value: number; // calculated
  status: 'live' | 'in-progress' | 'planned';
  start_date: string;
  documentation_url?: string;
  notes?: string;
}
```

## Structure
```
src/
├── components/ (BountyCard, Stats, Header)
├── pages/index.astro
├── data/bounties.json
└── styles/global.css
```
