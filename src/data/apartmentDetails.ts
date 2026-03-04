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

import florida1Cover from "@/assets/florida1-cover.jpg";
import florida1Salon from "@/assets/florida1-salon.jpg";
import florida1Cocina from "@/assets/florida1-cocina.jpg";
import florida1Bano from "@/assets/florida1-bano.jpg";
import florida1Dormitorio from "@/assets/florida1-dormitorio.jpg";

import florida2Cover from "@/assets/florida2-cover.jpg";
import florida2Salon from "@/assets/florida2-salon.jpg";
import florida2Comedor from "@/assets/florida2-comedor.jpg";
import florida2Bano from "@/assets/florida2-bano.jpg";
import florida2Dormitorio from "@/assets/florida2-dormitorio.jpg";

import haroCover from "@/assets/haro-cover.jpg";
import haroSalon from "@/assets/haro-salon.jpg";
import haroDormitorio1 from "@/assets/haro-dormitorio1.jpg";
import haroDormitorio2 from "@/assets/haro-dormitorio2.jpg";
import haroDormitorio3 from "@/assets/haro-dormitorio3.jpg";
import haroBano1 from "@/assets/haro-bano1.jpg";
import haroBano2 from "@/assets/haro-bano2.jpg";
import haroCocina from "@/assets/haro-cocina.jpg";
import haroExterior from "@/assets/haro-exterior.jpg";

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
  petFriendly?: boolean;
}

