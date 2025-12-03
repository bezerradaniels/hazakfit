import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, IMAGES_BUCKET } from '../lib/supabase';

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    photo: string; // URL
}

interface TeamContextType {
    team: TeamMember[];
    loading: boolean;
    addTeamMember: (name: string, role: string, photoFile: File) => Promise<void>;
    updateTeamMember: (id: string, name?: string, role?: string, photoFile?: File) => Promise<void>;
    removeTeamMember: (id: string) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const defaultTeam: TeamMember[] = [];

export const TeamProvider = ({ children }: { children: ReactNode }) => {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    // Carregar equipe do Supabase
    const loadTeam = async () => {
        try {
            const { data, error } = await supabase
                .from('team')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                setTeam(data);
            } else {
                setTeam(defaultTeam);
            }
        } catch (error) {
            console.error('Erro ao carregar equipe:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeam();
        // Realtime subscription for team
        const channel = supabase.channel('realtime:team')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'team' }, () => {
                loadTeam();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const addTeamMember = async (name: string, role: string, photoFile: File) => {
        try {
            // Upload da foto
            const fileExt = photoFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `team/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(IMAGES_BUCKET)
                .upload(filePath, photoFile);

            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage
                .from(IMAGES_BUCKET)
                .getPublicUrl(filePath);

            // Adicionar membro ao banco
            const { error } = await supabase
                .from('team')
                .insert([{ name, role, photo: urlData.publicUrl }]);

            if (error) throw error;

            await loadTeam();
        } catch (error) {
            console.error('Erro ao adicionar membro:', error);
            throw error;
        }
    };

    const updateTeamMember = async (id: string, name?: string, role?: string, photoFile?: File) => {
        try {
            const updates: Partial<TeamMember> = {};
            
            if (name) updates.name = name;
            if (role) updates.role = role;
            
            if (photoFile) {
                // Upload da nova foto
                const fileExt = photoFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `team/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from(IMAGES_BUCKET)
                    .upload(filePath, photoFile);

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage
                    .from(IMAGES_BUCKET)
                    .getPublicUrl(filePath);

                updates.photo = urlData.publicUrl;
            }

            const { error } = await supabase
                .from('team')
                .update(updates)
                .eq('id', id);

            if (error) throw error;

            await loadTeam();
        } catch (error) {
            console.error('Erro ao atualizar membro:', error);
            throw error;
        }
    };

    const removeTeamMember = async (id: string) => {
        try {
            const member = team.find(m => m.id === id);
            
            if (member?.photo) {
                // Remover foto do storage
                const urlParts = member.photo.split('/storage/v1/object/public/' + IMAGES_BUCKET + '/');
                if (urlParts.length > 1) {
                    const filePath = urlParts[1];
                    await supabase.storage
                        .from(IMAGES_BUCKET)
                        .remove([filePath]);
                }
            }

            const { error } = await supabase
                .from('team')
                .delete()
                .eq('id', id);

            if (error) throw error;

            await loadTeam();
        } catch (error) {
            console.error('Erro ao remover membro:', error);
            throw error;
        }
    };

    return (
        <TeamContext.Provider value={{ team, loading, addTeamMember, updateTeamMember, removeTeamMember }}>
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
