import { useNavigate } from "react-router-dom";

interface ApartmentBookingSidebarProps {
  apartmentSlug: string;
  children?: React.ReactNode;
}

const AMENITIZ_IFRAME_SRC = "https://rioja-rural-rooms.amenitiz.io/es/booking/room";

const ApartmentBookingSidebar = ({
  apartmentSlug,
  children,
}: ApartmentBookingSidebarProps) => {
  const navigate = useNavigate();

  const handleDirectBooking = () => {
    navigate(`/contacto?apto=${apartmentSlug}`);
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-48 space-y-5">
        <div
          className="bg-card rounded-2xl p-6 md:p-8 border border-primary/20"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <h3 className="font-serif text-xl text-charcoal mb-1">Reserva directa (-10%)</h3>
          <p className="text-foreground text-base leading-relaxed mb-6">
            Reserva directa con <span className="font-bold text-primary">10% de descuento</span>. Te
            confirmamos disponibilidad por email en menos de 24h.
          </p>
          <button
            onClick={handleDirectBooking}
            className="btn-wine w-full py-4 text-base font-semibold tracking-wider uppercase rounded-lg"
          >
            Solicitar reserva directa (-10%)
          </button>
        </div>

        {children}

        <div className="amenitiz-booking-widget w-full overflow-hidden rounded-2xl">
          <iframe
            src={AMENITIZ_IFRAME_SRC}
            name="myIFrame"
            scrolling="auto"
            width="100%"
            height="600"
            title="Motor de reservas Amenitiz"
            className="w-full border-0"
            style={{ border: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ApartmentBookingSidebar;
