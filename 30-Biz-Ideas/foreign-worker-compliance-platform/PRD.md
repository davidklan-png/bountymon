# PRD: Foreign Worker Compliance & Subsidy Platform (Working Title: TBD)

**Version:** 0.1.0
**Date:** 2026-04-20
**Author:** Teabagger / Kinokomon
**Status:** Discovery

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Problem Statement](#2-problem-statement)
3. [Market Context](#3-market-context)
4. [Target Audience](#4-target-audience)
5. [Competitive Landscape](#5-competitive-landscape)
6. [Product Vision](#6-product-vision)
7. [Key Features / Requirements](#7-key-features--requirements)
8. [User Stories](#8-user-stories)
9. [Acceptance Criteria](#9-acceptance-criteria)
10. [Goal / Success Metrics](#10-goal--success-metrics)
11. [Scope](#11-scope)
12. [Regulatory Timeline & Opportunity Window](#12-regulatory-timeline--opportunity-window)
13. [Revenue Model](#13-revenue-model)
14. [Go-to-Market Strategy](#14-go-to-market-strategy)
15. [Risk Assessment](#15-risk-assessment)
16. [Citations & References](#16-citations--references)

---

## 1. Purpose

### Problem to Be Solved

Small and medium businesses in Japan that employ foreign workers face a fragmented, opaque, and ever-changing compliance landscape. Support exists at national, metropolitan, and ward levels — but it is scattered across dozens of websites, requires expert knowledge to navigate, and is designed for passive discovery rather than proactive delivery.

**The core problem:** A Nakano-ku restaurant owner with 3 Vietnamese staff members has no single place to answer:
- "When does each worker's visa expire, and what do I need to do?"
- "What subsidies am I eligible for, and how do I apply?"
- "What new regulations affect me, and what must I do to comply?"
- "How do I create legally required multilingual workplace documents?"

This results in:
- **Missed subsidies** — businesses leave hundreds of thousands of yen on the table
- **Compliance failures** — visa expiry, insurance non-payment, document gaps leading to fines or worker deportation
- **Worker attrition** — poor onboarding and support drives turnover
- **Wasted expert time** — 行政書士 and 社労士 spend hours on discovery work that could be automated

### Value Proposition

A single platform that ingests a business's foreign worker profile and automatically delivers:
1. **Compliance deadlines** — visa renewals, insurance checks, mandatory reports, with pre-filled forms
2. **Subsidy matching** — all eligible national + metropolitan + local subsidies surfaced with application kits
3. **Regulatory alerts** — new rules and how they affect this specific business
4. **Document generation** — multilingual employment contracts, safety manuals, and onboarding docs

**One input ("I have 3 Vietnamese workers") → Complete operational picture.**

---

## 2. Problem Statement

### Root Causes

| # | Cause | Evidence |
|---|-------|----------|
| 1 | Support is fragmented across 3+ government layers | Tokyo Metro Nav Center (Yotsuya), Hello Work, ward offices — each with different portals and processes |
| 2 | Businesses must self-discover support (passive model) | No proactive outreach from any level to businesses already employing foreign workers |
| 3 | Overlapping subsidy programs with different eligibility criteria | MHLW: 4+ subsidy programs. Tokyo Metro: 2 programs. Wards: varying. Total ~10+ per business |
| 4 | Regulatory velocity is accelerating | 育成就労 (2027), health insurance linkage (2027), fee increases (2026), naturalization tightening (2026) |
| 5 | Document requirements are multilingual and changing | "Easy Japanese" (やさしい日本語) standardization being pushed by 総務省 to all municipalities |
| 6 | Expert bottleneck | ~30K 行政書士 in Japan. Average hourly rate ¥15-25K. Small businesses can't afford ongoing advisory |

### Impact Quantification

- **342,087** businesses in Japan employ foreign workers (MHLW, Oct 2024)
- **257万** foreign workers nationally, up from ~172万 in 2019 — 49% growth in 5 years
- **Nakano-ku specific**: foreign residents grew from 18,272 (Jan 2023) to 27,257 (Dec 2025) — **50% growth in 2 years**
- Average subsidy uptake rate among SMBs: estimated <15% (no official statistic; inferred from Hello Work adoption rates)
- 2027 health insurance/pension linkage will affect an estimated **4M+** foreign residents simultaneously

---

## 3. Market Context

### Regulatory Drivers

| Date | Policy | Impact |
|------|--------|--------|
| Apr 2026 | Naturalization residency requirement: 5→10 years | Fewer new citizens; more long-term visa holders needing compliance |
| 2026 (summer) | Land acquisition rule framework | New compliance layer for foreign nationals owning property |
| 2026 (ongoing) | Visa fee increases (up to ¥70K renewal, ¥200K permanent residency) | Higher cost of non-compliance |
| Mar 2027 | 育成就労制度 replaces 技能実習制度 | Entire new compliance framework for ~330K 技能実習 workers |
| 2027 (spring) | Health insurance/pension payment linked to immigration review | Compliance wave affecting all foreign residents |
| 2028 (target) | JESTA (electronic travel authorization) + mandatory private health insurance | Visitor compliance, potential spillover to employer awareness |
| TBD | 国保・年金 納付状況確認 national rollout | Scheduled "summer 2026" guidelines, "autumn" finalization |

### Key Government Support Infrastructure (Existing)

**National (MHLW):**
- 外国人雇用管理アドバイザー — free expert visits via Hello Work
- 人材確保等支援助成金 (外国人就労環境整備コース) — up to ¥720K
- トライアル雇用助成金 — ¥40K/month for 3 months
- キャリアアップ助成金 — conversion of part-time to full-time

**Tokyo Metropolitan:**
- 東京外国人材採用ナビセンター (Yotsuya) — consulting, seminars, internships, job fairs
- 中小企業外国人研修助成金 — 50% of Japanese language training, max ¥250K
- にほんごUP — business Japanese e-learning for foreign employees

**Nakano-ku (Ward):**
- ANIC (中野区国際交流協会) — Japanese classes, cultural exchange
- 外国人相談窓口 — 4F ward office
- なかの生活ガイドブック — multilingual life guide (JP/EN/CN/KR)
- 文化振興・多文化共生推進課 — policy division (no business-facing operational support)

### Ward-Level Data (Nakano-ku)

| Metric | Value | Source |
|--------|-------|--------|
| Total population | 344,153 (Dec 2025) | Nakano-ku population data |
| Foreign residents | 27,257 (Dec 2025) | Nakano-ku population data |
| Foreign % of population | 7.9% | Calculated |
| YoY growth (foreign pop) | ~25% (18,272 → 27,257 over ~2 years) | Calculated |
| Mixed-nationality households | 2,094 (Dec 2025) | Nakano-ku population data |
| Top foreign nationalities | Chinese (~37%), Korean, Nepalese, Vietnamese | Nakano-ku policy document (2023) |
| Dedicated business-facing foreign hiring support | **None** | Research finding |

---

## 4. Target Audience

### Primary: Small Business Owners (雇用主)

**Profile:**
- Owner or operations manager at SMBs with 1-50 foreign workers
- Industries: restaurants, retail, cleaning, manufacturing, construction, caregiving, hospitality
- Often located in wards with high foreign resident concentrations (Nakano, Shinjuku, Adachi, Arakawa, Minato)
- Limited Japanese bureaucracy literacy; may be foreign-born themselves
- Price-sensitive; will not pay ¥50K+ for advisory services proactively
- Tech literacy varies: LINE-native but not SaaS-native

**Pain intensity:** HIGH — compliance failures can mean losing workers, fines, or business closure

**Willingness to pay:** ¥3-10K/month for compliance monitoring; success-fee model for subsidies (10-20%)

### Secondary: 外国人雇用管理アドバイザー / 行政書士 / 社労士

**Profile:**
- Professional services practitioners who handle foreign worker compliance for multiple SMB clients
- 50-200 clients each; charge ¥15-25K/hour
- Spend significant time on discovery/admin that could be automated
- Want to scale their practice without hiring

**Pain intensity:** MEDIUM — time wasted on admin, but can pass costs to clients

**Willingness to pay:** ¥10-30K/month per professional tier; white-label reseller interest

### Tertiary: Municipal Governments (区役所)

**Profile:**
- Ward offices implementing 多文化共生 policies without adequate budgets or staff
- Mandated to promote foreign resident support but lack operational tools
- Interested in platforms that reduce their workload and demonstrate KPIs

**Pain intensity:** LOW-MEDIUM — political mandate but no direct consequence of failure

**Willingness to pay:** Procurement / pilot program budgets. Not primary revenue target initially.

### Non-Target (Out of Scope for V1)

- Large enterprises with dedicated HR/legal teams (they use specialized immigration law firms)
- Foreign workers themselves (B2B model, not B2C)
- 監理団体 / 登録支援機関 (already served by existing SaaS tools — see competitive landscape)

---

## 5. Competitive Landscape

### Existing Players (What Exists Today)

#### A. Foreign Worker Management SaaS (12+ tools identified)

These tools focus on **internal management of specific visa categories** (primarily 特定技能 and 技能実習):

| Product | Company | Focus | Pricing | Key Feature |
|---------|---------|-------|---------|-------------|
| **irohana** | いろはな | 特定技能 所属機関 | Quote-based | Task auto-generation from entry date |
| **さくらJOB** | デルタマーケティング | 特定技能 management | ¥24,800/mo (50 users) | AI emotion detection in video calls |
| **SMILEVISA** | CROSLAN | All visa application forms | ¥20,000/mo (20 users) | Broad visa type coverage |
| **MANABEL JAPAN** | プロシーズ | HR + education mgmt | Quote-based | Proprietary Japanese e-learning |
| **dekisugi** | グレッジ | 登録支援機関 向け | Free (≤100 users) | Task assignment + progress tracking |
| **Linkus** | BEENOS HR Link | 登録支援機関 向け | ¥15K + ¥980/user | Chat + document linking |
| **CAMCAT** | キャムグローバル | Compliance alerts | ¥2K/account + ¥2K/user | Minimum wage + overtime alerts |
| **Hitachi 外国人雇用管理** | 日立システムズ | 36 visa types | ¥37,500 (≤25 users) | Enterprise-grade UI |
| **かんべえ** | サンユー | 技能実習 + 特定技能 | ¥20K/mo (100 users) | Auto-task from entry date |
| **noborder** | Exstan | Application mgmt | ¥9,800/mo (15 users) | 行政書士-run; 10-language translation |
| **ビザマネ** | ウィルグループ | Card verification + eligibility | ¥35K/mo | IC chip reading for forgery detection |
| **Saver.** | MICS | 技能実習 監理団体 | ¥3,000/mo | Ultra-low cost; unlimited workers |

**Sources:**
- <https://www.aspicjapan.org/asu/article/29079> (comprehensive comparison, Dec 2025)
- <https://noborder.cloud/nortification/release0007.html> (6-tool comparison, Jun 2024)

#### B. Training / Education Platforms

| Product | Company | Focus |
|---------|---------|-------|
| **カミナシ 教育** | カミナシ (東京・千代田) | Multilingual video manuals + AI translation (13 languages). 100K registrations target FY2025 |

**Source:**
- <https://corp.kaminashi.jp/news/pr_20250106_3> (press release, Jan 2025)
- Nikkei article (Feb 2025)

#### C. Matching / Recruitment Platforms

| Product | Company | Focus |
|---------|---------|-------|
| **外国人採用の窓口** | gaikokusaiyo.com | B2B matching service for foreign worker recruitment |
| **MEET IN OSAKA** | Osaka Prefecture | Matching platform for businesses + foreign students |
| **東京外国人材採用ナビセンター** | Tokyo Metro Govt | Free consulting + matching + seminars (physical center) |

#### D. Professional Service Marketplaces

| Product | Focus |
|---------|-------|
| **士SEARCH** (FIS Solutions) | Matching platform for 税理士/社労士/行政書士. 15,654+ registered professionals |

### Competitive Gaps (What Doesn't Exist)

**None of the existing tools combine:**

1. ✅ Visa/compliance monitoring — EXISTS (multiple tools)
2. ❌ **Subsidy eligibility matching + application pre-fill** — DOES NOT EXIST
3. ❌ **Regulatory change alerts personalized to business profile** — DOES NOT EXIST
4. ❌ **Cross-layer subsidy aggregation (national + metro + ward)** — DOES NOT EXIST
5. ✅ Multilingual document generation — PARTIALLY EXISTS (noborder, カミナシ)
6. ✅ Worker management / task tracking — EXISTS (irohana, さくらJOB, etc.)
7. ❌ **Single dashboard combining all of the above for SMB owner** — DOES NOT EXIST

**The white space:** Features 2, 3, 4, and 7 are unserved. Existing tools are either deep on one vertical (visa management) or broad but passive (government portals). Nobody is doing proactive, personalized compliance + subsidy + document support in one place.

---

## 6. Product Vision

### One-Liner

**"The TurboTax for employing foreign workers in Japan."**

### Positioning

Not another visa management tool. A **compliance operating system** for SMBs that employ foreign workers — starting with Tokyo, expanding nationally.

### Core Differentiator

Existing tools answer: "How do I manage the foreign workers I have?"
This platform answers: "What don't I know about employing foreign workers, and what free money am I leaving on the table?"

---

## 7. Key Features / Requirements

### Phase 1: MVP (Months 1-4)

#### F1. Business Profile & Worker Registry

**Priority:** P0 (Must Have)
**Description:** Onboarding flow that captures business details and foreign worker profiles.

| Field | Example | Source |
|-------|---------|--------|
| Business type / industry | 飲食業 (restaurant) | - |
| Employee count | 12 total, 4 foreign | - |
| Foreign worker details | Name, nationality, visa type, expiry date, hire date | OCR from 在留カード |
| Current subsidies used | None / list | Manual input |
| Current compliance status | Health insurance enrolled (Y/N), pension (Y/N) | Manual input |

**Acceptance Criteria:**
- Onboarding completable in <10 minutes
- Support OCR capture from 在留カード photo (front + back)
- Minimum viable: manual input; enhanced: OCR
- Data stored securely (ISO 27001 or equivalent)

#### F2. Compliance Deadline Tracker

**Priority:** P0 (Must Have)
**Description:** Automated tracking of all compliance deadlines with alerts.

**Tracked items:**
- Visa expiry / renewal window (180/90/60/30 days)
- 定期面談 (quarterly interviews) for 特定技能
- 各種届出 (periodic reports) for 特定技能
- Health insurance / pension enrollment verification
- Contract renewal dates
- Mandatory training completion dates

**Acceptance Criteria:**
- Alert via LINE, email, and in-app notification
- Customizable alert timing (default: 90/60/30 days)
- Each alert includes: what's due, why it matters, what form to file, link to pre-filled form
- Dashboard shows all workers' compliance status at a glance (green/yellow/red)

#### F3. Subsidy Eligibility Matcher

**Priority:** P0 (Must Have — core differentiator)
**Description:** Cross-reference business profile against national, metropolitan, and ward subsidy databases.

**Database scope (V1):**
- MHLW subsidies: 人材確保等支援助成金, トライアル雇用助成金, キャリアアップ助成金, 人材開発支援助成金, 雇用調整助成金
- Tokyo Metro subsidies: 中小企業外国人研修助成金, 外国人材受入支援事業
- Ward-level subsidies: Initially Nakano-ku; expandable
- Seasonal / time-limited subsidies

**Matching logic:**
```
Input: Business profile + worker profiles
Process: Rule engine matching against subsidy eligibility criteria
Output: Ranked list of eligible subsidies with:
  - Estimated subsidy amount
  - Application deadline
  - Required documents
  - Pre-filled application forms
  - Estimated approval probability (based on historical data)
```

**Acceptance Criteria:**
- Match accuracy ≥95% (verified by 行政書士 review)
- Application pre-fill covers ≥80% of form fields
- Deadline alerts for subsidy applications
- Results returned in <30 seconds

#### F4. Regulatory Alert Engine

**Priority:** P1 (Should Have)
**Description:** Monitor regulatory changes and surface only what's relevant to each business.

**Sources monitored:**
- MHLW / 出入国在留管理庁 announcements
- Tokyo Metro Govt employment policy updates
- Relevant ward office announcements
- Key legal databases

**Personalization:**
```
Regulation change → determine affected visa types / industries / business sizes
→ match against registered business profiles
→ generate plain-language explanation + required action items
→ deliver via LINE/email
```

**Acceptance Criteria:**
- New regulation surfaced within 48 hours of official announcement
- Alert includes: what changed, who it affects, what to do, deadline
- False positive rate <5% (alerting about irrelevant changes)
- Available in Japanese and English (V1); Vietnamese, Chinese (V2)

#### F5. Multilingual Document Generator

**Priority:** P1 (Should Have)
**Description:** AI-powered generation of legally compliant workplace documents in multiple languages.

**Document types (V1):**
- 雇用契約書 (employment contract)
- 職場規則 / 就業規則 (workplace rules)
- 安全衛生マニュアル (safety manual)
- 労働条件通知書 (labor conditions notice)

**Language support (V1):**
- Japanese (standard + やさしい日本語)
- Vietnamese
- Chinese (simplified)
- English
- Nepalese

**Acceptance Criteria:**
- Generated documents reviewed and approved by 行政書士
- やさしい日本語 version uses 总務省 guidelines
- Generation time <60 seconds per document
- Documents downloadable as PDF with company branding

### Phase 2: Growth (Months 5-8)

#### F6. Expert Marketplace / Partner Network

**Priority:** P1
**Description:** Connect businesses with verified 行政書士, 社労士, and tax advisors for tasks requiring human expertise.

**Features:**
- One-click request for expert review
- Partners pre-loaded with business context (from F1-F5)
- Rating system
- Standardized pricing for common tasks

#### F7. Employee Self-Service Portal

**Priority:** P2
**Description:** Mobile-first portal for foreign workers to check their own visa status, access documents, and submit information.

**Features:**
- LINE bot integration
- Visa status check
- Document downloads in native language
- Question submission to employer or expert

#### F8. Analytics Dashboard for Municipalities

**Priority:** P2
**Description:** Aggregate, anonymized compliance data for ward offices to track foreign resident integration.

**Features:**
- Ward-level compliance rate tracking
- Common gap identification
- Program effectiveness measurement
- KPI reporting aligned with 多文化共生推進基本方針

### Phase 3: Scale (Months 9-12+)

#### F9. Multi-Ward / National Expansion

**Priority:** P2
**Description:** Expand subsidy database and regulatory monitoring to all Tokyo wards, then Osaka, Aichi, Fukuoka.

#### F10. 育成就労 Compliance Module

**Priority:** P1 (timing-dependent)
**Description:** Full compliance module for the 育成就労制度 replacing 技能実習 in April 2027.

---

## 8. User Stories

### Epic 1: Business Onboarding

```
As a restaurant owner with 3 Vietnamese workers,
I want to set up my business profile in under 10 minutes,
so that I can start receiving compliance alerts and subsidy matches
without navigating multiple government websites.
```

### Epic 2: Compliance Monitoring

```
As an operations manager at a cleaning company,
I want to see all my foreign workers' visa expiry dates on one screen,
so that I never miss a renewal deadline
and don't risk losing workers or getting fined.
```

```
As a small business owner,
I want to receive a LINE notification 90 days before any worker's visa expires,
with a pre-filled renewal form attached,
so that I can submit it immediately without hiring a 行政書士.
```

### Epic 3: Subsidy Discovery

```
As a manufacturing SME owner with 5 foreign workers,
I want to see all subsidies I'm eligible for ranked by amount and deadline,
so that I don't leave government money on the table
and can prioritize which applications to file first.
```

```
As a shop owner who has never applied for a subsidy,
I want the platform to pre-fill 80%+ of the application form,
so that I can apply without spending hours reading instructions or paying an expert.
```

### Epic 4: Regulatory Awareness

```
As a business owner employing foreign workers,
I want to be notified when new regulations affect my business specifically,
so that I can prepare in advance rather than learning about changes after they take effect.
```

### Epic 5: Document Generation

```
As a business owner,
I want to generate employment contracts in Vietnamese + Japanese,
that are legally compliant and use やさしい日本語,
so that my workers understand their rights and I meet my legal obligations.
```

### Epic 6: Expert Connection

```
As a business owner with a complex visa question,
I want to request expert help through the platform,
so that the expert already has all my business and worker context
and I only pay for actual advisory (not discovery time).
```

---

## 9. Acceptance Criteria

### System-Level

| ID | Criterion | Measurement |
|----|-----------|-------------|
| AC-01 | Onboarding completion rate | ≥70% of signups complete profile |
| AC-02 | Compliance alert accuracy | ≥99% — no missed deadlines for registered workers |
| AC-03 | Subsidy match accuracy | ≥95% (verified by expert review panel) |
| AC-04 | Document generation quality | 100% of templates approved by licensed 行政書士 |
| AC-05 | Regulatory alert latency | New rules surfaced within 48 hours |
| AC-06 | Platform uptime | ≥99.5% |
| AC-07 | Data security | ISO 27001 certification or equivalent within 12 months |
| AC-08 | Mobile accessibility | Fully functional on mobile web; LINE bot operational |

### Business-Level

| ID | Criterion | Target |
|----|-----------|--------|
| AC-09 | Time to value | User receives first actionable alert within 24 hours of onboarding |
| AC-10 | Subsidy secured (per user, Year 1) | Average ¥200K+ in subsidies secured per active business |
| AC-11 | Expert partner satisfaction | ≥4.0/5.0 rating from partner professionals |
| AC-12 | Ward partnership | At least 1 Tokyo ward pilot within 6 months |

---

## 10. Goal / Success Metrics

### North Star Metric

**Subsidy dollars secured per active business per month.**

This metric captures:
- Compliance accuracy (can't get subsidies if compliance is broken)
- User engagement (must apply to get subsidies)
- Platform value (direct financial return to user)

### Primary KPIs (V1)

| Metric | Target (6 months) | Target (12 months) |
|--------|-------------------|-------------------|
| Registered businesses | 200 | 1,000 |
| Active businesses (monthly login) | 120 (60%) | 600 (60%) |
| Workers managed on platform | 800 | 5,000 |
| Compliance alerts delivered | 2,000 | 15,000 |
| Subsidy applications facilitated | 50 | 400 |
| Subsidy dollars secured | ¥10M | ¥80M |
| MRR (Monthly Recurring Revenue) | ¥1.5M | ¥8M |
| Partner professionals onboarded | 10 | 50 |

### Secondary KPIs

| Metric | Target |
|--------|--------|
| Onboarding completion rate | ≥70% |
| Time to first actionable insight | <24 hours |
| NPS (Net Promoter Score) | ≥40 |
| Churn rate (monthly) | <5% |
| Regulatory alert false positive rate | <5% |
| Document generation satisfaction | ≥4.5/5 |

### Leading Indicators (Weekly Tracking)

- Signups per week
- Onboarding completion rate
- Workers registered per business (depth of adoption)
- Subsidy matches viewed (engagement with P0 feature)
- Expert consultation requests

---

## 11. Scope

### In Scope (V1 — MVP)

- ✅ Business profile onboarding (web + mobile)
- ✅ Foreign worker registry (manual input + OCR from 在留カード)
- ✅ Compliance deadline tracking with alerts (LINE + email + in-app)
- ✅ Subsidy eligibility matching engine (national + Tokyo Metro + Nakano-ku)
- ✅ Subsidy application pre-fill (PDF generation)
- ✅ Regulatory change monitoring and personalized alerts
- ✅ Multilingual document generation (JP + VN + CN + EN + Nepali)
- ✅ やさしい日本語 document variants
- ✅ LINE bot integration for notifications
- ✅ Dashboard for business owners
- ✅ Expert partner directory (basic listing, no in-platform transactions in V1)

### Out of Scope (V1)

- ❌ Visa application submission (legal work — must remain with licensed professionals)
- ❌ Direct subsidy application submission (platform generates forms; business submits)
- ❌ Worker-facing features (employee portal is Phase 2)
- ❌ 監理団体 / 登録支援機関 management tools (crowded market)
- ❌ 技能実習 → 育成就労 migration module (Phase 3, timing-dependent)
- ❌ Multi-ward expansion beyond Nakano (Phase 2)
- ❌ National expansion beyond Kanto (Phase 3)
- ❌ Housing / banking / healthcare navigation for workers (too broad for V1)
- ❌ In-platform payments / transactions (Phase 2)

### Technical Scope Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Platform | Web (React/Next.js) + LINE bot | SMBs are LINE-native; web for complex tasks |
| Language | Japanese (primary), English (secondary) | Target users are Japanese SMBs |
| Data residency | Japan-only | Immigration data is sensitive; no overseas storage |
| AI/LLM | GPT-4 class for document generation; rule engine for subsidy matching | LLM for natural language tasks; deterministic rules for compliance |
| OCR | In-house or API (e.g., Google Vision) | 在留カード has standard format |
| Authentication | Email + LINE login | Reduce friction for SMB users |

---

## 12. Regulatory Timeline & Opportunity Window

```
2026
│
├── NOW ──── Product development (Months 1-4)
│            Capture early adopters among proactive businesses
│            Build subsidy database while programs are stable
│
├── Jul 2026 ─── 国保・年金 linkage guidelines finalized
│               → Wave of businesses needing compliance help
│
├── Oct 2026 ─── V1 launch + Nakano-ku pilot
│               → Partner with ward office for distribution
│
├── Dec 2026 ─── 育成就労 detailed rules published
│               → Build Phase 3 module based on final specs
│
2027
│
├── Apr 2027 ─── 育成就労制度 GOES LIVE (replaces 技能実習)
│               → ~330K workers need new compliance framework
│               → Massive demand spike
│
├── Mid 2027 ─── Health insurance/pension linkage operational
│               → 4M+ foreign residents affected
│               → Compliance monitoring becomes mandatory survival tool
│
├── End 2027 ─── Expand to Osaka, Aichi
│
2028
│
├── National expansion
├── JESTA implementation drives employer awareness
```

**Critical insight:** The 12 months between now and April 2027 is the **primary window**. Build the platform, capture early users during the "calm before the storm," and be the default when both 育成就労 and health insurance linkage hit simultaneously.

---

## 13. Revenue Model

### Tier 1: Free (Lead Generation)

- Compliance deadline tracking for up to 3 workers
- Basic subsidy matches (list only, no pre-fill)
- Regulatory alerts (general, not personalized)
- **Purpose:** Acquisition funnel. Convert to paid via value demonstration.

### Tier 2: Standard — ¥5,000/month

- Unlimited workers
- Full subsidy matching with application pre-fill
- Personalized regulatory alerts
- Multilingual document generation (5 docs/month)
- Email + LINE alerts
- **Purpose:** Core SMB subscription.

### Tier 3: Professional — ¥15,000/month

- Everything in Standard
- Unlimited document generation
- Priority expert matching
- Compliance audit report (quarterly)
- API access for accounting software integration
- White-label options for 行政書士 practices
- **Purpose:** Professional services and growing businesses.

### Tier 4: Enterprise / Municipality — Custom Pricing

- Multi-location management
- Ward-level analytics dashboard
- Custom subsidy database integration
- Dedicated account management
- **Purpose:** Government partnerships and large employers.

### Success Fee (All Tiers)

- 10% of secured subsidy value (capped at ¥100K per subsidy)
- Charged only when business receives subsidy payment
- **Purpose:** Align incentives; validate platform value directly.

### Revenue Projections (Conservative)

| Period | Subscribers (Paid) | MRR | Success Fees (Cumulative) | Total Revenue |
|--------|--------------------|-----|---------------------------|---------------|
| Month 6 | 120 | ¥600K | ¥3M | ¥6.6M |
| Month 12 | 600 | ¥3M | ¥16M | ¥52M |
| Month 18 | 1,500 | ¥7.5M | ¥45M | ¥135M |
| Month 24 | 3,000 | ¥15M | ¥100M | ¥310M |

*Assumes: 60% of Standard tier; 30% Professional; 10% Enterprise. Average success fee per business ¥30K/year. Ward partnerships bring bulk subscribers at discounted rates.*

---

## 14. Go-to-Market Strategy

### Channel 1: Ward Office Partnerships (B2G2B)

**Strategy:** Partner with Nakano-ku (then other wards) to offer the platform as a "digital extension" of their foreign resident support infrastructure.

**Why it works:**
- Wards have mandate (多文化共生推進基本方針) but no budget for tools
- Ward endorsement = instant credibility with local businesses
- ANIC and ward offices already have distribution channels (life guidebook, consultation counter, seminars)
- Ward gets KPIs for free; you get users at near-zero CAC

**Approach:**
1. Build V1 MVP
2. Demo to Nakano-ku 文化振興・多文化共生推進課
3. Propose pilot: free platform for 100 ward-referred businesses
4. Measure: compliance rates, subsidy uptake, satisfaction
5. Use data to expand to other Tokyo wards

### Channel 2: 行政書士 / 社労士 Partner Network

**Strategy:** Professional partners resell the platform to their clients.

**Why it works:**
- Each 行政書士 has 50-200 SMB clients
- They save time on discovery/admin; can focus on billable advisory
- White-label option lets them brand it as their own service
- They become advocates and on-ramps

**Approach:**
1. Identify 20 Tokyo-based 行政書士 who specialize in foreign worker cases
2. Offer free Professional tier for 3 months in exchange for client referrals
3. Build referral tracking and revenue share (20% of subscription for first year)

### Channel 3: Hello Work / Nav Center Integration

**Strategy:** List the platform on existing government referral channels.

**Approach:**
1. Register with 東京外国人材採用ナビセンター as a recommended tool
2. Attend and present at their regular seminars
3. Build relationship with MHLW 外国人雇用管理アドバイザー network

### Channel 4: Direct Digital Acquisition

**Strategy:** Content marketing + LINE ads targeting SMB owners in high-foreign-resident wards.

**Approach:**
1. SEO content: "外国人雇用 助成金 中野区" etc.
2. LINE ads geo-targeted to Nakano, Shinjuku, Adachi
3. Webinars on regulatory changes (2027 preparation series)

---

## 15. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Government changes subsidy rules frequently | HIGH | MEDIUM | Modular rule engine; weekly database updates; partner with 行政書士 for review |
| Businesses distrust automated compliance advice | MEDIUM | HIGH | Expert review badge; partnership with licensed professionals; free trial reduces risk |
| Competitor copies subsidy matching feature | MEDIUM | HIGH | First-mover on subsidy database; regulatory knowledge compounds over time; network effects from ward partnerships |
| Data breach / immigration data leak | LOW | CRITICAL | Japan-only hosting; ISO 27001; minimal PII (no passport copies, no full 在留カード data — only expiry + type) |
| Ward pilot fails (no uptake) | MEDIUM | MEDIUM | Parallel GTM channels (professional partners, digital); don't depend on single channel |
| LLM-generated documents contain legal errors | MEDIUM | HIGH | Human review layer for all generated documents; disclaimer; 行政書士 partnership for approval |
| 育成就労 rules delayed or change significantly | MEDIUM | MEDIUM | Phase-gated development; don't build module until rules are finalized |
| Platform becomes too broad (scope creep) | HIGH | MEDIUM | Strict MVP definition; explicit out-of-scope list; quarterly scope review |

---

## 16. Citations & References

### Government Sources

| # | Source | URL | Relevance |
|---|--------|-----|-----------|
| G1 | 外国人の受入れ・秩序ある共生のための関係閣僚会議 | <https://www.cas.go.jp/jp/seisakukaigi/gaikokujinzai/index.html> | National policy framework (Jan 2026) |
| G2 | 政府の基本方針 (PDF) | <https://www.cas.go.jp/jp/seisakukaigi/gaikokujinzai/pdf/government_position.pdf> | Government position paper |
| G3 | 外国人雇用管理アドバイザー制度 (MHLW) | <https://www.mhlw.go.jp/www2/topics/seido/anteikyoku/koyoukanri/index.htm> | National advisory service |
| G4 | 人材確保等支援助成金 (MHLW) | <https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyufukin/gaikokujin.html> | Key subsidy program |
| G5 | 東京外国人材採用ナビセンター | <https://tir-navicenter.metro.tokyo.lg.jp/> | Tokyo Metro support center |
| G6 | 中小企業外国人研修助成金 (Tokyo Metro) | <https://www.hataraku.metro.tokyo.lg.jp/jinzai/kakuho/gaikokujinkenshu/> | Tokyo Metro subsidy |
| G7 | 中小企業の外国人材受入支援事業 (Tokyo Metro) | <https://www.hataraku.metro.tokyo.lg.jp/jinzai/kakuho/gaikoku/> | Comprehensive Tokyo Metro program |
| G8 | 中野区 人口統計 (2025) | <https://www.city.tokyo-nakano.lg.jp/kusei/toukei-cyousa/jinkou/jinkou/jinkou2025.html> | Ward demographic data |
| G9 | 中野区 外国人生活ガイドブック | <https://www.city.tokyo-nakano.lg.jp/kurashi/gaikoku/seikatsuguidebook.html> | Existing ward support |
| G10 | 中野区国際交流協会 (ANIC) | <https://www.anic.jp/activity/support/> | Ward-level support org |
| G11 | 中野区多文化共生推進基本方針（案） | <https://kugikai-nakano.jp/shiryou/233816513.pdf> | Ward policy draft (2023) |
| G12 | 外国人雇用状況 届出状況まとめ (MHLW) | <https://www.mhlw.go.jp/content/11655000/001389442.pdf> | National statistics (342K businesses) |
| G13 | 育成就労制度 (JITCO) | <https://www.jitco.or.jp/esd/> | 2027制度 replacement details |
| G14 | 特定技能制度 (出入国在留管理庁) | <https://www.moj.go.jp/isa/applications/ssw/index.html> | SSW visa framework |
| G15 | 外国人との共生社会ロードマップ (出入国在留管理庁) | <https://www.moj.go.jp/isa/support/coexistence/04_00033.html> | National coexistence roadmap |
| G16 | 2026年入管制度変更まとめ (行政書士解説) | <https://hamaoka-gyousei.com/blog/category7/entry97.html> | Consolidated regulatory changes |
| G17 | 外国人の受入・共生のための総合的対応策 (経団連提言) | (Keidanren, Dec 2025) | Business community policy input |

### Competitive Intelligence Sources

| # | Source | URL | Relevance |
|---|--------|-----|-----------|
| C1 | 外国人材管理ツール12選 (ASPIC, Dec 2025) | <https://www.aspicjapan.org/asu/article/29079> | Comprehensive competitor comparison |
| C2 | noborder 6選比較 (Jun 2024) | <https://noborder.cloud/nortification/release0007.html> | Competitor feature comparison |
| C3 | カミナシ 教育プレスリリース (Jan 2025) | <https://corp.kaminashi.jp/news/pr_20250106_3> | Training competitor |
| C4 | Nikkei: 外国人就労 スタートアップ支援 (Feb 2025) | <https://www.nikkei.com/article/DGXZQOUC233S50T21C24A2000000/> | Market trend article |
| C5 | 外国人雇用助成金一覧 (Edenred, Dec 2025) | <https://edenred.jp/article/hr-recruiting/212/> | Subsidy landscape overview |
| C6 | 2026年外国人雇用助成金 (MoneyForward, Mar 2026) | <https://biz.moneyforward.com/payroll/basic/86889/> | Current subsidy details |

### Key Market Data Points

| # | Data Point | Value | Source |
|---|-----------|-------|--------|
| D1 | Foreign workers in Japan | 2,570,000 (Oct 2025) | MHLW |
| D2 | Businesses employing foreign workers | 342,087 (Oct 2024) | MHLW [G12] |
| D3 | Foreign residents (national) | 4,125,395 (end 2025) | Immigration Services Agency |
| D4 | Nakano-ku foreign residents | 27,257 (Dec 2025) | Nakano-ku [G8] |
| D5 | Nakano-ku total population | 344,153 (Dec 2025) | Nakano-ku [G8] |
| D6 | 特定技能 受入れ見込み数 | 1,230,000 (raised Jan 2026) | MHLW |
| D7 | 技能実習 workers (to be replaced by 育成就労) | ~330,000 | JITCO [G13] |
| D8 | Existing management SaaS tools | 12+ identified | ASPIC [C1] |

---

## Appendix A: Glossary

| Term | English | Definition |
|------|---------|------------|
| 特定技能 | Specified Skilled Worker | Visa category for semi-skilled workers in 16 designated industries |
| 技能実習 | Technical Intern Training | Work training program being replaced by 育成就労 in 2027 |
| 育成就労 | Developmental Work | New system replacing 技能実習 from April 2027 |
| 登録支援機関 | Registered Support Organization | Licensed orgs providing support to 特定技能 workers |
| 監理団体 | Supervising Organization | Non-profit orgs managing 技能実習 programs |
| 行政書士 | Administrative Scrivener | Licensed professional for government document preparation |
| 社労士 | Labor and Social Security Attorney | Licensed professional for labor/insurance matters |
| 在留カード | Residence Card | ID card for foreign residents in Japan |
| やさしい日本語 | Easy Japanese | Simplified Japanese using basic vocabulary and grammar |
| 多文化共生 | Multicultural Coexistence | Policy framework for integrating foreign residents |
| 人材確保等支援助成金 | Workforce Security Subsidy | Key MHLW subsidy for foreign worker employment support |

---

## Appendix B: Decision Log

| Date | Decision | Rationale | Status |
|------|----------|-----------|--------|
| 2026-04-20 | Initial PRD created | Based on #biz-ideas research | Draft |
| - | Product name TBD | - | Open |
| - | Tech stack TBD | Awaiting engineering assessment | Open |
| - | Legal structure TBD (Japan KK vs GK) | Awaiting business model validation | Open |

---

*Document generated by Kinokomon. Last updated: 2026-04-20.*
