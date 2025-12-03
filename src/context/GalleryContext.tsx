import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, IMAGES_BUCKET } from '../lib/supabase';
import img1 from '../assets/img/1.png';
import img2 from '../assets/img/2.png';
import img3 from '../assets/img/3.png';
import img4 from '../assets/img/4.png';
import img5 from '../assets/img/5.png';
import img6 from '../assets/img/6.png';

interface GalleryContextType {
    images: string[];
    loading: boolean;
    addImage: (file: File) => Promise<void>;
    removeImage: (imageUrl: string) => Promise<void>;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

const defaultImages = [img1, img2, img3, img4, img5, img6];

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Carregar imagens do Supabase
    const loadImages = async () => {
        try {
            const { data, error } = await supabase.storage
                .from(IMAGES_BUCKET)
                .list('gallery', {
                    sortBy: { column: 'created_at', order: 'desc' }
                });

            if (error) throw error;

            if (data && data.length > 0) {
                const imageUrls = data.map(file => {
                    const { data: urlData } = supabase.storage
                        .from(IMAGES_BUCKET)
                        .getPublicUrl(`gallery/${file.name}`);
                    return urlData.publicUrl;
                });
                setImages(imageUrls);
            } else {
                setImages(defaultImages);
            }
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    const addImage = async (file: File) => {
        if (images.length >= 10) {
            throw new Error('Máximo de 10 imagens atingido');
        }

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `gallery/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(IMAGES_BUCKET)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            await loadImages();
        } catch (error) {
            console.error('Erro ao adicionar imagem:', error);
            throw error;
        }
    };

    const removeImage = async (imageUrl: string) => {
        try {
            // Extrair o caminho do arquivo da URL
            const urlParts = imageUrl.split('/storage/v1/object/public/' + IMAGES_BUCKET + '/');
            if (urlParts.length > 1) {
                const filePath = urlParts[1];
                
                const { error } = await supabase.storage
                    .from(IMAGES_BUCKET)
                    .remove([filePath]);

                if (error) throw error;
            }

            await loadImages();
        } catch (error) {
            console.error('Erro ao remover imagem:', error);
            throw error;
        }
    };

    return (
        <GalleryContext.Provider value={{ images, loading, addImage, removeImage }}>
            {children}
        </GalleryContext.Provider>
    );
};

export const useGallery = () => {
    const context = useContext(GalleryContext);
    if (context === undefined) {
        throw new Error('useGallery must be used within a GalleryProvider');
    }
    return context;
};
