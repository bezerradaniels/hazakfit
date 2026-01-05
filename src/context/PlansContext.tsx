import { createContext, useContext, type ReactNode } from 'react';
import { Calendar, Zap, Clock, Trophy } from 'lucide-react';

export type PlanDuration = 'monthly' | 'quarterly' | 'semiannual' | 'yearly';

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
        price: '129,90',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Sem fidelidade'],
        highlight: false
    },
    {
        id: 'quarterly',
        name: 'Trimestral',
        icon: Zap,
        price: '330',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Pague em até 3x'],
        highlight: false
    },
    {
        id: 'semiannual',
        name: 'Semestral',
        icon: Clock,
        price: '635',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'Pague em até 3x'],
        highlight: false
    },
    {
        id: 'yearly',
        name: 'Anual',
        icon: Trophy,
        price: '1.080',
        features: ['Acesso total à academia', 'Sem taxa de matrícula', 'Acompanhamento profissional', 'Horário livre', 'À vista ou R$1.200 em até 10x'],
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
