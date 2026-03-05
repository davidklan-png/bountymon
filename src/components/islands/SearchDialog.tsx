import { useState, useEffect, useRef, useMemo } from 'preact/hooks';

interface SearchItem {
  title: string;
  description: string;
  url: string;
  type: 'alternative' | 'bounty' | 'article' | 'category';
  tags?: string[];
}

interface Props {
  items: SearchItem[];
}

export default function SearchDialog({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    // Custom event so static trigger buttons elsewhere can open this single instance
    const onOpen = () => setOpen(true);

    document.addEventListener('keydown', onKey);
    document.addEventListener('bountymon:open-search', onOpen);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('bountymon:open-search', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8);
    const q = query.toLowerCase();
    return items
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags?.some(t => t.toLowerCase().includes(q))
      )
      .slice(0, 10);
  }, [query, items]);

  const typeLabels: Record<string, { label: string; color: string }> = {
    alternative: { label: 'Alt', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
    bounty: { label: 'Bounty', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    article: { label: 'Blog', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    category: { label: 'Category', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  };

  return (
    <>
      {/* Single trigger button — always rendered once */}
      <button
        onClick={() => setOpen(true)}
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 bg-gray-800/50 border border-gray-700 hover:border-gray-600 hover:text-white transition-colors"
        aria-label="Search (Ctrl+K)"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="hidden sm:inline">Search</span>
        <kbd class="hidden sm:inline-flex items-center text-xs text-gray-500 bg-gray-800 rounded px-1.5 py-0.5 border border-gray-700 ml-1">
          Ctrl K
        </kbd>
      </button>

      {/* Single dialog overlay — rendered once, shared across all viewports */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            class="relative w-full max-w-xl mx-4 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div class="flex items-center gap-3 px-4 border-b border-gray-800">
              <svg class="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search alternatives, bounties, articles..."
                value={query}
                onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
                class="flex-1 bg-transparent border-0 outline-none text-white placeholder-gray-500 py-4 text-base"
              />
              <button
                onClick={() => setOpen(false)}
                class="text-xs text-gray-500 bg-gray-800 rounded px-2 py-1 border border-gray-700 hover:text-white transition-colors"
                aria-label="Close search"
              >
                Esc
              </button>
            </div>

            <div class="max-h-[50vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <div class="px-4 py-8 text-center text-gray-500">
                  No results for "{query}"
                </div>
              ) : (
                results.map(item => {
                  const t = typeLabels[item.type];
                  return (
                    <a
                      key={item.url}
                      href={item.url}
                      class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 transition-colors group"
                    >
                      <span class={`text-[10px] font-medium rounded-full px-2 py-0.5 border shrink-0 ${t?.color || ''}`}>
                        {t?.label || item.type}
                      </span>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-white group-hover:text-green-400 transition-colors truncate">
                          {item.title}
                        </p>
                        <p class="text-xs text-gray-500 truncate">{item.description}</p>
                      </div>
                      <svg class="w-4 h-4 text-gray-600 group-hover:text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  );
                })
              )}
            </div>

            <div class="border-t border-gray-800 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
              <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
              <div class="flex items-center gap-2">
                <kbd class="bg-gray-800 rounded px-1.5 py-0.5 border border-gray-700">Enter</kbd>
                <span>to select</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
