import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream/80 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img
              src={logo}
              alt="Rioja Rural Rooms"
              className="h-16 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-cream/60 max-w-md leading-relaxed">
              Conjunto de alojamientos situados en enclaves privilegiados de La
              Rioja Alta, pensados para disfrutar del descanso, la naturaleza,
              el vino y la tranquilidad.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-xl text-cream mb-6">Navegación</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="hover:text-cream transition-colors">
                Inicio
              </Link>
              <Link
                to="/alojamientos"
                className="hover:text-cream transition-colors"
              >
                Alojamientos
              </Link>
              <Link
                to="/experiencias"
                className="hover:text-cream transition-colors"
              >
                Experiencias
              </Link>
              <Link
                to="/galeria"
                className="hover:text-cream transition-colors"
              >
                Galería
              </Link>
              <Link
                to="/contacto"
                className="hover:text-cream transition-colors"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl text-cream mb-6">Contacto</h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+34640918592"
                className="flex items-center gap-3 hover:text-cream transition-colors"
              >
                <Phone size={18} className="text-wine-light" />
                640 918 592
              </a>
              <a
                href="mailto:info@riojaruralrooms.com"
                className="flex items-center gap-3 hover:text-cream transition-colors"
              >
                <Mail size={18} className="text-wine-light" />
                info@riojaruralrooms.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-wine-light mt-1" />
                <span>La Rioja Alta, España</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Legal Links */}
        <div className="border-t border-cream/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">
            {/* Payment Methods */}
            <div>
              <h4 className="text-cream/90 font-semibold text-sm uppercase tracking-wider mb-4">Métodos de pago aceptados</h4>
              <div className="flex items-center gap-3">
                <span className="bg-white rounded-md px-3 py-1.5 text-xs font-bold text-[#003087] shadow-sm">PayPal</span>
                <span className="bg-white rounded-md px-3 py-1.5 shadow-sm flex items-center gap-1">
                  <span className="text-xs font-bold text-[#cc0000]">Master</span><span className="text-xs font-bold text-[#ff9900]">Card</span>
                </span>
                <span className="bg-white rounded-md px-3 py-1.5 text-xs font-bold tracking-wide text-[#1a1f71] italic shadow-sm">VISA</span>
              </div>
            </div>

            {/* Legal Links */}
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/aviso-legal" className="text-cream/70 hover:text-cream transition-colors flex items-center gap-2">
                <span className="text-wine-light">›</span> Aviso Legal
              </Link>
              <Link to="/politica-privacidad" className="text-cream/70 hover:text-cream transition-colors flex items-center gap-2">
                <span className="text-wine-light">›</span> Política de privacidad
              </Link>
              <Link to="/terminos-condiciones" className="text-cream/70 hover:text-cream transition-colors flex items-center gap-2">
                <span className="text-wine-light">›</span> Términos y Condiciones
              </Link>
              <Link to="/politica-cookies" className="text-cream/70 hover:text-cream transition-colors flex items-center gap-2">
                <span className="text-wine-light">›</span> Política de cookies (UE)
              </Link>
            </nav>
          </div>

          <p className="text-center text-cream/40 text-sm">
            © {new Date().getFullYear()} Rioja Rural Rooms. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
