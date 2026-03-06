import { useState, useMemo } from 'preact/hooks';

interface BountyItem {
  slug: string;
  title: string;
  description: string;
  replaces: string;
  status: string;
  difficulty: string;
  reward: number;
  annual_cost: number;
  seats: number;
  requirements: string[];
  deadline?: string;
  claimed_by?: string;
  tags: string[];
}

interface Props {
  bounties: BountyItem[];
}

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  easy: { label: 'Easy', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  moderate: { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  hard: { label: 'Hard', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  extreme: { label: 'Extreme', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: 'Open', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  claimed: { label: 'Claimed', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  'in-progress': { label: 'In Progress', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  delivered: { label: 'Delivered', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  verified: { label: 'Verified', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
};

type SortBy = 'reward' | 'cost' | 'deadline' | 'difficulty';
type FilterStatus = 'all' | 'open' | 'active' | 'completed';

function daysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

const DIFFICULTY_ORDER = { easy: 1, moderate: 2, hard: 3, extreme: 4 };

export default function BountyFilter({ bounties }: Props) {
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('reward');

  const filtered = useMemo(() => {
    let result = bounties;

    // Text search
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.replaces.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Status filter
    if (filterStatus === 'open') {
      result = result.filter(b => b.status === 'open');
    } else if (filterStatus === 'active') {
      result = result.filter(b => b.status === 'claimed' || b.status === 'in-progress');
    } else if (filterStatus === 'completed') {
      result = result.filter(b => b.status === 'delivered' || b.status === 'verified');
    }

    // Difficulty filter
    if (filterDifficulty !== 'all') {
      result = result.filter(b => b.difficulty === filterDifficulty);
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'reward': return b.reward - a.reward;
        case 'cost': return b.annual_cost - a.annual_cost;
        case 'deadline': {
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        case 'difficulty':
          return (DIFFICULTY_ORDER[b.difficulty as keyof typeof DIFFICULTY_ORDER] || 0) -
                 (DIFFICULTY_ORDER[a.difficulty as keyof typeof DIFFICULTY_ORDER] || 0);
        default: return 0;
      }
    });

    return result;
  }, [bounties, query, filterStatus, filterDifficulty, sortBy]);

  return (
    <div>
      {/* Filters */}
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <div class="flex-1">
          <input
            type="text"
            placeholder="Search bounties..."
            value={query}
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus((e.target as HTMLSelectElement).value as FilterStatus)}
          class="px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-amber-500/50"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="active">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty((e.target as HTMLSelectElement).value)}
          class="px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-amber-500/50"
        >
          <option value="all">All Difficulty</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
          <option value="extreme">Extreme</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy((e.target as HTMLSelectElement).value as SortBy)}
          class="px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-amber-500/50"
        >
          <option value="reward">Sort: Reward</option>
          <option value="cost">Sort: Enterprise Cost</option>
          <option value="deadline">Sort: Deadline</option>
          <option value="difficulty">Sort: Difficulty</option>
        </select>
      </div>

      {/* Results count */}
      <p class="text-sm text-gray-500 mb-4">{filtered.length} bounties found</p>

      {/* Bounty List */}
      <div class="space-y-4">
        {filtered.map(bounty => {
          const diff = DIFFICULTY_CONFIG[bounty.difficulty] || DIFFICULTY_CONFIG.moderate;
          const stat = STATUS_CONFIG[bounty.status] || STATUS_CONFIG.open;
          const deadlineDays = bounty.deadline ? daysUntil(bounty.deadline) : null;

          return (
            <a
              key={bounty.slug}
              href={`/bounties/${bounty.slug}`}
              class={`group block bg-gray-900 border rounded-xl p-6 transition-all ${
                bounty.status === 'open'
                  ? 'border-gray-800 hover:border-amber-500/30'
                  : bounty.status === 'claimed' || bounty.status === 'in-progress'
                  ? 'border-gray-800 hover:border-yellow-500/30'
                  : 'border-gray-800 hover:border-green-500/30'
              }`}
            >
              <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <h3 class="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                      {bounty.title}
                    </h3>
                    <span class={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${stat.color} ${stat.bg}`}>
                      {stat.label}
                    </span>
                    <span class={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${diff.color} ${diff.bg}`}>
                      {diff.label}
                    </span>
                  </div>
                  <p class="text-sm text-gray-400 mb-3 line-clamp-1">{bounty.description}</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="text-xs text-gray-500 bg-gray-800 rounded-full px-2 py-0.5">Replaces {bounty.replaces}</span>
                    <span class="text-xs text-gray-500 bg-gray-800 rounded-full px-2 py-0.5">{bounty.seats} seats</span>
                    <span class="text-xs text-gray-500 bg-gray-800 rounded-full px-2 py-0.5">{bounty.requirements.length} requirements</span>
                    {bounty.claimed_by && (
                      <span class="text-xs text-yellow-400 bg-yellow-500/10 rounded-full px-2 py-0.5">
                        Hunter: {bounty.claimed_by}
                      </span>
                    )}
                    {deadlineDays !== null && deadlineDays > 0 && (
                      <span class={`text-xs rounded-full px-2 py-0.5 ${
                        deadlineDays < 14
                          ? 'text-red-400 bg-red-500/10'
                          : deadlineDays < 30
                          ? 'text-yellow-400 bg-yellow-500/10'
                          : 'text-gray-500 bg-gray-800'
                      }`}>
                        {deadlineDays}d left
                      </span>
                    )}
                  </div>
                </div>
                <div class="flex items-center gap-6 shrink-0">
                  <div class="text-center">
                    <p class="text-xs text-gray-500">Reward</p>
                    <p class="text-xl font-bold text-amber-400">${bounty.reward.toLocaleString()}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-xs text-gray-500">Cost/yr</p>
                    <p class="text-xl font-bold text-red-400">${bounty.annual_cost.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div class="text-center py-12">
          <p class="text-gray-400 text-lg">No bounties match your filters.</p>
          <button
            onClick={() => { setQuery(''); setFilterStatus('all'); setFilterDifficulty('all'); }}
            class="mt-3 text-amber-400 hover:text-amber-300 text-sm transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
