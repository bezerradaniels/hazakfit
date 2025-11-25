import { Dumbbell, TrendingUp, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Dumbbell,
        title: 'Qualidade',
        description: 'Equipamentos modernos e de alta performance para garantir o melhor treino.'
    },
    {
        icon: TrendingUp,
        title: 'Evolução',
        description: 'Acompanhamento personalizado para você alcançar seus objetivos mais rápido.'
    },
    {
        icon: MapPin,
        title: 'Localização',
        description: 'Fácil acesso no centro da cidade, com estacionamento exclusivo para alunos.'
    },
    {
        icon: Users,
        title: 'Equipe',
        description: 'Profissionais qualificados e prontos para te auxiliar em cada exercício.'
    }
];

export const Features = () => {
    return (
        <section className="py-20 bg-white text-black">
            <div className="container mx-auto px-[1em] md:px-[2em]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Porque escolher a <span className="text-primary-hover">HAZAK FIT?</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Oferecemos tudo o que você precisa para transformar sua vida através do exercício físico.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
