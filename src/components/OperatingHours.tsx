import { motion } from 'framer-motion';
import fitnessWoman from '../assets/fitness_woman_transparent.png';

export function OperatingHours() {
    return (
        <section className="py-20 bg-dark relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-96 h-96 bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
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

                <div className="flex flex-col lg:flex-row items-end justify-center gap-8 lg:gap-16">
                    <div className="w-full lg:w-1/2 max-w-2xl space-y-6">
                        {/* Monday to Friday */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
                                <div className="bg-white py-2 px-6 text-center">
                                    <h3 className="text-dark font-black text-xl md:text-2xl uppercase tracking-wider">Segunda a Sexta</h3>
                                </div>
                                <div className="bg-primary py-4 px-6 text-center">
                                    <p className="text-dark font-black text-2xl md:text-3xl">
                                        <span className="text-xl md:text-2xl font-bold mr-2">DAS</span>
                                        05h
                                        <span className="text-xl md:text-2xl font-bold mx-3">ÀS</span>
                                        22h
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Saturday */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-full"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300 flex flex-col">
                                <div className="bg-white py-2 px-6 text-center">
                                    <h3 className="text-dark font-black text-xl md:text-2xl uppercase tracking-wider">Aos Sábados</h3>
                                </div>
                                <div className="bg-primary py-4 px-6 text-center flex-1 flex flex-col justify-center items-center">
                                    <p className="text-dark font-black text-2xl md:text-3xl mb-1">
                                        <span className="text-lg font-bold mr-1">DAS</span>
                                        08h
                                        <span className="text-lg font-bold mx-2">ÀS</span>
                                        11h
                                    </p>
                                    <p className="text-dark font-black text-2xl md:text-3xl">
                                        <span className="text-lg font-bold mr-1">DAS</span>
                                        15h
                                        <span className="text-lg font-bold mx-2">ÀS</span>
                                        18h
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sunday */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-full"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300 flex flex-col">
                                <div className="bg-white py-2 px-6 text-center">
                                    <h3 className="text-dark font-black text-xl md:text-2xl uppercase tracking-wider">Aos Domingos</h3>
                                </div>
                                <div className="bg-primary py-4 px-6 text-center flex-1 flex flex-col justify-center items-center">
                                    <p className="text-dark font-black text-2xl md:text-3xl">
                                        <span className="text-lg font-bold mr-1">DAS</span>
                                        08h
                                        <span className="text-lg font-bold mx-2">ÀS</span>
                                        11h
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="hidden lg:block lg:w-1/2 relative h-full self-end"
                    >
                        <img
                            src={fitnessWoman}
                            alt="Mulher fitness"
                            className="w-full h-auto max-h-[500px] object-contain object-bottom mx-auto"
                            style={{ marginBottom: '-5rem' }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
