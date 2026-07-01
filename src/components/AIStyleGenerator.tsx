import React, { useEffect, useMemo, useState } from 'react';
import { Sparkles, Wand2, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

type Moodboard = {
  id?: string;
  keywords: string;
  room_type: string;
  style_title: string;
  palette: string[];
  materials: string[];
  furniture_notes: string;
  lighting_notes: string;
  image_prompts: string[];
  image_urls?: string[] | null;
  created_at?: string;
};

const rooms = ['Living Room', 'Bedroom', 'Majlis', 'Villa Entrance', 'Office', 'Bathroom', 'Kitchen'];

const buildLocalMoodboard = (keywords: string, roomType: string): Moodboard => {
  const text = `${keywords} ${roomType}`.toLowerCase();
  const royal = text.includes('majlis') || text.includes('classic') || text.includes('royal');
  const minimal = text.includes('minimal') || text.includes('beige');
  const palette = royal ? ['#070707', '#D4AF37', '#7A1F1F', '#F8F5ED'] : minimal ? ['#F8F5ED', '#D9C7A3', '#A97924', '#151515'] : ['#070707', '#151515', '#D4AF37', '#F5C542'];
  const title = royal ? 'Royal Classic Majlis Direction' : minimal ? 'Minimalist Beige Luxury Direction' : 'Luxury Modern Gold Direction';
  const materials = royal ? ['carved dark wood', 'brushed brass', 'velvet textiles', 'marble feature walls'] : minimal ? ['travertine', 'warm oak', 'linen textures', 'soft matte paint'] : ['black marble', 'gold metal trims', 'smoked walnut', 'warm textured stone'];
  return {
    keywords,
    room_type: roomType,
    style_title: `${title} for ${roomType}`,
    palette,
    materials,
    furniture_notes: 'Use balanced premium furniture with clean proportions, strong focal walls, and durable UAE-ready finishes.',
    lighting_notes: 'Layer warm indirect lighting with controlled spotlights, wall washing, and a soft gold evening ambience.',
    image_prompts: [
      `${keywords} ${roomType} luxury interior, black and gold, cinematic`,
      `${keywords} material moodboard, marble brass wood premium UAE`,
      `${keywords} lighting concept, warm hidden lights, elegant interior`,
      `${keywords} furniture direction, luxury layout, refined finish`,
    ],
    image_urls: null,
  };
};

export const AIStyleGenerator: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const isAr = language === 'ar';
  const [keywords, setKeywords] = useState('Luxury Modern Gold');
  const [roomType, setRoomType] = useState('Majlis');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Moodboard | null>(null);
  const [recent, setRecent] = useState<Moodboard[]>([]);

  const canGenerate = useMemo(() => keywords.trim().length >= 3, [keywords]);

  const loadRecent = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    const { data } = await supabase.from('ai_moodboards').select('*').order('created_at', { ascending: false }).limit(6);
    if (data) setRecent(data as Moodboard[]);
  };

  useEffect(() => { void loadRecent(); }, []);

  const generate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setError('');
    try {
      let moodboard = buildLocalMoodboard(keywords, roomType);
      if (isSupabaseConfigured && supabase) {
        const { data, error: fnError } = await supabase.functions.invoke('generate-style-moodboard', { body: { keywords, room_type: roomType } });
        if (!fnError && data) moodboard = { ...moodboard, ...data, keywords, room_type: roomType };
        const { data: saved, error: saveError } = await supabase.from('ai_moodboards').insert(moodboard).select().single();
        if (saveError) throw saveError;
        moodboard = saved as Moodboard;
        await loadRecent();
      }
      setResult(moodboard);
    } catch (err) {
      console.error(err);
      setResult(buildLocalMoodboard(keywords, roomType));
      setError(isAr ? 'تم عرض نتيجة محلية مؤقتة. تحقق من تفعيل Supabase لاحقاً.' : 'Showing local fallback. Check Supabase activation later.');
    } finally {
      setLoading(false);
    }
  };

  const active = result || buildLocalMoodboard(keywords, roomType);

  return (
    <section className="mt-16 rounded-3xl border border-luxury-gold/20 bg-black/50 p-5 sm:p-8 shadow-2xl" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-luxury-gold/30 px-3 py-1 text-xs font-bold text-luxury-gold"><Sparkles className="h-4 w-4" /> {isAr ? 'مولد ستايل ذكي' : 'AI Style Generator'}</div>
          <h2 className="font-serif text-2xl font-bold text-white">{isAr ? 'أنشئ Moodboard فاخر لمشروعك' : 'Generate a Luxury Moodboard'}</h2>
          <p className="mt-2 text-sm text-neutral-400">{isAr ? 'اكتب كلمات التصميم واختر نوع الغرفة للحصول على اتجاه ألوان وخامات وإضاءة.' : 'Enter design keywords and a room type to get colors, materials, furniture, and lighting direction.'}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px_auto]">
        <input value={keywords} onChange={(e) => setKeywords(e.target.value)} className="rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-luxury-gold" placeholder="Luxury Modern Gold" />
        <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none focus:border-luxury-gold">
          {rooms.map(r => <option key={r}>{r}</option>)}
        </select>
        <button disabled={!canGenerate || loading} onClick={generate} className="rounded-xl bg-luxury-gold px-5 py-3 text-sm font-black text-black disabled:opacity-50">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="inline-flex items-center gap-2"><Wand2 className="h-4 w-4" /> {isAr ? 'إنشاء' : 'Generate'}</span>}
        </button>
      </div>
      {error && <p className="mt-3 text-xs text-amber-300">{error}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-neutral-950/80 p-5">
          <h3 className="font-serif text-xl font-bold text-luxury-gold">{active.style_title}</h3>
          <p className="mt-3 text-sm text-neutral-300">{isAr ? 'اتجاه احترافي يصلح كنقطة بداية قبل المعاينة واختيار الخامات النهائية.' : 'A professional direction suitable as a starting point before inspection and final material selection.'}</p>
          <div className="mt-5 flex flex-wrap gap-2">{active.palette.map(c => <span key={c} className="h-10 w-10 rounded-full border border-white/20" style={{ background: c }} title={c} />)}</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoCard title={isAr ? 'الخامات' : 'Materials'} items={active.materials} />
            <InfoCard title={isAr ? 'الأثاث' : 'Furniture'} text={active.furniture_notes} />
            <InfoCard title={isAr ? 'الإضاءة' : 'Lighting'} text={active.lighting_notes} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {active.image_prompts.map((p, i) => <div key={p} className="min-h-[150px] rounded-2xl border border-luxury-gold/20 bg-gradient-to-br from-neutral-900 via-black to-yellow-950/30 p-4 text-xs text-neutral-300"><span className="mb-2 block font-mono text-luxury-gold">0{i + 1}</span>{p}</div>)}
        </div>
      </div>

      {recent.length > 0 && <div className="mt-8"><h4 className="mb-3 text-sm font-bold text-white">{isAr ? 'Moodboards سابقة' : 'Recent Moodboards'}</h4><div className="grid gap-3 md:grid-cols-3">{recent.map(m => <div key={m.id} className="rounded-xl border border-white/10 bg-neutral-900 p-3 text-xs text-neutral-300"><b className="block text-luxury-gold">{m.style_title}</b><span>{m.room_type}</span></div>)}</div></div>}
    </section>
  );
};

const InfoCard: React.FC<{ title: string; items?: string[]; text?: string }> = ({ title, items, text }) => (
  <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-neutral-300">
    <b className="mb-2 block text-luxury-gold">{title}</b>
    {items ? <ul className="list-inside list-disc space-y-1">{items.map(i => <li key={i}>{i}</li>)}</ul> : <p>{text}</p>}
  </div>
);

export default AIStyleGenerator;
