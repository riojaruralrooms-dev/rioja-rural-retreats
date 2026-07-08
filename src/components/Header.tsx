import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarCheck, Menu, X } from "lucide-react";
import AmenitizBookingModal from "@/components/AmenitizBookingModal";
import logo from "@/assets/logo-nuevo.png";

const navItems = [
  { label: "Inicio", href: "/", isAnchor: false },
  { label: "Alojamientos", href: "/alojamientos", isAnchor: false },
  { label: "Experiencias", href: "/experiencias", isAnchor: false },
  { label: "Contacto", href: "/contacto", isAnchor: false },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPreReservaModalOpen, setIsPreReservaModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPreReservaModal = useCallback(() => {
    setIsPreReservaModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePreReservaModal = useCallback(() => {
    setIsPreReservaModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openBookingModal = useCallback(() => {
    setIsBookingModalOpen(true);
  }, []);

  useEffect(() => {
    if (!isPreReservaModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreReservaModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPreReservaModalOpen, closePreReservaModal]);

  useEffect(() => {
    return () => { document.body.style.overflow = ""; };
  }, []);

  const isActive = (href: string) => location.pathname === href;

  const scrollToOpiniones = () => {
    if (location.pathname !== "/") {
      window.location.href = "/#nuestros-huespedes";
      return;
    }
    const element = document.getElementById("nuestros-huespedes");
    if (element) {
      const headerOffset = 200;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Instagram Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-wine text-cream text-center py-1.5 px-4">
        <a
          href="https://www.instagram.com/riojaruralrooms?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-serif text-xs md:text-sm italic tracking-[0.12em] hover:opacity-80 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          Síguenos en Instagram
        </a>
      </div>
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-cream/95 backdrop-blur-md shadow-soft py-3 mt-9"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Rioja Rural Rooms"
              className="h-32 md:h-40 w-auto transition-all duration-300"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.filter(item => !item.isAnchor).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            
            <button onClick={scrollToOpiniones} className="btn-nav-opinions">
              Opiniones
            </button>

            <button
              type="button"
              onClick={openBookingModal}
              className="btn-amenitiz-reserve btn-amenitiz-reserve--nav group inline-flex items-center gap-2"
            >
              <CalendarCheck
                size={18}
                strokeWidth={2.5}
                className="shrink-0 transition-transform duration-300 group-hover:scale-110"
              />
              <span>Reservar ahora</span>
            </button>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 transition-colors text-charcoal"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-cream shadow-elevated transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              openBookingModal();
            }}
            className="btn-amenitiz-reserve btn-amenitiz-reserve--nav btn-amenitiz-reserve--mobile group inline-flex items-center justify-center gap-2"
          >
            <CalendarCheck
              size={20}
              strokeWidth={2.5}
              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
            <span>Reservar ahora</span>
          </button>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`nav-link text-base py-2 ${isActive("/") ? "active" : ""}`}>Inicio</Link>
          <Link to="/alojamientos" onClick={() => setIsMobileMenuOpen(false)} className={`nav-link text-base py-2 ${isActive("/alojamientos") ? "active" : ""}`}>Alojamientos</Link>
          <Link to="/experiencias" onClick={() => setIsMobileMenuOpen(false)} className={`nav-link text-base py-2 ${isActive("/experiencias") ? "active" : ""}`}>Experiencias</Link>
          <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)} className={`nav-link text-base py-2 ${isActive("/contacto") ? "active" : ""}`}>Contacto</Link>
          <button onClick={scrollToOpiniones} className="btn-nav-opinions-mobile">Opiniones</button>
        </nav>
      </div>
    </header>

    <AmenitizBookingModal
      open={isBookingModalOpen}
      onOpenChange={setIsBookingModalOpen}
      onPreReservaClick={openPreReservaModal}
    />

    {/* Modal Pre-reserva IA con overlay burdeos */}
    {isPreReservaModalOpen && (
      <div
        className="pre-modal"
        role="dialog"
        aria-hidden={!isPreReservaModalOpen}
        aria-label="Pre-reserva con IA"
      >
        <div className="pre-modal__overlay pre-modal__overlay--wine" onClick={closePreReservaModal} />
        <div className="pre-modal__panel">
          <button className="pre-modal__close" onClick={closePreReservaModal} aria-label="Cerrar">
            ✕
          </button>
          <iframe
            src="/chat_prueba_rioja_rural_oracle.html?embed=1"
            title="Pre-reserva con IA"
            className="w-full h-full border-0 rounded-lg"
          />
        </div>
      </div>
    )}
    </>
  );
};

export default Header;
