import jacuzziCover from "@/assets/jacuzzi-cover.jpg";
import jacuzziBath from "@/assets/jacuzzi-bath.jpg";
import jacuzziRoom from "@/assets/jacuzzi-room.jpg";
import jacuzziRio from "@/assets/jacuzzi-rio.jpg";
import jacuzziBano from "@/assets/jacuzzi-bano.jpg";
import jacuzziSalon from "@/assets/jacuzzi-salon.jpg";
import jacuzziDormitorio from "@/assets/jacuzzi-dormitorio.jpg";
import jacuzziTerraza from "@/assets/jacuzzi-terraza.jpg";

import duplex1Cover from "@/assets/duplex1-cover.jpg";
import duplex1Salon from "@/assets/duplex1-salon.jpg";
import duplex1Cocina from "@/assets/duplex1-cocina.jpg";
import duplex1Dormitorio from "@/assets/duplex1-dormitorio.jpg";
import duplex1Bano from "@/assets/duplex1-bano.jpg";
import duplex1Terraza from "@/assets/duplex1-terraza.jpg";

import duplex2Cover from "@/assets/duplex2-cover.jpg";
import duplex2Salon from "@/assets/duplex2-salon.jpg";
import duplex2Dormitorio from "@/assets/duplex2-dormitorio.jpg";
import duplex2Dormitorio2 from "@/assets/duplex2-dormitorio2.jpg";

export interface Review {
  name: string;
  text: string;
}

export interface ApartmentDetail {
  slug: string;
  title: string;
  priceFrom: number;
  shortDescription: string;
  longDescription: string;
  features: string[];
  coverImage: string;
  gallery: { src: string; alt: string }[];
  baseBookingUrl: string;
  reviews?: Review[];
}

export const apartmentDetails: ApartmentDetail[] = [
  {
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
    coverImage: jacuzziCover,
    gallery: [
      { src: jacuzziCover, alt: "Salón con jacuzzi y chimenea" },
      { src: jacuzziSalon, alt: "Salón con jacuzzi y vistas" },
      { src: jacuzziBath, alt: "Jacuzzi con pétalos" },
      { src: jacuzziRoom, alt: "Habitación con jacuzzi" },
      { src: jacuzziDormitorio, alt: "Dormitorio principal" },
      { src: jacuzziBano, alt: "Baño completo" },
      { src: jacuzziTerraza, alt: "Terraza exterior" },
      { src: jacuzziRio, alt: "Río Tirón - entorno natural" },
    ],
    baseBookingUrl:
      "https://www.booking.com/hotel/es/apartamentos-virgen-de-tironcillo-cuzcurrita-de-rio-tiron.es.html",
  },
  {
    slug: "duplex-1",
    title: "Apartamento Dúplex 1",
    priceFrom: 97,
    shortDescription:
      "Apartamento dúplex con dos dormitorios, salón comedor, cocina equipada y baño completo. Ideal para estancias rurales cómodas.",
    longDescription:
      "Apartamento dúplex totalmente equipado con salón comedor amplio, cocina completa con lavavajillas, dos habitaciones (una con cama de matrimonio y otra con dos camas), baño con ducha, calefacción y conexión WiFi gratuita.",
    features: [
      "Cocina equipada",
      "WiFi gratis",
      "TV",
      "Calefacción",
      "Terraza",
      "Aire acondicionado",
      "Cuna disponible",
    ],
    coverImage: duplex1Cover,
    gallery: [
      { src: duplex1Cover, alt: "Salón comedor con cocina" },
      { src: duplex1Salon, alt: "Salón con zona de estar" },
      { src: duplex1Cocina, alt: "Cocina y comedor desde escalera" },
      { src: duplex1Dormitorio, alt: "Dormitorio con escritorio" },
      { src: duplex1Bano, alt: "Baño completo con ducha" },
      { src: duplex1Terraza, alt: "Terraza con vistas al río" },
    ],
    baseBookingUrl:
      "https://www.booking.com/hotel/es/apartamentos-virgen-de-tironcillo-cuzcurrita-de-rio-tiron.es.html",
    reviews: [
      {
        name: "Maite - España",
        text: "Destacar la atención inmejorable del anfitrión y la comodidad del apartamento. Muy recomendable.",
      },
      {
        name: "Marc C. - España",
        text: "El apartamento está impecable, instalaciones perfectas y muy buena ubicación.",
      },
    ],
  },
  {
    slug: "duplex-2",
    title: "Apartamento Dúplex 2",
    priceFrom: 97,
    shortDescription:
      "Apartamento dúplex equipado con salón comedor, cocina completa y dos dormitorios. Espacio ideal para familias o grupos pequeños.",
    longDescription:
      "Apartamento dúplex con cocina totalmente equipada, salón comedor amplio, baño completo con ducha, dos dormitorios y zona de estar cómoda. Perfecto para disfrutar de una escapada rural con todas las comodidades.",
    features: [
      "Cocina equipada",
      "WiFi gratis",
      "TV",
      "Calefacción",
      "Zona terraza",
      "Cafetera",
      "Secador de pelo",
    ],
    coverImage: duplex2Cover,
    gallery: [
      { src: duplex2Cover, alt: "Salón comedor con escalera" },
      { src: duplex2Salon, alt: "Sala de estar con TV" },
      { src: duplex2Dormitorio, alt: "Dormitorio principal" },
      { src: duplex2Dormitorio2, alt: "Segundo dormitorio" },
    ],
    baseBookingUrl:
      "https://www.booking.com/hotel/es/apartamentos-virgen-de-tironcillo-cuzcurrita-de-rio-tiron.es.html",
    reviews: [
      {
        name: "Laura - España",
        text: "Los anfitriones muy amables y atentos. La estancia fue perfecta.",
      },
      {
        name: "Marc C. - España",
        text: "Todo muy limpio y bien equipado. Muy buena experiencia.",
      },
    ],
  },
];
