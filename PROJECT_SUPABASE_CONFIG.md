# AL HANA AL ZAHABYAH — Supabase Setup

## Project

- Frontend: Vite / React
- Supabase project ref: `bhnnsnytnoryymyocvyv`
- Supabase base URL: `https://bhnnsnytnoryymyocvyv.supabase.co`

Use the base URL only with `createClient`. Do not use `/rest/v1/` in the client URL.

## Local Environment

Create `.env.local` beside `package.json` and add your real Supabase values there.

```env
VITE_SUPABASE_URL=https://bhnnsnytnoryymyocvyv.supabase.co
VITE_SUPABASE_ANON_KEY=your-real-supabase-publishable-key
```

Do not commit `.env.local`.

## GitHub Safe Example

`.env.example` must contain placeholders only.

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-publishable-key
```

## Client File

Use:

```txt
src/lib/supabase.ts
```

Import:

```ts
import { supabase, isSupabaseConfigured } from './lib/supabase';
```

## Safety

Allowed in frontend:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Never expose service role or secret keys in frontend, GitHub, public docs, or screenshots.

## Next Steps

1. Add `.env.local` locally or in AI Studio environment variables.
2. Confirm Supabase connects.
3. Add service layer for quote requests, before/after, and AI design assistant.
4. Add migrations, storage buckets, RLS policies, and seed data.
