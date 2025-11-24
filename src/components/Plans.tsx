import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Users, User } from 'lucide-react';

type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export const Plans = () => {
    const [cycle, setCycle] = useState<BillingCycle>('monthly');

    const prices = {
        monthly: { individual: '89,90', couple: '149,90', family: '199,90' },
        quarterly: { individual: '79,90', couple: '139,90', family: '189,90' },
        yearly: { individual: '69,90', couple: '129,90', family: '179,90' },
    };

    const plans = [
        {
            id: 'individual',
            name: 'Individual',
            icon: User,
            price: prices[cycle].individual,
            features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre'],
            highlight: false
        },
        {
            id: 'couple',
            name: 'Casal',
            icon: Users,
            price: prices[cycle].couple,
            features: ['Preço especial para 2 pessoas', 'Acesso total à academia', 'Sem taxa de matrícula', 'Treinos personalizados'],
            highlight: true
        },
        {
            id: 'family',
            name: 'Família',
            icon: Users,
            price: prices[cycle].family,
            features: ['Preço especial para 3 pessoas', 'Acesso total à academia', 'Sem taxa de matrícula', 'Benefícios exclusivos'],
            highlight: false
        }
    ];

    return (
        <section id="plans" className="py-24 bg-dark-lighter relative overflow-hidden">
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

                    {/* Switch */}
                    <div className="inline-flex bg-dark p-1.5 rounded-full border border-gray-800 shadow-inner">
                        {(['monthly', 'quarterly', 'yearly'] as BillingCycle[]).map((c) => (
                            <button
                                key={c}
                                onClick={() => setCycle(c)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${cycle === c
                                    ? 'bg-primary text-black shadow-lg scale-105'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {c === 'monthly' ? 'Mensal' : c === 'quarterly' ? 'Trimestral' : 'Anual'}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        {cycle === 'yearly' && <span className="text-primary font-bold animate-pulse">Melhor custo benefício!</span>}
                    </div>
                </div>

                {/* Plans Grid/Slider */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
                    <AnimatePresence mode='wait'>
                        {plans.map((plan) => (
                            <motion.div
                                key={`${plan.id}-${cycle}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`relative rounded-3xl p-8 flex flex-col border transition-all duration-300 ${plan.highlight
                                    ? 'bg-dark border-primary shadow-2xl shadow-primary/10 scale-100 md:scale-105 z-10'
                                    : 'bg-dark/50 border-gray-800 hover:border-gray-600'
                                    }`}
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
                                    href="https://api.whatsapp.com/send?phone=5577998620419&text=Ola,%20gostaria%20de%20saber%20mais%20sobre%20a%20Hazak!"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 block text-center ${plan.highlight
                                        ? 'bg-primary text-black hover:bg-primary-hover shadow-lg shadow-primary/25'
                                        : 'bg-gray-800 text-white hover:bg-gray-700'
                                        }`}>
                                    Escolher {plan.name}
                                </a>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
