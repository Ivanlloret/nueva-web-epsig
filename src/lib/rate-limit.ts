import "server-only";

// Limitador en memoria (ventana deslizante). Suficiente para un único proceso Node
// como el de Plesk; si algún día hay varias instancias, habría que moverlo a Redis o similar.
type Bucket = number[];

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

function sweep(now: number, windowMs: number) {
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  for (const [key, hits] of buckets) {
    if (hits.every((t) => now - t > windowMs)) buckets.delete(key);
  }
}

/** Registra un intento y devuelve `true` si todavía está dentro del límite. */
export function hit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  sweep(now, windowMs);
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  return true;
}

/** IP del visitante. Detrás de Cloudflare, la real llega en `cf-connecting-ip`. */
export function clientIp(request: Request) {
  const headers = request.headers;
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
