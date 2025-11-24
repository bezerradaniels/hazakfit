import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold text-primary tracking-tighter">
                    HAZAK <span className="text-white font-light">fit</span>
                </a>

                <nav className="hidden md:flex items-center gap-8 text-white font-medium">
                    <a href="#home" className="hover:text-primary transition-colors">Início</a>
                    <a href="#about" className="hover:text-primary transition-colors">Sobre</a>
                    <a href="#structure" className="hover:text-primary transition-colors">Estrutura</a>
                    <a href="#plans" className="hover:text-primary transition-colors">Planos</a>
                    <a
                        href="https://api.whatsapp.com/send?phone=5577998620419&text=Ola,%20gostaria%20de%20saber%20mais%20sobre%20a%20Hazak!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-black px-6 py-2 rounded-full font-bold hover:bg-primary-hover transition-transform hover:scale-105"
                    >
                        Assine Agora
                    </a>
                </nav>

                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-dark/95 backdrop-blur-xl absolute top-full left-0 right-0 p-6 flex flex-col gap-6 text-center border-t border-gray-800 shadow-2xl">
                    <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg hover:text-primary">Início</a>
                    <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg hover:text-primary">Sobre</a>
                    <a href="#structure" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg hover:text-primary">Estrutura</a>
                    <a href="#plans" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg hover:text-primary">Planos</a>
                    <a
                        href="https://api.whatsapp.com/send?phone=5577998620419&text=Ola,%20gostaria%20de%20saber%20mais%20sobre%20a%20Hazak!"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-primary text-black px-6 py-3 rounded-full font-bold text-lg"
                    >
                        Assine Agora
                    </a>
                </div>
            )}
        </header>
    );
};
