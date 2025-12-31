import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';

export const Gallery = () => {
    const { images } = useGallery();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    if (images.length === 0) {
        return null;
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = images.length - 1;
            if (nextIndex >= images.length) nextIndex = 0;
            return nextIndex;
        });
    };

    return (
        <section id="structure" className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-[1em] md:px-[2em]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-black mb-4">Conheça Nossa Estrutura</h2>
                    <p className="text-gray-600">Ambientes projetados para o seu melhor desempenho</p>
                </div>

                <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(_, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full h-full object-cover"
                            alt={`Estrutura Hazak ${currentIndex + 1}`}
                        />
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        id="gallery-prev-btn"
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg backdrop-blur-sm transition-all z-10"
                        onClick={() => paginate(-1)}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        id="gallery-next-btn"
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-lg backdrop-blur-sm transition-all z-10"
                        onClick={() => paginate(1)}
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                            <button
                                id={`gallery-dot-${index}-btn`}
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
