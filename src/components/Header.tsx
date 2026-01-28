import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Alojamientos", href: "/alojamientos" },
  { label: "Experiencias", href: "/experiencias" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "/contacto" },
];

interface HeaderProps {
  onOpenChat?: () => void;
}

const Header = ({ onOpenChat }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-cream/95 backdrop-blur-md shadow-soft py-3"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Rioja Rural Rooms"
              className="h-16 md:h-20 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            {/* AI Assistant Button - Desktop */}
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="flex items-center gap-2 px-4 py-2 bg-wine text-cream rounded-full hover:bg-wine-dark transition-colors duration-300 text-sm font-medium"
                aria-label="Abrir asistente"
              >
                <MessageCircle size={18} />
                <span>¿Te ayudo?</span>
              </button>
            )}
          </nav>

          {/* Mobile: Chat Button + Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* AI Assistant Button - Mobile */}
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="p-2 bg-wine text-cream rounded-full hover:bg-wine-dark transition-colors"
                aria-label="Abrir asistente"
              >
                <MessageCircle size={20} />
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors text-charcoal"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-cream shadow-elevated transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link text-base py-2 ${
                isActive(item.href) ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
