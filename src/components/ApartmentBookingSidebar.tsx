import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AmenitizBookingModal from "@/components/AmenitizBookingModal";

interface ApartmentBookingSidebarProps {
  apartmentSlug: string;
  children?: React.ReactNode;
}

const ApartmentBookingSidebar = ({
  apartmentSlug,
  children,
}: ApartmentBookingSidebarProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDirectBooking = () => {
    navigate(`/contacto?apto=${apartmentSlug}`);
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

      <AmenitizBookingModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default ApartmentBookingSidebar;
