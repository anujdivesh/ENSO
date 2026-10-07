# Docker

Production image for the El Niño story map, built from Next.js's
[standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
(`output: "standalone"` in `next.config.ts`). The image runs `node server.js`
as a non-root user on port 3000.

All commands run from the **project root** (the build context is the whole
project; `.dockerignore` keeps it small).

## Docker Compose

```bash
docker compose -f docker/docker-compose.yml up --build -d   # build and start
docker compose -f docker/docker-compose.yml logs -f         # follow logs
docker compose -f docker/docker-compose.yml down            # stop
```

Open http://localhost:3000. To use another host port, change `"3000:3000"`
in `docker-compose.yml` (e.g. `"8080:3000"`).

## Plain Docker

```bash
docker build -f docker/Dockerfile -t elnino-story .
docker run -d --name elnino-story -p 3000:3000 elnino-story
```

## Notes

- Story text (`src/story/story.json`) and layer config are built into the
  image: rebuild after editing them.
- Files in `public/` (e.g. `enso.json`, `soi.json`, `ocean.json`, images) are
  also copied in at build time. To update them without rebuilding, mount the
  folder: `-v "$PWD/public:/app/public:ro"`.
- The container needs outbound HTTPS to the data sources (Wasabi S3 Zarr
  stores, ocean-plotter legends, SPC OSM tiles, GeoNode overlays via the
  built-in `/api/tiles` proxy).
- A health check polls `http://127.0.0.1:3000/` every 30 s.
