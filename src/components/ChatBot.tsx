import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string; error?: boolean };

const AGENT_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/agent-proxy`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface ChatBotProps {
  forceOpen?: boolean;
  onForceClose?: () => void;
}

const ChatBot = ({ forceOpen, onForceClose }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => {
    return sessionStorage.getItem("rrr-welcome-dismissed") !== "true";
  });
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! 👋 Soy el asistente de Rioja Rural Rooms. ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [welcomeVisible, setWelcomeVisible] = useState(false);

  // Sync forceOpen from header button
  useEffect(() => {
    if (forceOpen) {
      setShowWelcome(false);
      setWelcomeVisible(false);
      sessionStorage.setItem("rrr-welcome-dismissed", "true");
      setIsOpen(true);
    }
  }, [forceOpen]);

  const closeChat = () => {
    setIsOpen(false);
    onForceClose?.();
  };

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setWelcomeVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const dismissWelcome = () => {
    setWelcomeVisible(false);
    setTimeout(() => {
      setShowWelcome(false);
      sessionStorage.setItem("rrr-welcome-dismissed", "true");
    }, 300);
  };

  const handleWelcomeOption = (message: string) => {
    dismissWelcome();
    setTimeout(() => {
      setIsOpen(true);
      setMessages((prev) => [...prev, { role: "user", content: message }]);
      // Trigger the send
      sendMessage(message);
    }, 350);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(AGENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("status " + res.status);
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "Sin respuesta." }]);
    } catch (err) {
      console.error("Chat fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToReserva = () => {
    closeChat();
    window.location.href = "/contacto";
  };

  // Welcome panel
  if (!isOpen && showWelcome && welcomeVisible) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 w-[340px] rounded-2xl border border-stone/20 bg-cream shadow-elevated overflow-hidden animate-fade-up"
      >
        {/* Close */}
        <button
          onClick={dismissWelcome}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-stone/20 transition-colors text-charcoal-light"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>

        <div className="px-6 pt-7 pb-5 text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-wine flex items-center justify-center">
            <MessageCircle size={20} className="text-cream" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-charcoal mb-1">
            ¡Bienvenido/a a Rioja Rural Rooms! 👋
          </h3>
          <p className="text-sm text-charcoal-light">
            ¿En qué podemos ayudarte hoy?
          </p>
        </div>

        <div className="px-6 pb-6 space-y-2.5">
          <button
            onClick={() => handleWelcomeOption("Ver alojamientos")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-stone/30 bg-white hover:border-wine/40 hover:shadow-md transition-all duration-200 text-left group"
          >
            <span className="text-base">🏡</span>
            <span className="text-sm font-medium text-charcoal group-hover:text-wine transition-colors">Ver alojamientos</span>
          </button>
          <button
            onClick={() => handleWelcomeOption("Descubrir planes y experiencias")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-stone/30 bg-white hover:border-wine/40 hover:shadow-md transition-all duration-200 text-left group"
          >
            <span className="text-base">🍷</span>
            <span className="text-sm font-medium text-charcoal group-hover:text-wine transition-colors">Descubrir planes y experiencias</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-wine text-cream p-4 rounded-full shadow-elevated hover:bg-wine-dark transition-all duration-300 hover:scale-105"
        aria-label="Abrir asistente"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center">
      <div className="absolute inset-0 bg-wine/70 backdrop-blur-sm" onClick={closeChat} />

      <div className="relative w-full max-w-md lg:max-w-2xl xl:max-w-3xl h-[500px] sm:h-[560px] lg:h-[680px] xl:h-[720px] bg-cream rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up border border-stone/20 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-wine text-cream">
          <div className="flex items-center gap-3">
            <MessageCircle size={20} />
            <span className="font-serif font-semibold text-lg">Asistente Virtual</span>
          </div>
          <button onClick={closeChat} className="p-2 hover:bg-cream/20 rounded-full transition-colors" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-wine text-cream rounded-br-sm"
                    : "bg-white text-charcoal rounded-bl-sm border border-stone/30"
                }`}
              >
                {msg.role === "user" ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-headings:my-1 prose-strong:text-charcoal">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
                {msg.error && (
                  <button
                    onClick={scrollToReserva}
                    className="mt-2 text-xs font-medium underline text-wine hover:text-wine-dark"
                  >
                    Ir al formulario de reserva →
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-charcoal rounded-2xl rounded-bl-sm px-4 py-3 border border-stone/30 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-wine" />
                <span className="text-xs text-muted-foreground">Escribiendo...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-stone/30 p-3 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2.5 border border-stone/40 rounded-full text-sm bg-cream/50 focus:outline-none focus:ring-2 focus:ring-wine/30"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-wine text-cream rounded-full hover:bg-wine-dark transition-colors disabled:opacity-50"
              aria-label="Enviar"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
