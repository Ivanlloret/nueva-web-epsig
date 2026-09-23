import type { MetadataRoute } from "next";
import { kitConsultingServices, kitDigitalCategories, site } from "@/lib/site";

const routes = [
  "",
  "/servicios",
  "/servicios/odoo",
  "/servicios/consultoria-empresarial",
  "/servicios/transformacion-digital",
  "/servicios/proteccion-del-negocio",
  "/kit-digital",
  ...kitDigitalCategories.map((cat) => `/kit-digital/${cat.slug}`),
  "/kit-consulting",
  ...kitConsultingServices.map((service) => `/kit-consulting/${service.slug}`),
  "/sectores",
  "/casos-de-exito",
  "/nosotros",
  "/precios",
  "/contacto",
  "/blog",
  "/aviso-legal",
  "/politica-de-privacidad",
  "/politica-de-cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));
}
