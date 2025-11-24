import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { Calendar, Zap, Trophy } from 'lucide-react';

export type PlanDuration = 'monthly' | 'quarterly' | 'yearly';

export interface Plan {
    id: PlanDuration;
    name: string;
    icon: any;
    price: string;
    features: string[];
    highlight: boolean;
}

interface PlansContextType {
    plans: Plan[];
    updatePlanPrice: (id: PlanDuration, newPrice: string) => void;
    updatePlanFeatures: (id: PlanDuration, newFeatures: string[]) => void;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

const defaultPlans: Plan[] = [
    {
        id: 'monthly',
        name: 'Mensal',
        icon: Calendar,
        price: '119,90',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Sem fidelidade'],
        highlight: false
    },
    {
        id: 'quarterly',
        name: 'Trimestral',
        icon: Zap,
        price: '99,90',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Contrato de 3 meses'],
        highlight: false
    },
    {
        id: 'yearly',
        name: 'Anual',
        icon: Trophy,
        price: '69,90',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Melhor custo-benefício'],
        highlight: true
    }
];

export const PlansProvider = ({ children }: { children: ReactNode }) => {
    const [plans, setPlans] = useState<Plan[]>(() => {
        // Load from localStorage on initialization
        const stored = localStorage.getItem('hazakfit-plans');
        if (stored) {
            try {
                const parsedPlans = JSON.parse(stored);
                // Restore icon references
                return parsedPlans.map((plan: Plan) => ({
                    ...plan,
                    icon: defaultPlans.find(p => p.id === plan.id)?.icon || Calendar
                }));
            } catch {
                return defaultPlans;
            }
        }
        return defaultPlans;
    });

    // Save to localStorage whenever plans change
    useEffect(() => {
        const plansToStore = plans.map(({ icon, ...rest }) => rest);
        localStorage.setItem('hazakfit-plans', JSON.stringify(plansToStore));
    }, [plans]);

    const updatePlanPrice = (id: PlanDuration, newPrice: string) => {
        setPlans(prev => prev.map(plan =>
            plan.id === id ? { ...plan, price: newPrice } : plan
        ));
    };

    const updatePlanFeatures = (id: PlanDuration, newFeatures: string[]) => {
        setPlans(prev => prev.map(plan =>
            plan.id === id ? { ...plan, features: newFeatures } : plan
        ));
    };

    return (
        <PlansContext.Provider value={{ plans, updatePlanPrice, updatePlanFeatures }}>
            {children}
        </PlansContext.Provider>
    );
};

export const usePlans = () => {
    const context = useContext(PlansContext);
    if (context === undefined) {
        throw new Error('usePlans must be used within a PlansProvider');
    }
    return context;
};
