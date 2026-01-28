import { ReactNode, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasOfferedHelp, setHasOfferedHelp] = useState(false);

  // Auto-open chat after 3 seconds on first visit
  useEffect(() => {
    const hasSeenChat = sessionStorage.getItem("hasSeenChat");
    if (!hasSeenChat && !hasOfferedHelp) {
      const timer = setTimeout(() => {
        setIsChatOpen(true);
        setHasOfferedHelp(true);
        sessionStorage.setItem("hasSeenChat", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasOfferedHelp]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenChat={() => setIsChatOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Layout;
