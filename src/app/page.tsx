import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedProject from "@/components/sections/FeaturedProject";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <FeaturedProject />
        <Skills />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
