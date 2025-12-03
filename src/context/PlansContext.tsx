import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
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
    const [plans, setPlans] = useState<Plan[]>([]);

    // Carregar planos do Supabase
    const loadPlans = async () => {
        try {
            const { data, error } = await supabase
                .from('plans')
                .select('*')
                .order('id');

            if (error) throw error;

            if (data && data.length > 0) {
                const loadedPlans = data.map((plan: any) => ({
                    id: plan.id,
                    name: plan.name,
                    icon: defaultPlans.find(p => p.id === plan.id)?.icon || Calendar,
                    price: plan.price,
                    features: plan.features,
                    highlight: plan.highlight
                }));
                setPlans(loadedPlans);
            } else {
                setPlans(defaultPlans);
            }
        } catch (error) {
            console.error('Erro ao carregar planos:', error);
        }
    };

    useEffect(() => {
        loadPlans();
        // Realtime subscription for plans
        const channel = supabase.channel('realtime:plans')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'plans' }, () => {
                loadPlans();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const updatePlanPrice = async (id: PlanDuration, newPrice: string) => {
        try {
            const { error } = await supabase
                .from('plans')
                .update({ price: newPrice })
                .eq('id', id);

            if (error) throw error;

            await loadPlans();
        } catch (error) {
            console.error('Erro ao atualizar preço:', error);
            throw error;
        }
    };

    const updatePlanFeatures = async (id: PlanDuration, newFeatures: string[]) => {
        try {
            const { error } = await supabase
                .from('plans')
                .update({ features: newFeatures })
                .eq('id', id);

            if (error) throw error;

            await loadPlans();
        } catch (error) {
            console.error('Erro ao atualizar features:', error);
            throw error;
        }
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
