import tironcilloImg from "@/assets/apartamentos-tironcillo.jpg";
import tironcilloFachada from "@/assets/tironcillo-fachada.jpg";
import tironcilloTerraza from "@/assets/tironcillo-terraza.jpg";
import tironcilloJacuzzi from "@/assets/tironcillo-jacuzzi.jpg";
import tironcilloPueblo from "@/assets/tironcillo-pueblo.jpg";
import tironcilloRio from "@/assets/tironcillo-rio.jpg";
import tironcilloDormitorio from "@/assets/tironcillo-dormitorio.jpg";
import floridaImg from "@/assets/apartamentos-florida.jpg";
import floridaFachada from "@/assets/florida-fachada.jpg";
import floridaCocina from "@/assets/florida-cocina.jpg";
import floridaSalon2 from "@/assets/florida-salon2.jpg";
import floridaPueblo from "@/assets/florida-pueblo.jpg";
import floridaComedor2 from "@/assets/florida-comedor2.jpg";
import haroImg from "@/assets/apartamento-haro.jpg";
import haroCoverImg from "@/assets/haro-cover.jpg";
import haroSalonImg from "@/assets/haro-salon.jpg";
import haroCocinaImg from "@/assets/haro-cocina.jpg";
import haroExteriorImg from "@/assets/haro-exterior.jpg";
import villaOlivoImg from "@/assets/villa-olivo.jpg";

export interface Apartment {
  id: string;
  name: string;
  capacity: string;
  capacityMax?: string;
  features: string[];
  description?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  location: string;
  description: string;
  fullDescription: string;
  image: string;
  images?: string[];
  buttonText: string;
  apartments?: Apartment[];
  features?: string[];
  capacity?: string;
  hidden?: boolean;
}

