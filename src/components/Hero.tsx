import { motion } from 'framer-motion';
import heroImg from '../assets/img/hazak-hero.jpg';

export const Hero = () => {
    return (
        <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
            {/* Background Image with Parallax-like effect or just static cover */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImg}
                    alt="Hazak Fit Gym"
                    className="w-full h-full object-cover object-[75%_50%] md:object-center"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10 pt-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-block text-primary font-bold text-lg mb-4 tracking-wider uppercase"
                    >
                        Bem vindo à revolução
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Seja bem vindo<br />
                        a <span className="text-primary">HAZAK Fit</span>
                    </h1>
                    <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
                        Sua jornada para uma vida mais saudável começa aqui!
                        Estrutura completa, profissionais dedicados e o ambiente perfeito para você evoluir mais.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.a
                            href="https://api.whatsapp.com/send?phone=5577998620419&text=Ola,%20gostaria%20de%20saber%20mais%20sobre%20a%20Hazak!"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow inline-block text-center"
                        >
                            Fazer Matrícula
                        </motion.a>
                        <motion.a
                            href="#plans"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/30 hover:border-white transition-colors inline-block text-center"
                        >
                            Conhecer Planos
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
