import { useState } from 'preact/hooks';

interface Milestone {
  label: string;
  done: boolean;
  date?: string;
}

interface BountyData {
  title: string;
  slug: string;
  status: string;
  reward: number;
  replaces: string;
  difficulty: string;
  posted_date: string;
  deadline?: string;
  claimed_by?: string;
  claimed_date?: string;
  hunter_url?: string;
  hunter_contact?: string;
  delivery_date?: string;
  verified_date?: string;
  requirements: string[];
  milestones: Milestone[];
  discussion_url?: string;
  repoBase: string;
}

type Tab = 'overview' | 'claim' | 'submit' | 'progress';

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  easy: { label: 'Easy', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  moderate: { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  hard: { label: 'Hard', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  extreme: { label: 'Extreme', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

const STATUS_STEPS = ['open', 'claimed', 'in-progress', 'delivered', 'verified'] as const;

const STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  claimed: 'Claimed',
  'in-progress': 'In Progress',
  delivered: 'Delivered',
  verified: 'Verified',
};

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function buildClaimIssueUrl(bounty: BountyData): string {
  const title = encodeURIComponent(`[Claim] ${bounty.title}`);
  const body = encodeURIComponent(
`## Bounty Claim

**Bounty:** ${bounty.title}
**Replaces:** ${bounty.replaces}
**Reward:** $${bounty.reward.toLocaleString()}

### About me / my team
<!-- Tell us about your background and why you're suited for this bounty -->

### Approach
<!-- How do you plan to build this? What stack/architecture? -->

### Timeline
<!-- Rough timeline with milestones -->

### Project URL
<!-- Link to your repo/project (can be empty at claim time, update later) -->
`
  );
  return `${bounty.repoBase}/issues/new?title=${title}&body=${body}&labels=bounty-claim`;
}

function buildSubmitIssueUrl(bounty: BountyData): string {
  const title = encodeURIComponent(`[Delivery] ${bounty.title}`);
  const reqs = bounty.requirements.map((r, i) => `- [x] ${r}`).join('\n');
  const body = encodeURIComponent(
`## Bounty Delivery

**Bounty:** ${bounty.title}
**Replaces:** ${bounty.replaces}
**Reward:** $${bounty.reward.toLocaleString()}

### Project URL
<!-- Link to the live/deployable project -->

### Requirements Checklist
${reqs}

### Demo / Screenshots
<!-- Screenshots, video, or link to a live demo -->

### Deployment Instructions
<!-- How to self-host this in under 10 minutes -->

### Notes
<!-- Anything else the reviewer should know -->
`
  );
  return `${bounty.repoBase}/issues/new?title=${title}&body=${body}&labels=bounty-delivery`;
}

function buildPostBountyIssueUrl(repoBase: string): string {
  const title = encodeURIComponent(`[New Bounty] Replace <software name>`);
  const body = encodeURIComponent(
`## New Bounty Proposal

### What enterprise software should be replaced?
<!-- Name and URL of the software -->

### Why?
<!-- What's wrong with the current option? Cost, lock-in, complexity? -->

### Annual cost
<!-- Per-seat cost × number of seats -->

### Proposed reward
<!-- What are you willing to put up? -->

### Requirements
<!-- List the must-have features for the replacement -->
-
-
-

### Difficulty estimate
<!-- easy / moderate / hard / extreme -->

### Deadline suggestion
<!-- When should this be done by? -->
`
  );
  return `${repoBase}/issues/new?title=${title}&body=${body}&labels=new-bounty`;
}

export default function BountyActions({ ...bounty }: BountyData) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const diff = DIFFICULTY_CONFIG[bounty.difficulty] || DIFFICULTY_CONFIG.moderate;
  const currentStepIndex = STATUS_STEPS.indexOf(bounty.status as typeof STATUS_STEPS[number]);
  const deadlineDays = bounty.deadline ? daysUntil(bounty.deadline) : null;
  const milestonesDone = bounty.milestones.filter(m => m.done).length;
  const milestonesTotal = bounty.milestones.length;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'claim', label: 'Claim This', show: bounty.status === 'open' },
    { id: 'submit', label: 'Submit Delivery', show: bounty.status === 'claimed' || bounty.status === 'in-progress' },
    { id: 'progress', label: 'Progress', show: bounty.milestones.length > 0 },
  ];

  const visibleTabs = tabs.filter(t => t.show);

  return (
    <div class="space-y-6">
      {/* Lifecycle Progress Bar */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 class="text-sm font-medium text-gray-400 mb-4">Bounty Lifecycle</h3>
        <div class="flex items-center gap-0">
          {STATUS_STEPS.map((step, i) => {
            const isCompleted = i <= currentStepIndex;
            const isCurrent = i === currentStepIndex;
            return (
              <div key={step} class="flex items-center flex-1">
                <div class="flex flex-col items-center flex-1">
                  <div
                    class={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      isCurrent
                        ? 'bg-amber-500 border-amber-400 text-gray-950'
                        : isCompleted
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-gray-800 border-gray-700 text-gray-500'
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span class={`text-xs mt-2 ${isCurrent ? 'text-amber-400 font-medium' : isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
                    {STATUS_LABELS[step]}
                  </span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div class={`h-0.5 flex-1 -mt-5 ${i < currentStepIndex ? 'bg-green-500' : 'bg-gray-700'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Info Bar */}
      <div class="flex flex-wrap gap-3">
        <span class={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${diff.color} ${diff.bg}`}>
          {diff.label}
        </span>
        {bounty.deadline && (
          <span class={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${
            deadlineDays !== null && deadlineDays < 14
              ? 'text-red-400 bg-red-500/10 border-red-500/20'
              : deadlineDays !== null && deadlineDays < 30
              ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
              : 'text-gray-400 bg-gray-800 border-gray-700'
          }`}>
            {deadlineDays !== null && deadlineDays > 0
              ? `${deadlineDays} days left`
              : deadlineDays !== null && deadlineDays === 0
              ? 'Due today'
              : 'Deadline passed'}
          </span>
        )}
        {milestonesTotal > 0 && (
          <span class="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-blue-400 bg-blue-500/10 border-blue-500/20">
            {milestonesDone}/{milestonesTotal} milestones
          </span>
        )}
        {bounty.discussion_url && (
          <a
            href={bounty.discussion_url}
            target="_blank"
            rel="noopener"
            class="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20 transition-colors"
          >
            Discussion &rarr;
          </a>
        )}
      </div>

      {/* Tab Navigation */}
      <div class="border-b border-gray-800">
        <nav class="flex gap-0" role="tablist">
          {visibleTabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              class={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div class="min-h-[200px]">
        {activeTab === 'overview' && (
          <div class="space-y-6">
            {/* Timeline */}
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 class="text-sm font-medium text-gray-400 mb-4">Timeline</h3>
              <div class="space-y-3">
                <TimelineRow label="Posted" date={bounty.posted_date} by={bounty.posted_by} />
                {bounty.claimed_date && <TimelineRow label="Claimed" date={bounty.claimed_date} by={bounty.claimed_by} />}
                {bounty.delivery_date && <TimelineRow label="Delivered" date={bounty.delivery_date} by={bounty.claimed_by} />}
                {bounty.verified_date && <TimelineRow label="Verified" date={bounty.verified_date} />}
                {bounty.deadline && !bounty.verified_date && (
                  <TimelineRow label="Deadline" date={bounty.deadline} highlight={deadlineDays !== null && deadlineDays < 14} />
                )}
              </div>
            </div>

            {/* Hunter Card (if claimed) */}
            {bounty.claimed_by && (
              <div class="bg-gray-900 border border-yellow-500/20 rounded-xl p-6">
                <h3 class="text-sm font-medium text-gray-400 mb-3">
                  {bounty.status === 'verified' ? 'Bounty Collected By' : 'Hunter'}
                </h3>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-lg font-semibold text-yellow-400">{bounty.claimed_by}</p>
                    <div class="flex gap-3 mt-2">
                      {bounty.hunter_url && (
                        <a href={bounty.hunter_url} target="_blank" rel="noopener" class="text-sm text-gray-400 hover:text-white transition-colors">
                          View project &rarr;
                        </a>
                      )}
                      {bounty.hunter_contact && (
                        <a href={bounty.hunter_contact} target="_blank" rel="noopener" class="text-sm text-gray-400 hover:text-white transition-colors">
                          Contact &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                  {bounty.status === 'verified' && (
                    <div class="text-green-400 text-3xl" title="Bounty verified and collected">
                      <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div class="flex flex-wrap gap-3">
              {bounty.status === 'open' && (
                <button
                  onClick={() => setActiveTab('claim')}
                  class="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-lg transition-colors"
                >
                  Claim This Bounty
                </button>
              )}
              {(bounty.status === 'claimed' || bounty.status === 'in-progress') && bounty.claimed_by && (
                <button
                  onClick={() => setActiveTab('submit')}
                  class="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Submit Delivery
                </button>
              )}
              <button
                onClick={() => {
                  const url = `${window.location.origin}/bounties/${bounty.slug}`;
                  copyToClipboard(url, 'share');
                }}
                class="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-gray-700"
              >
                {copiedField === 'share' ? 'Copied!' : 'Share Bounty'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'claim' && bounty.status === 'open' && (
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-white mb-2">How to Claim</h3>
              <p class="text-gray-400 mb-4">Claiming a bounty means you're committing to build an open-source alternative. Here's the process:</p>
              <ol class="space-y-3 text-gray-300">
                <li class="flex gap-3">
                  <span class="bg-amber-500/20 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <span>Click "Claim on GitHub" below — this opens a pre-filled issue with your claim details.</span>
                </li>
                <li class="flex gap-3">
                  <span class="bg-amber-500/20 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <span>Fill in your approach, timeline, and project URL. Tell us why you're the right hunter.</span>
                </li>
                <li class="flex gap-3">
                  <span class="bg-amber-500/20 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <span>A maintainer reviews your claim and updates the bounty status. You'll get feedback within 48 hours.</span>
                </li>
                <li class="flex gap-3">
                  <span class="bg-amber-500/20 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <span>Start building! Update your progress in the GitHub issue thread.</span>
                </li>
              </ol>
            </div>

            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 class="text-sm font-medium text-gray-400 mb-3">Requirements to meet</h4>
              <ul class="space-y-2">
                {bounty.requirements.map((req, i) => (
                  <li key={i} class="flex items-start gap-3 text-gray-300">
                    <span class="text-gray-500 mt-0.5 shrink-0">&#9744;</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {bounty.deadline && (
              <p class="text-sm text-gray-400">
                Deadline: <span class="text-white font-medium">{formatDate(bounty.deadline)}</span>
                {deadlineDays !== null && deadlineDays > 0 && (
                  <span class="text-gray-500"> ({deadlineDays} days from now)</span>
                )}
              </p>
            )}

            <a
              href={buildClaimIssueUrl(bounty)}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Claim on GitHub
            </a>
          </div>
        )}

        {activeTab === 'submit' && (bounty.status === 'claimed' || bounty.status === 'in-progress') && (
          <div class="space-y-6">
            <div class="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/20 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-white mb-2">Submit Your Delivery</h3>
              <p class="text-gray-400 mb-4">Ready to collect? Here's what happens when you submit:</p>
              <ol class="space-y-3 text-gray-300">
                <li class="flex gap-3">
                  <span class="bg-green-500/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <span>Click "Submit on GitHub" — fills out a delivery issue with the requirements checklist.</span>
                </li>
                <li class="flex gap-3">
                  <span class="bg-green-500/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <span>Community + maintainers review your submission against the requirements.</span>
                </li>
                <li class="flex gap-3">
                  <span class="bg-green-500/20 text-green-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <span>If all requirements pass, the bounty is marked verified and the reward is yours.</span>
                </li>
              </ol>
            </div>

            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 class="text-sm font-medium text-gray-400 mb-3">Requirements checklist — make sure all are met</h4>
              <ul class="space-y-2">
                {bounty.requirements.map((req, i) => (
                  <li key={i} class="flex items-start gap-3 text-gray-300">
                    <span class="text-green-400 mt-0.5 shrink-0">&#9745;</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={buildSubmitIssueUrl(bounty)}
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Submit on GitHub
            </a>
          </div>
        )}

        {activeTab === 'progress' && bounty.milestones.length > 0 && (
          <div class="space-y-4">
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-medium text-gray-400">Milestones</h3>
                <span class="text-sm text-gray-500">{milestonesDone}/{milestonesTotal} complete</span>
              </div>
              {/* Progress bar */}
              <div class="w-full bg-gray-800 rounded-full h-2 mb-6">
                <div
                  class="bg-gradient-to-r from-amber-500 to-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${milestonesTotal > 0 ? (milestonesDone / milestonesTotal) * 100 : 0}%` }}
                />
              </div>
              <div class="space-y-3">
                {bounty.milestones.map((m, i) => (
                  <div key={i} class={`flex items-start gap-3 p-3 rounded-lg ${m.done ? 'bg-green-500/5' : 'bg-gray-800/50'}`}>
                    <span class={`mt-0.5 shrink-0 ${m.done ? 'text-green-400' : 'text-gray-600'}`}>
                      {m.done ? '\u2611' : '\u2610'}
                    </span>
                    <div class="flex-1">
                      <span class={m.done ? 'text-green-300' : 'text-gray-300'}>{m.label}</span>
                      {m.date && (
                        <span class="text-xs text-gray-500 ml-2">{formatDate(m.date)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineRow({ label, date, by, highlight }: { label: string; date: string; by?: string; highlight?: boolean }) {
  return (
    <div class="flex items-center gap-4">
      <div class={`w-2 h-2 rounded-full shrink-0 ${highlight ? 'bg-red-400' : 'bg-gray-600'}`} />
      <span class={`text-sm font-medium w-20 ${highlight ? 'text-red-400' : 'text-gray-400'}`}>{label}</span>
      <span class={`text-sm ${highlight ? 'text-red-300' : 'text-white'}`}>{formatDate(date)}</span>
      {by && <span class="text-sm text-gray-500">by {by}</span>}
    </div>
  );
}
