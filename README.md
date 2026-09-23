# EPSIG Consultores — sitio web

Web corporativa de EPSIG Consultores construida con Next.js (App Router), TypeScript y Tailwind CSS v4.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> **Nota (Windows):** si `npm run dev` o `next telemetry` fallan con `EXDEV: cross-device link not permitted`,
> es porque `%APPDATA%` no está en la misma unidad que este proyecto. Ejecuta los comandos con
> `APPDATA` apuntando a una carpeta del mismo disco, por ejemplo:
> `APPDATA='D:\ruta\al\proyecto\.appdata' npm run dev` (Git Bash) o el equivalente en PowerShell.

## Estructura

- `src/app/` — rutas (App Router): home, `/servicios` (+ 4 subpáginas), `/kit-digital`,
  `/kit-consulting`, `/sectores`, `/casos-de-exito`, `/nosotros`, `/precios`, `/contacto`, `/blog`,
  páginas legales, `sitemap.ts`, `robots.ts`.
- `src/components/` — componentes compartidos (nav con menú desplegable, footer, secciones de la
  home, formulario de contacto...).
- `src/lib/site.ts` — datos de la empresa (contacto, oficinas, servicios, sectores, categorías de
  Kit Digital / Kit Consulting) usados en todo el sitio.
- `src/app/api/contacto/route.ts` — endpoint que recibe el formulario de contacto.

Las secciones de Kit Digital, Kit Consulting, la asesoría económico-financiera/laboral/fiscal-
contable y el enlace de "Acceso a clientes" (`site.clientPortalUrl`) reproducen los puntos reales
de la web anterior (epsigconsultores.com), adaptados al estilo moderno del mockup que diste. En
vez de replicar cada subpágina 1:1 (la web antigua tenía ~18 páginas casi idénticas por categoría),
cada catálogo se agrupó en una sola página completa — dímelo si prefieres URLs individuales por
categoría para SEO.

## Pendiente antes de publicar

1. **Envío de correo real**: `src/app/api/contacto/route.ts` valida y registra las solicitudes del
   formulario en el log del servidor, pero no envía ningún correo todavía porque no hay proveedor
   configurado. Antes de lanzar, conecta un proveedor (Resend, Postmark, SMTP...) y añade sus
   credenciales como variables de entorno.
2. **Datos legales**: `Aviso legal` y `Política de privacidad` incluyen una plantilla de partida.
   Falta completar el CIF y los datos de inscripción en el Registro Mercantil, y que un asesor
   jurídico las revise antes de publicarlas.
3. **Contenido real de "Casos de éxito" y "Blog"**: de momento muestran un estado honesto de
   "todavía no hay nada publicado" en lugar de datos inventados. Sustitúyelo por casos y artículos
   reales según vayan estando disponibles.

## Despliegue

Cualquier plataforma compatible con Next.js sirve (Vercel, etc.). `npm run build` genera todas las
rutas como contenido estático salvo `/api/contacto`, que necesita un runtime de servidor.
