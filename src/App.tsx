import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Users, Navigation, Zap, Cpu, Database } from 'lucide-react';

interface Country {
    name: { common: string };
    capital: string[];
    region: string;
    population: number;
    flags: { svg: string };
    cca3: string;
    area: number;
}

function App() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [filtered, setFiltered] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<Country | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string>('All');
    const [typedTitle, setTypedTitle] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    // Typing effect for title
    useEffect(() => {
        const title = 'WORLD ANALYZER';
        let i = 0;
        const timer = setInterval(() => {
            if (i <= title.length) {
                setTypedTitle(title.slice(0, i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100 + Math.random() * 50); // Randomized timing for human feel
        return () => clearInterval(timer);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlightedIndex(prev => Math.min(prev + 1, filtered.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlightedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter' && highlightedIndex >= 0) {
                e.preventDefault();
                setSelected(filtered[highlightedIndex]);
                setHighlightedIndex(-1);
            } else if (e.key === 'Escape') {
                setSelected(null);
                setHighlightedIndex(-1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [filtered, highlightedIndex]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {
                setCountries(res.data);
                setFiltered(res.data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let results = countries;

        // Filter by region
        if (selectedRegion !== 'All') {
            results = results.filter(c => c.region === selectedRegion);
        }

        // Filter by search
        if (search) {
            results = results.filter(c =>
                c.name.common.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFiltered(results.slice(0, 20));
    }, [search, countries, selectedRegion]);

    // Get unique regions
    const regions = ['All', ...Array.from(new Set(countries.map(c => c.region))).sort()];

    return (
        <div className="h-screen bg-[#020617] text-cyan-500 font-mono overflow-hidden flex flex-col relative">
            {/* Skip link for keyboard navigation */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <div className="scanline" />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b21a_1px,transparent_1px),linear-gradient(to_bottom,#0891b21a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Header */}
            <header className="p-6 border-b border-cyan-500/30 bg-black/40 backdrop-blur-md flex justify-between items-center z-50">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/50 rounded-lg animate-pulse">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-[0.2em] uppercase typing-cursor">
                            <span className="text-white">{typedTitle || 'WORLD ANALYZER'}</span>
                        </h1>
                        <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest leading-none">MK_OS-X // GEOPOLITICAL DATA UNIT</p>
                    </div>
                </div>

                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest hidden md:flex">
                    <div className="flex items-center gap-2"><Cpu className="w-3 h-3" /> SYSTEM: STABLE</div>
                    <div className="flex items-center gap-2"><Database className="w-3 h-3" /> DATA: {filtered.length}/{countries.length} ENTITIES</div>
                    {selectedRegion !== 'All' && (
                        <div className="flex items-center gap-2 text-cyan-400"><Zap className="w-3 h-3" /> REGION: {selectedRegion}</div>
                    )}
                </div>
            </header>

            <main id="main-content" className="flex-1 flex overflow-hidden">
                {/* Sidebar / List */}
                <div className="w-96 border-r border-cyan-500/30 bg-black/20 backdrop-blur-sm flex flex-col z-40" role="complementary" aria-label="Country list">
                    <div className="p-6 border-b border-cyan-500/20">
                        <div className="relative mb-4">
                            <label htmlFor="search-input" className="sr-only">Search countries</label>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" aria-hidden="true" />
                            <input
                                id="search-input"
                                type="text"
                                placeholder="PROBE ENTITY NAME..."
                                className="w-full bg-cyan-500/5 border border-cyan-500/30 rounded-lg py-3 pl-10 pr-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-cyan-500/60 placeholder:text-cyan-500/30"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                aria-label="Search countries by name"
                            />
                        </div>

                        {/* Region Filter */}
                        <div className="space-y-2" role="group" aria-label="Region filter">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-60">
                                <Database className="w-3 h-3" aria-hidden="true" />
                                Filter by Region
                            </div>
                            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select region">
                                {regions.map(region => (
                                    <button
                                        key={region}
                                        onClick={() => setSelectedRegion(region)}
                                        aria-pressed={selectedRegion === region}
                                        className={`glitch-hover px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded transition-all ${
                                            selectedRegion === region
                                                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/50'
                                                : 'bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/60'
                                        }`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="p-10 text-center animate-pulse text-xs font-black uppercase tracking-widest">Accessing Satellite Feed...</div>
                        ) : (
                            filtered.map((c, index) => (
                                <button
                                    key={c.cca3}
                                    onClick={() => setSelected(c)}
                                    className={`glitch-hover w-full p-6 border-b border-cyan-500/10 text-left transition-all hover:bg-cyan-500/5 group flex items-center justify-between ${
                                        selected?.cca3 === c.cca3 ? 'bg-cyan-500/10 border-r-4 border-r-cyan-500' : ''
                                    } ${
                                        highlightedIndex === index ? 'bg-cyan-500/20 border-l-4 border-l-cyan-400' : ''
                                    }`}
                                >
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-tight group-hover:text-white transition-colors">{c.name.common}</h3>
                                        <p className="text-[10px] opacity-40 uppercase font-bold">{c.region} // {c.cca3}</p>
                                    </div>
                                    <Zap className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${selected?.cca3 === c.cca3 ? 'opacity-100' : ''}`} />
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] data-stream-bg">
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div
                                key={selected.cca3}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                className="h-full p-12 flex flex-col"
                            >
                                <div className="flex gap-12 items-start mb-12">
                                    <div className="w-64 h-40 cyber-border rounded-2xl overflow-hidden bg-black/50 p-1">
                                        <img src={selected.flags.svg} alt="" className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                    <div className="flex-1 py-4">
                                        <h2 className="text-6xl font-black tracking-tighter uppercase mb-4 text-white">
                                            {selected.name.common}
                                        </h2>
                                        <div className="flex gap-4">
                                            <Tag label="Region" value={selected.region} />
                                            <Tag label="Capital" value={selected.capital?.[0] || 'N/A'} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                    <InfoCard title="Population" value={selected.population.toLocaleString()} icon={<Users className="w-5 h-5" />} />
                                    <InfoCard title="Area" value={`${selected.area.toLocaleString()} KM²`} icon={<Navigation className="w-5 h-5" />} />
                                    <InfoCard title="Entity ID" value={selected.cca3} icon={<Database className="w-5 h-5" />} />
                                </div>

                                <div className="mt-auto p-8 cyber-border rounded-3xl bg-cyan-500/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Zap className="w-5 h-5" />
                                        <h3 className="text-sm font-black uppercase tracking-widest">Geopolitical Assessment</h3>
                                    </div>
                                    <p className="text-xs leading-relaxed font-medium opacity-80">
                                        Analyzing localized data for {selected.name.common}. Stability indices reflect standard regional variances.
                                        No immediate anomalies detected in {selected.region} sector. Monitoring continues...
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-20 opacity-20">
                                <Globe className="w-32 h-32 mb-8 animate-spin shadow-2xl" style={{ animationDuration: '20s' }} />
                                <h2 className="text-2xl font-black uppercase tracking-[0.4em]">Awaiting Selection</h2>
                                <p className="max-w-md text-xs font-bold uppercase tracking-widest mt-4">Initialize probe by selecting a global entity from the primary list unit.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Stats Footer */}
            <footer className="p-4 bg-black border-t border-cyan-500/30 flex justify-between items-center text-[10px] font-medium tracking-[0.2em] uppercase">
                <div className="flex gap-8">
                    <span>LAT: 40.7128 N</span>
                    <span>LNG: 74.0060 W</span>
                    <span>MK_CORP DATABASE V2.1 // 2026.EVOLUTION</span>
                </div>
                <div>
                    <span className="text-cyan-500/50 italic capitalize tracking-normal">Encrypted Transmission...</span>
                </div>
            </footer>
        </div>
    );
}

function Tag({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            <span className="opacity-40">{label}:</span>
            <span>{value}</span>
        </div>
    );
}

function InfoCard({ title, value, icon }: { title: string, value: string, icon: any }) {
    return (
        <div className="p-6 bg-cyan-500/5 cyber-border rounded-2xl hover:bg-cyan-500/10 transition-colors">
            <div className="flex items-center gap-3 mb-4 opacity-50">
                {icon}
                <h4 className="text-[10px] font-black uppercase tracking-widest">{title}</h4>
            </div>
            <p className="text-2xl font-black text-white tracking-tight">{value}</p>
        </div>
    );
}

export default App;
