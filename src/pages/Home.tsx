import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { About } from '../components/About';
import { Gallery } from '../components/Gallery';
import { Team } from '../components/Team';
import { Plans } from '../components/Plans';
import { OperatingHours } from '../components/OperatingHours';
import { Footer } from '../components/Footer';

export const Home = () => {
    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />
            <main>
                <Hero />
                <Features />
                <About />
                <Gallery />
                <Team />
                <Plans />
                <OperatingHours />
            </main>
            <Footer />
        </div>
    );
};