export const accommodations: Accommodation[] = [
  {
    id: "virgen-tironcillo",
    name: "Apartamentos Virgen de Tironcillo",
    location: "Cuzcurrita de Río Tirón (La Rioja)",
    description:
      "Conjunto de apartamentos situados junto al río Tirón, en un entorno natural privilegiado. A tan solo 8 km de Haro, capital del vino de Rioja.",
    fullDescription:
      "Conjunto de apartamentos situados junto al río Tirón, en un entorno natural privilegiado. A tan solo 8 km de Haro, capital del vino de Rioja. Todos los apartamentos están totalmente equipados y cuentan con aire acondicionado. Posibilidad de añadir camas supletorias.",
    image: tironcilloFachada,
    images: [tironcilloFachada, tironcilloTerraza, tironcilloJacuzzi, tironcilloPueblo, tironcilloRio, tironcilloDormitorio],
    buttonText: "Ver apartamentos",
    apartments: [
      {
        id: "duplex-1",
        name: "Apartamento Dúplex 1",
        capacity: "4 personas",
        capacityMax: "hasta 6 con supletoria",
        features: [
          "Dos plantas",
          "Cocina equipada",
          "Aire acondicionado",
          "Vistas al río",
          "Terraza",
        ],
      },
      {
        id: "duplex-2",
        name: "Apartamento Dúplex 2",
        capacity: "4 personas",
        capacityMax: "hasta 6 con supletoria",
        features: [
          "Dos plantas",
          "Cocina equipada",
          "Aire acondicionado",
          "Vistas al río",
          "Terraza",
        ],
      },
      {
        id: "apartamento-3",
        name: "Apartamento 3",
        capacity: "4 personas",
        features: [
          "Jacuzzi",
          "Amplia terraza",
          "Vistas al río",
          "Cocina equipada",
          "Aire acondicionado",
        ],
        description: "Dispone de jacuzzi, amplia terraza y vistas al río",
      },
    ],
  },
  {
    id: "la-florida",
    name: "Apartamentos La Florida",
    location: "Casalarreina (La Rioja)",
    description:
      "Apartamentos situados en la Plaza La Florida de Casalarreina, en una ubicación céntrica y privilegiada. A solo 4 km de Haro.",
    fullDescription:
      "Apartamentos situados en la Plaza La Florida de Casalarreina, en una ubicación céntrica y privilegiada. A solo 4 km de Haro. Alojamiento totalmente equipado, ideal para estancias tranquilas en el corazón del pueblo.",
    image: floridaFachada,
    images: [floridaFachada, floridaCocina, floridaSalon2, floridaComedor2, floridaPueblo],
    buttonText: "Ver apartamentos",
    apartments: [
      {
        id: "primer-piso",
        name: "Apartamento Primer Piso",
        capacity: "4 personas",
        capacityMax: "hasta 6",
        features: [
          "Primera planta",
          "Cocina equipada",
          "Salón amplio",
          "Ubicación céntrica",
        ],
      },
      {
        id: "segundo-piso",
        name: "Apartamento Segundo Piso",
        capacity: "4 personas",
        capacityMax: "hasta 6",
        features: [
          "Segunda planta",
          "Cocina equipada",
          "Vistas a la plaza",
          "Luminoso",
        ],
      },
      {
        id: "bajo",
        name: "Apartamento Bajo",
        capacity: "2 personas",
        capacityMax: "hasta 4",
        features: [
          "Planta baja",
          "Accesible",
          "Cocina equipada",
          "Acogedor",
        ],
        description: "Pendiente de valoración por licencia turística",
      },
    ],
  },
  {
    id: "centro-haro",
    name: "Apartamento en el centro de Haro",
    location: "Calle Siervas de Jesús, 33 – 2º, Haro (La Rioja)",
    description:
      "Alojamiento espacioso y luminoso en el centro de Haro con 3 dormitorios, 2 baños, gran salón comedor con vistas y cocina equipada. Capacidad hasta 6 personas.",
    fullDescription:
      "Alojamiento espacioso y muy luminoso situado en el centro de Haro (capital del vino). Tiene capacidad para 6 personas y ofrece 3 dormitorios (2 con cama de matrimonio y 1 con dos camas individuales), 2 baños completos, un gran salón comedor con vistas a la montaña y a la ciudad y balcón. Incluye amplia cocina totalmente equipada. Dispone de registro de entrada y salida privado (24h). Cerca de bodegas centenarias y del Barrio de la Estación.",
    image: haroImg,
    images: [haroImg, haroCoverImg, haroSalonImg, haroCocinaImg, haroExteriorImg],
    buttonText: "Ver apartamento",
    capacity: "Hasta 6 personas",
    apartments: [
      {
        id: "haro-centro",
        name: "Apartamento en el centro de Haro",
        capacity: "6 personas",
        features: [
          "3 dormitorios",
          "2 baños completos",
          "Cocina equipada",
          "Balcón con vistas",
          "Check-in/out privado 24h",
        ],
      },
    ],
  },
  {
    id: "villa-olivo",
    name: 'Villa Turística "El Olivo"',
    location: "Cuzcurrita de Río Tirón (La Rioja)",
    description:
      "Villa turística totalmente equipada tanto en interior como en exterior. Dispone de 4 habitaciones, salón amplio con chimenea, cocina, 2 baños y una zona exterior con jardín, piscina, barbacoa y billar.",
    fullDescription:
      "Villa turística totalmente equipada tanto en interior como en exterior. Dispone de 4 habitaciones, salón amplio con chimenea, cocina, 2 baños y una zona exterior con jardín, piscina, barbacoa y billar. Capacidad para 8 personas. A solo 8 km de Haro.",
    image: villaOlivoImg,
    buttonText: "Ver villa",
    features: [
      "4 habitaciones",
      "Salón con chimenea",
      "Cocina equipada",
      "2 baños",
      "Jardín privado",
      "Piscina",
      "Barbacoa",
      "Billar",
    ],
    capacity: "8 personas",
    hidden: true,
  },
];
