import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-36 sm:pt-40 xl:pt-44">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
