import aboutImg from '../assets/img/hazak-about.jpg';

export const About = () => {
    return (
        <section id="about" className="py-20 bg-primary">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -inset-4 border-2 border-black rounded-3xl translate-x-4 translate-y-4 hidden md:block" />
                        <img
                            src={aboutImg}
                            alt="Fachada Hazak Fit"
                            className="w-full aspect-video md:aspect-auto object-cover rounded-3xl shadow-2xl relative z-10 rotate-1 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>

                    <div className="lg:w-1/2 text-black">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Conheça a HAZAK FIT<br />
                            de Bom Jesus da Lapa
                        </h2>
                        <p className="text-lg mb-6 font-medium opacity-90">
                            A maior e mais completa estrutura da região, pensada para oferecer o máximo de conforto e resultado para você.
                        </p>
                        <p className="mb-8 leading-relaxed opacity-80">
                            Com equipamentos de última geração e um ambiente climatizado, a Hazak Fit se destaca como referência em fitness.
                            Nossa missão é proporcionar saúde e bem-estar através de um serviço de excelência.
                        </p>
                        <a
                            href="https://api.whatsapp.com/send?phone=5577998620419&text=Ola,%20gostaria%20de%20saber%20mais%20sobre%20a%20Hazak!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors shadow-lg inline-block"
                        >
                            Matricule-se Agora
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
