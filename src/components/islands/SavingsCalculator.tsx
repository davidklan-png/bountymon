import { useState, useMemo } from 'preact/hooks';

interface Tool {
  name: string;
  category: string;
  costPerSeat: number;
  alternative: string;
}

const TOOLS: Tool[] = [
  { name: 'Jira', category: 'Project Management', costPerSeat: 100, alternative: 'Self-hosted tracker' },
  { name: 'Linear', category: 'Project Management', costPerSeat: 96, alternative: 'Linear Clone' },
  { name: 'Asana Business', category: 'Project Management', costPerSeat: 300, alternative: 'Open PM tool' },
  { name: 'Salesforce', category: 'CRM', costPerSeat: 300, alternative: 'Open CRM' },
  { name: 'HubSpot', category: 'CRM', costPerSeat: 216, alternative: 'Open CRM' },
  { name: 'Slack', category: 'Communication', costPerSeat: 102, alternative: 'Mattermost' },
  { name: 'Microsoft Teams', category: 'Communication', costPerSeat: 144, alternative: 'Rocket.Chat' },
  { name: 'Google Analytics 360', category: 'Analytics', costPerSeat: 1800, alternative: 'Plausible' },
  { name: 'Mixpanel', category: 'Analytics', costPerSeat: 300, alternative: 'PostHog' },
  { name: 'Datadog', category: 'Monitoring', costPerSeat: 276, alternative: 'SigNoz' },
  { name: 'Figma', category: 'Design', costPerSeat: 180, alternative: 'Penpot' },
  { name: 'Notion', category: 'Knowledge Base', costPerSeat: 120, alternative: 'Self-hosted wiki' },
  { name: 'Confluence', category: 'Knowledge Base', costPerSeat: 66, alternative: 'BookStack' },
  { name: 'Dropbox Business', category: 'Cloud Storage', costPerSeat: 180, alternative: 'Nextcloud' },
  { name: 'GitHub Enterprise', category: 'Version Control', costPerSeat: 252, alternative: 'Gitea' },
  { name: 'GitLab Ultimate', category: 'Version Control', costPerSeat: 1188, alternative: 'Gitea' },
  { name: 'ChatGPT Enterprise', category: 'AI Tools', costPerSeat: 720, alternative: 'OpenClaw' },
  { name: 'GitHub Copilot', category: 'AI Tools', costPerSeat: 228, alternative: 'Self-hosted Copilot' },
];

export default function SavingsCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [seats, setSeats] = useState(10);

  const categories = useMemo(() => {
    const cats = new Map<string, Tool[]>();
    for (const tool of TOOLS) {
      if (!cats.has(tool.category)) cats.set(tool.category, []);
      cats.get(tool.category)!.push(tool);
    }
    return cats;
  }, []);

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const totalAnnual = useMemo(() => {
    return TOOLS
      .filter(t => selected.has(t.name))
      .reduce((sum, t) => sum + t.costPerSeat * seats, 0);
  }, [selected, seats]);

  const totalMonthly = Math.round(totalAnnual / 12);
  const fiveYearSavings = totalAnnual * 5;

  const copyReport = () => {
    const lines = [
      `Bountymon Savings Report`,
      `========================`,
      `Team size: ${seats} seats`,
      ``,
      `Selected tools:`,
      ...TOOLS
        .filter(t => selected.has(t.name))
        .map(t => `  - ${t.name}: $${(t.costPerSeat * seats).toLocaleString()}/yr (replace with ${t.alternative})`),
      ``,
      `Annual savings: $${totalAnnual.toLocaleString()}`,
      `Monthly savings: $${totalMonthly.toLocaleString()}`,
      `5-year savings: $${fiveYearSavings.toLocaleString()}`,
      ``,
      `Generated at bountymon.com`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
  };

  return (
    <div class="space-y-8">
      {/* Seats input */}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <label class="block text-white font-semibold mb-3">
          How many seats/users does your team have?
        </label>
        <div class="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="500"
            value={seats}
            onInput={(e) => setSeats(parseInt((e.target as HTMLInputElement).value))}
            class="flex-1 accent-green-500"
          />
          <input
            type="number"
            min="1"
            max="10000"
            value={seats}
            onInput={(e) => setSeats(Math.max(1, parseInt((e.target as HTMLInputElement).value) || 1))}
            class="w-20 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-center"
          />
        </div>
      </div>

      {/* Tool selection */}
      <div class="space-y-6">
        {Array.from(categories.entries()).map(([category, tools]) => (
          <div key={category}>
            <h3 class="text-lg font-semibold text-white mb-3">{category}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tools.map(tool => (
                <button
                  key={tool.name}
                  onClick={() => toggle(tool.name)}
                  class={`text-left p-4 rounded-xl border transition-all ${
                    selected.has(tool.name)
                      ? 'bg-green-500/10 border-green-500/30 ring-1 ring-green-500/20'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-white">{tool.name}</span>
                    <div class={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selected.has(tool.name)
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-600'
                    }`}>
                      {selected.has(tool.name) && (
                        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p class="text-sm text-red-400 font-medium">${tool.costPerSeat}/seat/yr</p>
                  <p class="text-xs text-gray-500 mt-0.5">Replace with {tool.alternative}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      {selected.size > 0 && (
        <div class="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 sm:p-8 sticky bottom-4">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div class="grid grid-cols-3 gap-6 flex-1">
              <div>
                <p class="text-xs text-gray-400">Monthly savings</p>
                <p class="text-2xl font-bold text-white">${totalMonthly.toLocaleString()}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400">Annual savings</p>
                <p class="text-2xl font-bold text-green-400">${totalAnnual.toLocaleString()}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400">5-year savings</p>
                <p class="text-2xl font-bold text-emerald-400">${fiveYearSavings.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={copyReport}
              class="px-4 py-2 bg-green-500 hover:bg-green-400 text-gray-950 font-semibold rounded-lg transition-colors text-sm shrink-0"
            >
              Copy Report
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-4">
            {selected.size} tool{selected.size !== 1 ? 's' : ''} selected &middot; {seats} seats &middot; Self-hosting costs not included
          </p>
        </div>
      )}
    </div>
  );
}