export const apartmentDetails: ApartmentDetail[] = [
  {
    slug: "jacuzzi",
    title: "Apartamento con Jacuzzi",
    priceFrom: 140,
    shortDescription:
      "Apartamento con jacuzzi totalmente equipado con salón comedor, cocina completa, dos habitaciones con cama de matrimonio, calefacción y terraza.",
    longDescription:
      "Apartamento con jacuzzi ideal para escapadas rurales. Dispone de dos habitaciones con cama de matrimonio, sofá cama bajo petición, cocina totalmente equipada, salón comedor y dos pequeños baños. Calefacción, terraza y conexión WiFi gratuita. Perfecto para disfrutar de una estancia cómoda en un entorno natural.",
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
    petFriendly: true,
  },
  {
    slug: "duplex-1",
    title: "Apartamento Dúplex 1",
    priceFrom: 110,
    shortDescription:
      "Apartamento dúplex con dos dormitorios, salón comedor, cocina equipada y baño completo. Ideal para estancias rurales cómodas.",
    longDescription:
      "Apartamento dúplex totalmente equipado con salón comedor amplio, cocina completa con lavavajillas, dos habitaciones (una con cama de matrimonio y otra con dos camas), baño con ducha, calefacción y conexión WiFi gratuita.\n\nLos apartamentos dúplex disponen de una habitación con cama de matrimonio y otra con dos camas individuales. Cocina totalmente equipada, salón comedor y baño. Aire acondicionado disponible.\n\nLa cama supletoria está disponible bajo petición y previo pago de suplemento.\n\nSofá cama disponible bajo petición.",
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
    petFriendly: true,
  },
  {
    slug: "duplex-2",
    title: "Apartamento Dúplex 2",
    priceFrom: 110,
    shortDescription:
      "Apartamento dúplex equipado con salón comedor, cocina completa y dos dormitorios. Espacio ideal para familias o grupos pequeños.",
    longDescription:
      "Apartamento dúplex con cocina totalmente equipada, salón comedor amplio, baño completo con ducha, dos dormitorios y zona de estar cómoda. Perfecto para disfrutar de una escapada rural con todas las comodidades.\n\nLos apartamentos dúplex disponen de una habitación con cama de matrimonio y otra con dos camas individuales. Cocina totalmente equipada, salón comedor y baño. Aire acondicionado disponible.\n\nLa cama supletoria está disponible bajo petición y previo pago de suplemento.\n\nEl apartamento no dispone de terraza; cuenta con balcón.",
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
    petFriendly: true,
  },
  {
    slug: "florida-1",
    title: "Apartamento La Florida – Primer Piso",
    priceFrom: 110,
    shortDescription:
      "Apartamento luminoso situado en primer piso con vistas a la plaza de Casalarreina. Cocina totalmente equipada, salón comedor y baño completo.",
    longDescription:
      "Apartamento luminoso situado en primer piso con vistas a la plaza de Casalarreina.\n\nDispone de una habitación con cama de matrimonio y otra habitación con dos camas individuales. Cocina totalmente equipada, salón comedor con sofá cama disponible bajo petición y baño completo. Balcón.\n\nCuna disponible bajo disponibilidad y previo pago de suplemento.",
    features: [
      "Cocina equipada",
      "WiFi gratis",
      "TV",
      "Aire acondicionado",
      "Balcón",
      "Sofá cama (bajo petición)",
    ],
    coverImage: florida1Cover,
    gallery: [
      { src: florida1Cover, alt: "Salón comedor con cocina" },
      { src: florida1Salon, alt: "Salón con sofá" },
      { src: florida1Cocina, alt: "Cocina equipada" },
      { src: florida1Dormitorio, alt: "Dormitorio principal" },
      { src: florida1Bano, alt: "Baño con ducha" },
    ],
    baseBookingUrl:
      "https://www.booking.com/hotel/es/apartamentos-la-florida-casalarreina.es.html",
    petFriendly: true,
  },
  {
    slug: "florida-2",
    title: "Apartamento La Florida – Segundo Piso",
    priceFrom: 110,
    shortDescription:
      "Apartamento luminoso situado en segundo piso con vistas a la plaza de Casalarreina. Cocina totalmente equipada, salón comedor y baño completo.",
    longDescription:
      "Apartamento luminoso situado en segundo piso con vistas a la plaza de Casalarreina.\n\nDispone de una habitación con cama de matrimonio y otra habitación con dos camas individuales. Cocina totalmente equipada, salón comedor con sofá cama disponible bajo petición y baño completo. Balcón.\n\nCuna disponible bajo disponibilidad y previo pago de suplemento.",
    features: [
      "Cocina equipada",
      "WiFi gratis",
      "TV",
      "Aire acondicionado",
      "Balcón",
      "Sofá cama (bajo petición)",
    ],
    coverImage: florida2Cover,
    gallery: [
      { src: florida2Cover, alt: "Comedor con vistas a la plaza" },
      { src: florida2Salon, alt: "Salón con sofá" },
      { src: florida2Comedor, alt: "Zona comedor" },
      { src: florida2Dormitorio, alt: "Dormitorio con camas individuales" },
      { src: florida2Bano, alt: "Baño completo" },
    ],
    baseBookingUrl:
      "https://www.booking.com/hotel/es/apartamentos-la-florida-casalarreina.es.html",
    petFriendly: true,
  },
  {
    slug: "haro-centro",
    title: "Apartamento en el centro de Haro",
    priceFrom: 180,
    priceDetails: "2 personas: desde 180€ · 4 personas: desde 210€ · 6 personas: desde 240€",
    shortDescription:
      "Alojamiento espacioso y luminoso en el centro de Haro con 3 dormitorios, 2 baños, gran salón comedor con vistas y cocina equipada. Capacidad hasta 6 personas.",
    longDescription:
      "Alojamiento espacioso y muy luminoso situado en el centro de Haro (capital del vino). Tiene capacidad para 6 personas y ofrece 3 dormitorios (2 con cama de matrimonio y 1 con dos camas individuales), 2 baños completos, un gran salón comedor con vistas a la montaña y a la ciudad y balcón. Incluye amplia cocina totalmente equipada.\n\nDispone de registro de entrada y salida privado (24h). Cerca de bodegas centenarias y del Barrio de la Estación. A 42 km del aeropuerto de Vitoria y cerca de Rioja Alavesa (27 km).\n\nCocina equipada con fogones, horno, nevera, tostadora, cafetera, copas de vino y menaje completo. Calefacción incluida. Baños con ducha a ras de suelo.\n\nSe admiten mascotas bajo petición y con suplemento.",
    features: [
      "Cocina equipada",
      "Calefacción",
      "WiFi gratis",
      "TV",
      "3 dormitorios",
      "2 baños completos",
      "Balcón",
      "Check-in/out privado 24h",
    ],
    coverImage: haroCover,
    gallery: [
      { src: haroCover, alt: "Salón comedor con vistas" },
      { src: haroSalon, alt: "Salón con TV y comedor" },
      { src: haroDormitorio1, alt: "Dormitorio con dos camas individuales" },
      { src: haroDormitorio2, alt: "Dormitorio con cama de matrimonio" },
      { src: haroDormitorio3, alt: "Dormitorio principal" },
      { src: haroCocina, alt: "Cocina totalmente equipada" },
      { src: haroBano1, alt: "Baño completo con ducha" },
      { src: haroBano2, alt: "Segundo baño completo" },
      { src: haroExterior, alt: "Vistas exteriores desde el apartamento" },
    ],
    baseBookingUrl:
      "https://www.booking.com/hotel/es/apartamento-centro-haro.es.html",
    petFriendly: true,
  },
];
