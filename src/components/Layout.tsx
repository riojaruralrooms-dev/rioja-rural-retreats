import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [chatForceOpen, setChatForceOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onOpenChat={() => setChatForceOpen(true)} />
      <main className="flex-1 pt-40 md:pt-48">{children}</main>
      <Footer />
      <ChatBot forceOpen={chatForceOpen} onForceClose={() => setChatForceOpen(false)} />
    </div>
  );
};

export default Layout;
