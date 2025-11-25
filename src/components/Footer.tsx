import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
    return (
        <footer id="contact" className="bg-primary text-black pt-20 pb-10">
            <div className="container mx-auto px-[1em] md:px-[2em]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-8">Mais Informações</h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Whatsapp</h3>
                            <p className="text-gray-600">(77) 99862-0419</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Endereço</h3>
                            <p className="text-gray-600">Av. Agenor Magalhães, 333<br />Bom Jesus da Lapa - BA</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Email</h3>
                            <p className="text-gray-600">contato@hazakfit.com.br</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-2xl font-bold tracking-tighter">
                        HAZAK <span className="font-light">fit</span>
                    </div>

                    <div className="text-sm font-medium opacity-70">
                        © 2025 Hazak Fit. Todos os direitos reservados.
                    </div>


                    <div className="text-sm font-medium opacity-70">
                        Desenvolvido por <a href="https://danibezerra.com" target="_blank" rel="noopener noreferrer">Daniel Bezerra</a>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-black/5 rounded-full hover:bg-black hover:text-primary transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="p-2 bg-black/5 rounded-full hover:bg-black hover:text-primary transition-colors">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
