import { createContext, useContext, type ReactNode } from 'react';
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
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

const defaultPlans: Plan[] = [
    {
        id: 'monthly',
        name: 'Mensal',
        icon: Calendar,
        price: '129',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Sem fidelidade'],
        highlight: false
    },
    {
        id: 'quarterly',
        name: 'Trimestral',
        icon: Zap,
        price: '110',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Contrato de 3 meses'],
        highlight: false
    },
    {
        id: 'yearly',
        name: 'Anual',
        icon: Trophy,
        price: '83',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Contrato de 12 meses'],
        highlight: true
    }
];

export const PlansProvider = ({ children }: { children: ReactNode }) => {
    return (
        <PlansContext.Provider value={{ plans: defaultPlans }}>
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
