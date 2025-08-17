import Header from "../components/Header";
import Hero from "../components/sections/Hero";

export default function Home() {
  return (
      <main className="bg-grid-dark bg-stars min-h-screen">
          <Header/>
          <Hero/>
      </main>
  );
}