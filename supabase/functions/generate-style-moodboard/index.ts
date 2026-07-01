// Supabase Edge Function: generate-style-moodboard
// Future image provider/API integration belongs here, never in the browser.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { keywords = 'Luxury Modern Gold', room_type = 'Majlis' } = await req.json();
    const text = `${keywords} ${room_type}`.toLowerCase();
    const isRoyal = text.includes('majlis') || text.includes('royal') || text.includes('classic');
    const isMinimal = text.includes('minimal') || text.includes('beige');

    const body = {
      style_title: isRoyal ? `Royal Classic Direction for ${room_type}` : isMinimal ? `Minimalist Beige Direction for ${room_type}` : `Luxury Modern Gold Direction for ${room_type}`,
      palette: isRoyal ? ['#070707', '#D4AF37', '#7A1F1F', '#F8F5ED'] : isMinimal ? ['#F8F5ED', '#D9C7A3', '#A97924', '#151515'] : ['#070707', '#151515', '#D4AF37', '#F5C542'],
      materials: isRoyal ? ['dark carved wood', 'brushed brass', 'velvet', 'bookmatched marble'] : isMinimal ? ['travertine', 'warm oak', 'linen', 'matte paint'] : ['black marble', 'gold trims', 'smoked walnut', 'warm stone'],
      furniture_notes: 'Use premium balanced furniture, refined proportions, durable finishes, and a strong focal wall suited to UAE interiors.',
      lighting_notes: 'Use layered warm lighting, concealed LED channels, wall washing, and controlled accent spotlights.',
      image_prompts: [
        `${keywords} ${room_type} luxury interior cinematic`,
        `${keywords} materials moodboard marble brass wood`,
        `${keywords} warm lighting concept premium UAE`,
        `${keywords} furniture layout refined elegant`,
      ],
      image_urls: null,
    };

    return new Response(JSON.stringify(body), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
