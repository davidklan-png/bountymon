import { useState, useMemo } from 'preact/hooks';

interface Category {
  name: string;
  slug: string;
  icon: string;
  altCount: number;
  totalSavings: number;
  avgEnterpriseCost: number;
  enterpriseExamples: string;
}

interface Props {
  categories: Category[];
}

export default function DirectoryFilter({ categories }: Props) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'savings' | 'name' | 'count'>('savings');

  const filtered = useMemo(() => {
    let result = categories;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.enterpriseExamples.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => {
      if (sortBy === 'savings') return b.totalSavings - a.totalSavings;
      if (sortBy === 'count') return b.altCount - a.altCount;
      return a.name.localeCompare(b.name);
    });
  }, [categories, query, sortBy]);

  return (
    <div>
      <div class="flex flex-col sm:flex-row gap-3 mb-8">
        <div class="flex-1 relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Filter categories..."
            value={query}
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            class="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-green-500/50 focus:outline-none transition-colors"
          />
        </div>
        <div class="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
          {([
            { key: 'savings', label: 'Savings' },
            { key: 'count', label: 'Count' },
            { key: 'name', label: 'A-Z' },
          ] as const).map(opt => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              class={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sortBy === opt.key
                  ? 'bg-green-500/10 text-green-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div class="col-span-full text-center py-12 text-gray-500">
            No categories match "{query}"
          </div>
        ) : (
          filtered.map(cat => (
            <a key={cat.slug} href={`/directory/${cat.slug}`} class="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/30 transition-all">
              <div class="flex items-start justify-between mb-4">
                <div class="text-3xl">{cat.icon}</div>
                {cat.altCount > 0 && (
                  <span class="text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
                    {cat.altCount} alt{cat.altCount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <h2 class="text-xl font-semibold text-white group-hover:text-green-400 transition-colors mb-2">{cat.name}</h2>
              <div class="border-t border-gray-800 pt-4 mt-4">
                <div class="flex justify-between text-sm">
                  <div>
                    <p class="text-gray-500">Avg. cost</p>
                    <p class="text-white font-semibold">${Math.round(cat.avgEnterpriseCost)}/seat/yr</p>
                  </div>
                  {cat.totalSavings > 0 && (
                    <div class="text-right">
                      <p class="text-gray-500">Savings</p>
                      <p class="text-green-400 font-semibold">${cat.totalSavings.toLocaleString()}/yr</p>
                    </div>
                  )}
                </div>
                <p class="text-xs text-gray-500 mt-3">{cat.enterpriseExamples}</p>
              </div>
            </a>
          ))
        )}
      </div>

      <p class="text-xs text-gray-500 text-center mt-6">
        {filtered.length} of {categories.length} categories shown
      </p>
    </div>
  );
}
