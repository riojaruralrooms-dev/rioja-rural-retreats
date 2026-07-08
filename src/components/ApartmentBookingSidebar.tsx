import { useState } from "react";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApartmentBookingSidebarProps {
  apartmentSlug: string;
  children?: React.ReactNode;
}

const AMENITIZ_BOOKING_URL = "https://rioja-rural-rooms.amenitiz.io/es/booking/room";

const BOOKING_STEPS = [
  "Primero elige los días en los que nos quieres visitar.",
  "Dinos cuántos sois.",
  "En función a la información facilitada te ofrecemos alojamientos y precios.",
  "Reserva.",
];

const ApartmentBookingSidebar = ({
  apartmentSlug,
  children,
}: ApartmentBookingSidebarProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDirectBooking = () => {
    navigate(`/contacto?apto=${apartmentSlug}`);
  };

  const handleGoToBooking = () => {
    window.open(AMENITIZ_BOOKING_URL, "_blank", "noopener,noreferrer");
    setIsModalOpen(false);
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-48 space-y-5">
        {/* BLOQUE A — Reserva Amenitiz (opción principal) */}
        <div
          className="bg-card rounded-2xl p-6 md:p-8 border border-primary/10"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 text-center">
            Disponibilidad en tiempo real
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-amenitiz-reserve group w-full py-6 rounded-xl inline-flex items-center justify-center gap-3"
          >
            <CalendarCheck
              size={24}
              strokeWidth={2.5}
              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
            <span>Reservar ahora</span>
          </button>
          <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
            Consulta fechas, tarifas y confirma tu estancia al instante.
          </p>
        </div>

        {children}

        {/* BLOQUE B — Reserva directa (opción secundaria) */}
        <div className="bg-secondary/30 rounded-2xl p-6 md:p-7 border border-border/60">
          <h3 className="font-serif text-lg text-charcoal mb-1">Reserva directa (-10%)</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            ¿Prefieres reservar con nosotros? Obtén un{" "}
            <span className="font-semibold text-primary">10% de descuento</span>. Te confirmamos por
            email en menos de 24h.
          </p>
          <button
            onClick={handleDirectBooking}
            className="btn-outline-wine w-full py-3.5 text-sm font-semibold tracking-wider uppercase rounded-lg"
          >
            Solicitar reserva directa (-10%)
          </button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl border-border/60 p-8 gap-6 bg-card">
          <DialogHeader className="space-y-3 pr-8">
            <DialogTitle className="font-serif text-2xl text-charcoal text-left">
              Cómo hacer tu reserva
            </DialogTitle>
            <p className="text-sm text-muted-foreground text-left leading-relaxed">
              Sigue estos pasos en nuestro motor de reservas. Te llevará solo un minuto.
            </p>
          </DialogHeader>

          <ol className="space-y-4">
            {BOOKING_STEPS.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary-foreground"
                  style={{ background: "var(--gradient-wine)" }}
                >
                  {index + 1}
                </span>
                <p className="text-foreground/90 leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={handleGoToBooking}
            className="btn-wine w-full py-4 text-base font-semibold tracking-wider uppercase rounded-xl inline-flex items-center justify-center gap-2 mt-2"
          >
            Ir al motor de reservas
            <ArrowRight size={18} />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApartmentBookingSidebar;
