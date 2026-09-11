# MyCult public site

Marketing, App Store support, and auth/join HTTPS host for [www.my-cult.com](https://www.my-cult.com).

Copy and routes follow `public-site.md`. Visual tokens follow `style-guide.md`.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for auth pages. Optional store URLs enable App Store / Play badges on `/download`.
