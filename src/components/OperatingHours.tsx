import { motion } from 'framer-motion';
import bgImage from '../assets/img/operating-hours-bg.png';

export function OperatingHours() {
    return (
        <section className="py-24 relative overflow-hidden min-h-[600px] flex items-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Background Gym"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight"
                >
                    <span className="text-white block">Nossos Horários</span>
                    <span className="text-white">de Funcionamento</span>
                </motion.h2>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Monday to Friday */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col">
                            <div className="bg-white py-3 px-6 text-center">
                                <h3 className="text-dark font-black text-xl uppercase tracking-wider">Segunda a Sexta</h3>
                            </div>
                            <div className="bg-primary/90 backdrop-blur-sm py-8 px-6 text-center flex-1 flex flex-col justify-center">
                                <p className="text-dark font-black text-3xl flex items-center justify-center gap-2">
                                    <span className="text-xl font-bold">DAS</span>
                                    05h
                                    <span className="text-xl font-bold">ÀS</span>
                                    22h
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Saturday */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col">
                            <div className="bg-white py-3 px-6 text-center">
                                <h3 className="text-dark font-black text-xl uppercase tracking-wider">Aos Sábados</h3>
                            </div>
                            <div className="bg-primary/90 backdrop-blur-sm py-8 px-6 text-center flex-1 flex flex-col justify-center">
                                <div className="mb-4">
                                    <span className="text-dark font-bold block text-sm mb-1">MANHÃ</span>
                                    <p className="text-dark font-black text-2xl">08h às 11h</p>
                                </div>
                                <div>
                                    <span className="text-dark font-bold block text-sm mb-1">TARDE</span>
                                    <p className="text-dark font-black text-2xl">15h às 18h</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sunday */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="w-full"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col">
                            <div className="bg-white py-3 px-6 text-center">
                                <h3 className="text-dark font-black text-xl uppercase tracking-wider">Aos Domingos</h3>
                            </div>
                            <div className="bg-primary/90 backdrop-blur-sm py-8 px-6 text-center flex-1 flex flex-col justify-center">
                                <p className="text-dark font-black text-3xl flex items-center justify-center gap-2">
                                    <span className="text-xl font-bold">DAS</span>
                                    08h
                                    <span className="text-xl font-bold">ÀS</span>
                                    11h
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
