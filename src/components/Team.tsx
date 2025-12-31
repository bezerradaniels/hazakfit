import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTeam } from '../context/TeamContext';

export const Team = () => {
    const { team } = useTeam();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Don't render section if no team members
    if (team.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % team.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);
    };

    return (
        <section id="team" className="py-24 bg-dark relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-[1em] md:px-[2em] relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Nossa Equipe</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Profissionais dedicados e qualificados prontos para te ajudar a alcançar seus objetivos.
                    </p>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {team.map((member) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-dark-lighter rounded-2xl overflow-hidden border border-gray-800 hover:border-primary transition-all duration-300 group"
                        >
                            <div className="aspect-square overflow-hidden bg-gray-800">
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-primary text-sm font-semibold">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden relative">
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                className="bg-dark-lighter rounded-2xl overflow-hidden border border-gray-800 max-w-sm mx-auto"
                            >
                                <div className="aspect-square overflow-hidden bg-gray-800">
                                    <img
                                        src={team[currentIndex].photo}
                                        alt={team[currentIndex].name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">{team[currentIndex].name}</h3>
                                    <p className="text-primary text-sm font-semibold">{team[currentIndex].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    {team.length > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button
                                id="team-prev-btn"
                                onClick={prevSlide}
                                className="bg-primary hover:bg-primary-hover text-black p-3 rounded-full transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <div className="text-gray-400 text-sm">
                                {currentIndex + 1} / {team.length}
                            </div>
                            <button
                                id="team-next-btn"
                                onClick={nextSlide}
                                className="bg-primary hover:bg-primary-hover text-black p-3 rounded-full transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
