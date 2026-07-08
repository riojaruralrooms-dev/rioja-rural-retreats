import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const AMENITIZ_BOOKING_URL = "https://rioja-rural-rooms.amenitiz.io/es/booking/room";

const BOOKING_STEPS = [
  "Primero elige los días en los que nos quieres visitar.",
  "Dinos cuántos sois.",
  "En función a la información facilitada te ofrecemos alojamientos y precios.",
  "Reserva.",
];

interface AmenitizBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreReservaClick?: () => void;
}

const AmenitizBookingModal = ({
  open,
  onOpenChange,
  onPreReservaClick,
}: AmenitizBookingModalProps) => {
  const handleGoToBooking = () => {
    window.open(AMENITIZ_BOOKING_URL, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  const handlePreReservaClick = () => {
    onOpenChange(false);
    onPreReservaClick?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

        <div className="space-y-4 mt-2">
          <button
            type="button"
            onClick={handleGoToBooking}
            className="btn-wine w-full py-4 text-base font-semibold tracking-wider uppercase rounded-xl inline-flex items-center justify-center gap-2"
          >
            Ir al motor de reservas
            <ArrowRight size={18} />
          </button>

          {onPreReservaClick && (
            <p className="text-center text-sm text-muted-foreground border-t border-border/60 pt-4 leading-relaxed">
              ¿Prefieres asesoramiento personalizado?{" "}
              <button
                type="button"
                onClick={handlePreReservaClick}
                className="font-semibold text-primary hover:underline underline-offset-2 transition-colors"
              >
                Pre-reserva con IA (-10%)
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AmenitizBookingModal;
