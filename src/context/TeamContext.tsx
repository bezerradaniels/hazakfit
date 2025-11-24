import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    photo: string; // base64 or URL
}

interface TeamContextType {
    team: TeamMember[];
    addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
    updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
    removeTeamMember: (id: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const defaultTeam: TeamMember[] = [];

export const TeamProvider = ({ children }: { children: ReactNode }) => {
    const [team, setTeam] = useState<TeamMember[]>(() => {
        const stored = localStorage.getItem('hazakfit-team');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return defaultTeam;
            }
        }
        return defaultTeam;
    });

    useEffect(() => {
        localStorage.setItem('hazakfit-team', JSON.stringify(team));
    }, [team]);

    const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
        const newMember = {
            ...member,
            id: Date.now().toString()
        };
        setTeam(prev => [...prev, newMember]);
    };

    const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
        setTeam(prev => prev.map(member =>
            member.id === id ? { ...member, ...updates } : member
        ));
    };

    const removeTeamMember = (id: string) => {
        setTeam(prev => prev.filter(member => member.id !== id));
    };

    return (
        <TeamContext.Provider value={{ team, addTeamMember, updateTeamMember, removeTeamMember }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (context === undefined) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
};
