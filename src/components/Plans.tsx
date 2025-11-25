import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, MessageCircle } from 'lucide-react';
import { usePlans, type PlanDuration } from '../context/PlansContext';

export const Plans = () => {
    const { plans } = usePlans();
    const [activePlan, setActivePlan] = useState<PlanDuration>('monthly');

    const PlanCard = ({ plan, isMobile = false }: { plan: typeof plans[0], isMobile?: boolean }) => (
        <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20, x: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: isMobile ? -20 : 0 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-3xl p-8 flex flex-col border transition-all duration-300 h-full ${plan.highlight
                ? 'bg-dark border-primary shadow-2xl shadow-primary/10 z-10'
                : 'bg-dark/50 border-gray-800 hover:border-gray-600'
                } ${!isMobile && plan.highlight ? 'md:scale-105' : ''}`}
        >
            {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Star size={12} fill="black" /> RECOMENDADO
                </div>
            )}

            <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${plan.highlight ? 'bg-primary text-black' : 'bg-gray-800 text-white'
                    }`}>
                    <plan.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            </div>

            <div className="flex items-end gap-1 mb-8">
                <span className="text-sm text-gray-400 mb-1">R$</span>
                <span className={`text-5xl font-bold ${plan.highlight ? 'text-primary' : 'text-white'}`}>
                    {plan.price}
                </span>
                <span className="text-sm text-gray-400 mb-1">/mês</span>
            </div>

            <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                        <Check className={`w-5 h-5 shrink-0 ${plan.highlight ? 'text-primary' : 'text-gray-500'}`} />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <a
                href={`https://api.whatsapp.com/send?phone=5577998620419&text=Ola,%20gostaria%20de%20assinar%20o%20plano%20${plan.name}!`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 block text-center ${plan.highlight
                    ? 'bg-primary text-black hover:bg-primary-hover shadow-lg shadow-primary/25'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}>
                Começar Agora
            </a>
        </motion.div>
    );

    return (
        <section id="plans" className="py-[1em] bg-dark-lighter relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Planos e Preços</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                        Invista em você com o melhor custo-benefício da região.
                        Escolha o plano que melhor se adapta ao seu estilo de vida.
                    </p>

                    {/* Mobile Switch */}
                    <div className="md:hidden flex justify-center">
                        <div className="inline-flex bg-dark p-1.5 rounded-full border border-gray-800 shadow-inner">
                            {plans.map((plan) => (
                                <button
                                    key={plan.id}
                                    onClick={() => setActivePlan(plan.id as PlanDuration)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activePlan === plan.id
                                        ? 'bg-primary text-black shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {plan.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-3 gap-6 mb-16">
                    {plans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))}
                </div>

                {/* Mobile View */}
                <div className="md:hidden mb-16">
                    <AnimatePresence mode='wait'>
                        <PlanCard
                            key={activePlan}
                            plan={plans.find(p => p.id === activePlan)!}
                            isMobile={true}
                        />
                    </AnimatePresence>
                </div>

                {/* WhatsApp Contact Button */}
                <div className="flex justify-center">
                    <a
                        href="https://api.whatsapp.com/send?phone=5577998620419&text=Ola,%20gostaria%20de%20conhecer%20outros%20planos%20disponiveis!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-green-500/25"
                    >
                        <MessageCircle size={20} />
                        Conhecer outros planos
                    </a>
                </div>
            </div>
        </section>
    );
};
