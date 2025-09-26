import Header from "../components/Header";
import Hero from "../components/sections/Hero";
import Intro from "../components/sections/Intro";
import Showcase from "../components/sections/Showcase";
import Features from "../components/sections/Features";
import Testimonials from "../components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  return (
      <main className="min-h-screen">
          <Header/>
          <Hero/>
          <Intro/>
          <Showcase/>
          <Features />
          <Testimonials />
          <Pricing/>
      </main>
  );
}