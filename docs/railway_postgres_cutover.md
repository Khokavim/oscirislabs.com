# Railway Postgres Cutover

Date: 2026-06-23

## Goal

Move OSCIRIS from file-backed pilot storage to managed Postgres and prove the
cutover in the live environment.

## Required Variables

- `DATABASE_URL`
- `OSCIRIS_PILOT_ACCESS_CODE`
- `OSCIRIS_APP_SECRET`

## Cutover Steps

1. Attach a Railway Postgres database to the `oscirislabs.com` service.
2. Set `DATABASE_URL` to the Railway-provided connection string.
3. Confirm `OSCIRIS_PILOT_ACCESS_CODE` and `OSCIRIS_APP_SECRET` are present.
4. Redeploy the service.
5. Check `https://oscirislabs.com/api/health/`.
6. Confirm the response reports:
   - `store.mode=postgres`
   - `store.databaseConfigured=true`
   - `store.databaseReachable=true`
7. Run:

```bash
OSCIRIS_BASE_URL=https://oscirislabs.com OSCIRIS_PILOT_ACCESS_CODE='…' npm run verify:mvp
```

## Success Criteria

- Health endpoint reports Postgres mode.
- The pilot app loads recent jobs after login.
- A new job persists across redeploy or restart.
- Authenticated job endpoints continue to return `200` for valid data and `404`
  for missing jobs.
- Miswired storage returns `503 Storage unavailable`.
