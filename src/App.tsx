import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Plans } from './components/Plans';
import { OperatingHours } from './components/OperatingHours';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Gallery />
        <Plans />
        <OperatingHours />
      </main>
      <Footer />
    </div>
  );
}

export default App;
