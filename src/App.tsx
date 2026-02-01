import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Users, Navigation, Zap, Cpu, Database, Star, ArrowRightLeft } from 'lucide-react';

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
    const [savedEntities, setSavedEntities] = useState<string[]>([]);
    const [comparisonTarget, setComparisonTarget] = useState<Country | null>(null);

    // Initialize saved entities from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('world-net-saved');
        if (saved) setSavedEntities(JSON.parse(saved));
    }, []);

    // Typing effect for title
    useEffect(() => {
        const title = 'WORLD_NET';
        let i = 0;
        const timer = setInterval(() => {
            if (i <= title.length) {
                setTypedTitle(title.slice(0, i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 120 + Math.random() * 80);
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
        setLoading(true);
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {
                setCountries(res.data);
                setFiltered(res.data);
                // "Orbital link latency" simulation
                setTimeout(() => setLoading(false), 800 + Math.random() * 400);
            });
    }, []);

    useEffect(() => {
        let results = countries;
        if (selectedRegion !== 'All') {
            results = results.filter(c => c.region === selectedRegion);
        }
        if (search) {
            results = results.filter(c =>
                c.name.common.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFiltered(results.slice(0, 30));
    }, [search, countries, selectedRegion]);

    const toggleSave = (cca3: string) => {
        const updated = savedEntities.includes(cca3)
            ? savedEntities.filter(id => id !== cca3)
            : [...savedEntities, cca3];
        setSavedEntities(updated);
        localStorage.setItem('world-net-saved', JSON.stringify(updated));
    };

    const regions = ['All', ...Array.from(new Set(countries.map(c => c.region))).sort()];

    return (
        <div className="h-screen bg-black text-[#00FF41] font-sans overflow-hidden flex flex-col relative">
            <a href="#main-content" className="skip-link font-mono">
                [SKIP_TO_MAIN_CONTENT]
            </a>
            <div className="scanline" />

            <header className="p-6 border-b border-[#00FF41]/30 bg-[#000500]/90 backdrop-blur-md flex justify-between items-center z-50">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#00FF41]/10 border border-[#00FF41]/50 rounded-sm animate-pulse">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-[0.3em] uppercase typing-cursor font-mono">
                            <span className="text-white">{typedTitle || 'WORLD_NET'}</span>
                        </h1>
                        <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest leading-none font-mono">LINK_STATUS: ESTABLISHED // SECTOR_G12</p>
                    </div>
                </div>

                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest hidden lg:flex font-mono">
                    <div className="flex items-center gap-2"><Cpu className="w-3 h-3" /> CORES: OPTIMAL</div>
                    <div className="flex items-center gap-2"><Database className="w-3 h-3" /> UPLINK: {filtered.length}/{countries.length} ENTITIES</div>
                    {savedEntities.length > 0 && (
                        <div className="flex items-center gap-2 text-white bg-[#00FF41]/20 px-2 rounded"><Star className="w-3 h-3 fill-current" /> SAVED: {savedEntities.length}</div>
                    )}
                </div>
            </header>

            <main id="main-content" className="flex-1 flex overflow-hidden">
                <div className="w-80 border-r border-[#00FF41]/30 bg-[#000500]/60 backdrop-blur-sm flex flex-col z-40" role="complementary">
                    <div className="p-6 border-b border-[#00FF41]/20">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                            <input
                                type="text"
                                placeholder="PROBE DATABASE..."
                                className="w-full bg-[#00FF41]/5 border border-[#00FF41]/30 rounded-sm py-3 pl-10 pr-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#00FF41]/60 placeholder:text-[#00FF41]/20 font-mono"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                {regions.map(region => (
                                    <button
                                        key={region}
                                        onClick={() => setSelectedRegion(region)}
                                        className={`glitch-hover px-2 py-1 text-[9px] font-black uppercase tracking-wider rounded-sm transition-all border ${selectedRegion === region
                                            ? 'bg-[#00FF41] text-black border-[#00FF41] shadow-[0_0_10px_#00FF41]'
                                            : 'bg-transparent border-[#00FF41]/30 hover:border-[#00FF41]/60'
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
                            <div className="p-10 text-center animate-pulse text-[10px] font-black uppercase tracking-widest font-mono">Accessing Orbital Mainframe...</div>
                        ) : (
                            filtered.map((c, index) => (
                                <button
                                    key={c.cca3}
                                    onClick={() => { setSelected(c); setComparisonTarget(null); }}
                                    className={`glitch-hover w-full p-5 border-b border-[#00FF41]/10 text-left transition-all hover:bg-[#00FF41]/5 group flex items-center justify-between ${selected?.cca3 === c.cca3 ? 'bg-[#00FF41]/10 border-r-2 border-r-[#00FF41]' : ''
                                        } ${highlightedIndex === index ? 'bg-[#00FF41]/20 border-l-2 border-l-[#00FF41]' : ''
                                        }`}
                                >
                                    <div>
                                        <h3 className="text-xs font-black uppercase tracking-tight group-hover:text-white transition-colors flex items-center gap-2">
                                            {c.name.common}
                                            {savedEntities.includes(c.cca3) && <Star className="w-2 h-2 fill-[#00FF41]" />}
                                        </h3>
                                        <p className="text-[9px] opacity-40 uppercase font-bold font-mono">{c.region} // {c.cca3}</p>
                                    </div>
                                    <Zap className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${selected?.cca3 === c.cca3 ? 'opacity-100' : ''}`} />
                                </button>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex-1 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.03)_0%,transparent_70%)] data-stream-bg">
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div
                                key={selected.cca3}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full p-10 flex flex-col overflow-y-auto custom-scrollbar"
                            >
                                <div className="flex gap-10 items-start mb-10">
                                    <div className="w-56 h-36 cyber-border overflow-hidden bg-black/50 p-1 rounded-sm">
                                        <img src={selected.flags.svg} alt="" className="w-full h-full object-cover grayscale brightness-125 sepia-[.3] hue-rotate-[100deg] contrast-125" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-5xl font-black tracking-tighter uppercase mb-4 text-white font-mono leading-none">
                                                {selected.name.common}
                                            </h2>
                                            <button
                                                onClick={() => toggleSave(selected.cca3)}
                                                className={`p-3 border rounded-sm transition-all ${savedEntities.includes(selected.cca3) ? 'bg-[#00FF41] text-black border-[#00FF41]' : 'border-[#00FF41]/30 text-[#00FF41] hover:bg-[#00FF41]/10'}`}
                                            >
                                                {savedEntities.includes(selected.cca3) ? <Star className="w-5 h-5 fill-current" /> : <Star className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 px-3 py-1 text-[9px] font-black uppercase tracking-widest font-mono">REGION: {selected.region}</div>
                                            <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 px-3 py-1 text-[9px] font-black uppercase tracking-widest font-mono">CAPITAL: {selected.capital?.[0] || 'NONE'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6 mb-10">
                                    <div className="p-6 bg-[#00FF41]/5 cyber-border rounded-sm">
                                        <div className="flex items-center gap-2 mb-3 opacity-50 italic">
                                            <Users className="w-4 h-4" />
                                            <h4 className="text-[9px] font-black uppercase tracking-widest font-mono">POPULATION</h4>
                                        </div>
                                        <p className="text-3xl font-black text-white tracking-tight font-mono">{selected.population.toLocaleString()}</p>
                                    </div>
                                    <div className="p-6 bg-[#00FF41]/5 cyber-border rounded-sm">
                                        <div className="flex items-center gap-2 mb-3 opacity-50 italic">
                                            <Navigation className="w-4 h-4" />
                                            <h4 className="text-[9px] font-black uppercase tracking-widest font-mono">LAND_AREA</h4>
                                        </div>
                                        <p className="text-3xl font-black text-white tracking-tight font-mono">{selected.area.toLocaleString()} <span className="text-xs">KM²</span></p>
                                    </div>
                                    <div className="p-6 bg-[#00FF41]/5 cyber-border rounded-sm">
                                        <div className="flex items-center gap-2 mb-3 opacity-50 italic">
                                            <Database className="w-4 h-4" />
                                            <h4 className="text-[9px] font-black uppercase tracking-widest font-mono">ENTITY_ID</h4>
                                        </div>
                                        <p className="text-3xl font-black text-white tracking-tight font-mono">{selected.cca3}</p>
                                    </div>
                                </div>

                                <div className="p-8 cyber-border bg-[#00FF41]/5 rounded-sm mb-10">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-3">
                                            <ArrowRightLeft className="w-5 h-5" />
                                            <h3 className="text-sm font-black uppercase tracking-widest font-mono">Comparison Matrix</h3>
                                        </div>
                                        <select
                                            onChange={(e) => {
                                                const found = countries.find(c => c.cca3 === e.target.value);
                                                if (found) setComparisonTarget(found);
                                            }}
                                            className="bg-black border border-[#00FF41]/30 text-[#00FF41] text-[10px] uppercase p-2 focus:outline-none focus:border-[#00FF41]"
                                            value={comparisonTarget?.cca3 || ''}
                                        >
                                            <option value="">[ SELECT_ENTITY ]</option>
                                            {countries.filter(c => c.cca3 !== selected.cca3).slice(0, 100).sort((a, b) => a.name.common.localeCompare(b.name.common)).map(c => (
                                                <option key={c.cca3} value={c.cca3}>{c.name.common}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {comparisonTarget ? (
                                        <div className="grid grid-cols-2 gap-8 text-xs font-mono">
                                            <div className="space-y-4">
                                                <div className="opacity-40 uppercase">[ PRIMARY_ENTITY ]</div>
                                                <div className="text-white text-lg font-black">{selected.name.common}</div>
                                                <div className="pt-2 border-t border-[#00FF41]/20">
                                                    Pop: {selected.population.toLocaleString()}
                                                </div>
                                                <div className="pt-2 border-t border-[#00FF41]/20">
                                                    Area: {selected.area.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="space-y-4 border-l border-[#00FF41]/20 pl-8">
                                                <div className="opacity-40 uppercase">[ TARGET_ENTITY ]</div>
                                                <div className="text-[#00FF41] text-lg font-black">{comparisonTarget.name.common}</div>
                                                <div className="pt-2 border-t border-[#00FF41]/20">
                                                    Pop: {comparisonTarget.population.toLocaleString()}
                                                </div>
                                                <div className="pt-2 border-t border-[#00FF41]/20">
                                                    Area: {comparisonTarget.area.toLocaleString()}
                                                </div>
                                                <div className="pt-4">
                                                    <span className="bg-[#00FF41] text-black px-2 py-0.5 text-[9px] font-bold">
                                                        {selected.population > comparisonTarget.population ? 'LARGER_POP' : 'SMALLER_POP'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-[10px] leading-relaxed italic opacity-50 font-mono">
                                            Awaiting target entity input for comparison analysis. Orbital data reflecting standard variances...
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-20 opacity-20">
                                <Globe className="w-32 h-32 mb-8 animate-spin" style={{ animationDuration: '30s' }} />
                                <h2 className="text-2xl font-black uppercase tracking-[0.5em] font-mono">AWAIT_INPUT</h2>
                                <p className="max-w-md text-[10px] font-bold uppercase tracking-widest mt-4 font-mono">Connect to primary list to initiate geopolitical visualization protocol.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <footer className="p-4 bg-black border-t border-[#00FF41]/30 flex justify-between items-center text-[9px] font-medium tracking-[0.2em] uppercase font-mono">
                <div className="flex gap-8">
                    <span>MK_SYSTEM_RECORDS // 2026</span>
                    {filtered.length > 0 && <span>SECTOR: {selectedRegion}</span>}
                    <span className="hidden sm:inline">TERMINAL_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="text-[#00FF41]/60">
                    <span className="animate-pulse">[ DATA_FEED_ACTIVE ]</span>
                </div>
            </footer>
        </div>
    );
}

export default App;
