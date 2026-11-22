import React from "react";
  import Header from "./components/Header";
 import Footer from "./components/Footer";
 import Hero from "@/components/Hero";


type Props={
    children: React.ReactNode;
    showHero?: boolean;
}
export default function Layout({ children,showHero=false }: Props) {
  return (
    <div className="min-h-screen flex flex-col text-gray-900">
       <Header /> 
        {showHero && <Hero/> }
      <main className="flex-1 ">
        {children}
      </main>

     <Footer /> 
    </div>
  );
}