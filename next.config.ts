import type { NextConfig } from "next";

const clientPortalUrl = "https://epsig.matrixconnect.eu/apps/login/";

// URLs heredadas de la web WordPress que no tienen página propia en la nueva web.
const legacyRedirects: [source: string, destination: string][] = [
  ["/home", "/"],
  ["/inicio", "/"],
  ["/introduccion", "/"],
  ["/imagen", "/"],
  ["/acerca-de", "/nosotros/"],
  ["/acerca-de/acceso-a-clientes-epsig-consultores-sl", clientPortalUrl],
  ["/clients", clientPortalUrl],
  ["/formulario-correo", "/contacto/"],
  ["/fiscal-contable-2", "/fiscal-contable/"],
  ["/confirmacion-de-donacion", "/"],
  ["/donacion-fallida", "/"],
  ["/escritorio-del-donante", "/"],
];

const nextConfig: NextConfig = {
  // Igual que WordPress: todas las URLs terminan en "/".
  trailingSlash: true,
  redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
