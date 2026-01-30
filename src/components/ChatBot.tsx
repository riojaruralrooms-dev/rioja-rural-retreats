import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, MessageCircle, Loader2, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! 👋 Soy el asistente de Rioja Rural Rooms. ¿En qué puedo ayudarte? Puedo informarte sobre nuestros alojamientos, disponibilidad, experiencias en La Rioja Alta y mucho más.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Show the small help bubble after 3 seconds on first visit
  useEffect(() => {
    const hasSeenBubble = sessionStorage.getItem("hasSeenChatBubble");
    if (!hasSeenBubble) {
      const timer = setTimeout(() => {
        setShowBubble(true);
        sessionStorage.setItem("hasSeenChatBubble", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Text-to-Speech using Web Speech API
  const speakText = useCallback((text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    // Stop any currently speaking
    window.speechSynthesis.cancel();

    // Clean text for TTS (remove markdown)
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#{1,6}\s/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`[^`]+`/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Try to find a Spanish voice
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  // Speech-to-Text using Web Speech API
  const startRecording = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const streamChat = async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Error al conectar con el asistente");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    return assistantContent;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const assistantResponse = await streamChat(newMessages.slice(1)); // Skip initial greeting
      
      // Speak the response if voice is enabled
      if (voiceEnabled && assistantResponse) {
        await speakText(assistantResponse);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo o contacta directamente al 640 918 592.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowBubble(false);
  };

  // Floating button with optional bubble message
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Help bubble */}
        {showBubble && (
          <div className="animate-fade-up bg-cream shadow-elevated rounded-lg p-3 max-w-[200px] relative">
            <button
              onClick={() => setShowBubble(false)}
              className="absolute -top-2 -right-2 bg-charcoal text-cream rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-charcoal-light"
              aria-label="Cerrar"
            >
              ×
            </button>
            <p className="text-sm text-charcoal">¿Necesitas ayuda? 🏡</p>
          </div>
        )}
        
        {/* Chat button */}
        <button
          onClick={handleOpenChat}
          className="bg-wine text-cream p-4 rounded-full shadow-elevated hover:bg-wine-dark transition-all duration-300 hover:scale-105"
          aria-label="Abrir asistente"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />

      {/* Chat Window */}
      <div className="relative w-full max-w-md h-[500px] sm:h-[600px] bg-gradient-to-b from-cream to-stone-light rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up border border-wine/10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-wine to-wine-dark text-cream rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-cream/20 p-2 rounded-full">
              <MessageCircle size={20} />
            </div>
            <div>
              <span className="font-serif font-semibold text-lg">Asistente Virtual</span>
              <p className="text-xs text-cream/80">Rioja Rural Rooms</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Voice toggle */}
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (isSpeaking) stopSpeaking();
              }}
              className={`p-2 rounded-full transition-all duration-300 ${voiceEnabled ? 'bg-cream/20 hover:bg-cream/30' : 'bg-wine-dark/50 hover:bg-wine-dark/70'}`}
              aria-label={voiceEnabled ? "Desactivar voz" : "Activar voz"}
              title={voiceEnabled ? "Voz activada" : "Voz desactivada"}
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-cream/20 rounded-full transition-all duration-300"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-soft ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-wine to-wine-dark text-cream rounded-br-md"
                    : "bg-white text-charcoal rounded-bl-md border border-stone/30"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none text-charcoal [&>p]:mb-2 [&>ul]:mt-1 [&>ol]:mt-1">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-white text-charcoal rounded-2xl rounded-bl-md px-4 py-3 shadow-soft border border-stone/30">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-wine" />
                  <span className="text-xs text-muted-foreground">Escribiendo...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="px-5 py-3 bg-olive-light/50 backdrop-blur-sm flex items-center justify-between border-t border-olive/20">
            <span className="text-sm text-charcoal flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-wine rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-wine rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-wine rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
              Hablando...
            </span>
            <button
              onClick={stopSpeaking}
              className="text-xs text-wine font-medium hover:underline"
            >
              Detener
            </button>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-stone/30 p-4 bg-white/80 backdrop-blur-sm rounded-b-2xl">
          <div className="flex gap-2">
            {/* Microphone button */}
            <button
              onClick={toggleRecording}
              disabled={isLoading}
              className={`p-3 rounded-full transition-all duration-300 ${
                isRecording 
                  ? "bg-red-500 text-white shadow-lg animate-pulse scale-110" 
                  : "bg-stone-light text-charcoal hover:bg-stone hover:scale-105"
              } disabled:opacity-50`}
              aria-label={isRecording ? "Detener grabación" : "Grabar voz"}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isRecording ? "Escuchando..." : "Escribe tu mensaje..."}
              className="flex-1 px-4 py-3 border border-stone/40 rounded-full focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine text-sm bg-cream/50 placeholder:text-muted-foreground/60"
              disabled={isLoading || isRecording}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-gradient-to-br from-wine to-wine-dark text-cream rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              aria-label="Enviar mensaje"
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
