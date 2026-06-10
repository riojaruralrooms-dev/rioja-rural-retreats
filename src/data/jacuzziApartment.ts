import coverImg from "@/assets/jacuzzi-cover.jpg";
import rioImg from "@/assets/jacuzzi-rio.jpg";
import banoImg from "@/assets/jacuzzi-bano.jpg";
import dormitorioImg from "@/assets/jacuzzi-dormitorio.jpg";
import terrazaImg from "@/assets/jacuzzi-terraza.jpg";

export interface JacuzziApartment {
  slug: string;
  title: string;
  priceFrom: number;
  shortDescription: string;
  longDescription: string;
  features: string[];
  coverImage: string;
  gallery: { src: string; alt: string }[];
  baseBookingUrl: string;
}

export const jacuzziApartment: JacuzziApartment = {
  slug: "jacuzzi",
  title: "Apartamento con Jacuzzi",
  priceFrom: 140,
  shortDescription:
    "Apartamento con jacuzzi totalmente equipado con salón comedor, cocina completa, dos habitaciones con cama de matrimonio, calefacción y terraza.",
  longDescription:
    "Apartamento con jacuzzi ideal para escapadas rurales. Dispone de salón comedor amplio, cocina totalmente equipada, dos habitaciones con cama de matrimonio, calefacción, terraza y conexión WiFi gratuita. Perfecto para disfrutar de una estancia cómoda en un entorno natural.",
  features: [
    "Jacuzzi",
    "Cocina equipada",
    "WiFi gratis",
    "TV",
    "Calefacción",
    "Terraza",
    "Aire acondicionado",
  ],
  coverImage: coverImg,
  gallery: [
    { src: coverImg, alt: "Salón con jacuzzi y chimenea" },
    { src: dormitorioImg, alt: "Dormitorio principal" },
    { src: banoImg, alt: "Baño completo" },
    { src: terrazaImg, alt: "Terraza exterior" },
    { src: rioImg, alt: "Río Tirón - entorno natural" },
  ],
  baseBookingUrl:
    "https://www.booking.com/hotel/es/apartamentos-virgen-de-tironcillo-cuzcurrita-de-rio-tiron.es.html",
};
