import { createContext, useContext, type ReactNode } from 'react';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    photo: string;
}

interface TeamContextType {
    team: TeamMember[];
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const defaultTeam: TeamMember[] = [];

export const TeamProvider = ({ children }: { children: ReactNode }) => {
    return (
        <TeamContext.Provider value={{ team: defaultTeam }}>
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
