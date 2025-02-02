import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Log from "@/components/Log";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main className="w-full">
        <div className="fixed inset-0 bg-gradient-diagonal opacity-5 pointer-events-none" />
        <Hero />
        <Skills />
        <Projects />
        <Log />
      </main>
      <Footer />
    </>
  );
}
