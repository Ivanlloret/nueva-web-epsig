import "server-only";
import { isIP } from "node:net";

// Limitador en memoria (ventana deslizante). Suficiente para un único proceso Node
// como el de Plesk; si algún día hay varias instancias, habría que moverlo a Redis o similar.
type Bucket = { hits: number[]; windowMs: number };

// Tope de claves para que tráfico con IPs falsas no pueda agotar la memoria.
const MAX_KEYS = 10_000;
const SWEEP_EVERY_MS = 60_000;

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

// Cada clave se limpia según su propia ventana (antes, la del límite global se borraba antes de tiempo).
function sweep(now: number) {
  if (now - lastSweep < SWEEP_EVERY_MS && buckets.size < MAX_KEYS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.hits.every((t) => now - t >= bucket.windowMs)) buckets.delete(key);
  }
  // Si aún hay demasiadas, se descartan las más antiguas (el Map conserva el orden de inserción).
  for (const key of buckets.keys()) {
    if (buckets.size <= MAX_KEYS) break;
    buckets.delete(key);
  }
}

/** Registra un intento y devuelve `true` si todavía está dentro del límite. */
export function hit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  sweep(now);
  const bucket = buckets.get(key) ?? { hits: [], windowMs };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
  const allowed = bucket.hits.length < limit;
  if (allowed) bucket.hits.push(now);
  if (bucket.hits.length > 0) buckets.set(key, bucket);
  return allowed;
}

/**
 * IP del visitante. Detrás de Cloudflare, la real llega en `cf-connecting-ip`.
 * Se valida el formato y las IPv6 se agrupan por /64 (un mismo cliente suele tener un /64 entero).
 */
export function clientIp(request: Request) {
  const headers = request.headers;
  // Respaldo por si el proxy de Plesk no reenvía la cabecera de Cloudflare.
  const raw = (
    headers.get("cf-connecting-ip") ?? headers.get("x-forwarded-for")?.split(",")[0] ?? ""
  ).trim();
  const version = isIP(raw);
  if (version === 4) return raw;
  if (version === 6) return `${expandIpv6(raw).slice(0, 4).join(":")}::/64`;
  return "unknown";
}

function expandIpv6(ip: string) {
  const [head, tail = ""] = ip.split("::");
  const left = head ? head.split(":") : [];
  const right = tail ? tail.split(":") : [];
  const fill = Array(Math.max(0, 8 - left.length - right.length)).fill("0");
  return [...left, ...fill, ...right].map((part) => part.toLowerCase());
}
