import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string; error?: boolean };

const AGENT_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/agent-proxy`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! 👋 Soy el asistente de Rioja Rural Rooms. ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToReserva = () => {
    setIsOpen(false);
    window.location.href = "/contacto";
  };

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
      <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      <div className="relative w-full max-w-md h-[500px] sm:h-[560px] bg-cream rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up border border-stone/20">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-wine text-cream">
          <div className="flex items-center gap-3">
            <MessageCircle size={20} />
            <span className="font-serif font-semibold text-lg">Asistente Virtual</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-cream/20 rounded-full transition-colors" aria-label="Cerrar">
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
                <p className="whitespace-pre-wrap">{msg.content}</p>
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
