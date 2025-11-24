import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import img1 from '../assets/img/1.png';
import img2 from '../assets/img/2.png';
import img3 from '../assets/img/3.png';
import img4 from '../assets/img/4.png';
import img5 from '../assets/img/5.png';
import img6 from '../assets/img/6.png';

interface GalleryContextType {
    images: string[];
    addImage: (image: string) => void;
    removeImage: (index: number) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

const defaultImages = [img1, img2, img3, img4, img5, img6];

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
    const [images, setImages] = useState<string[]>(() => {
        const stored = localStorage.getItem('hazakfit-gallery');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return defaultImages;
            }
        }
        return defaultImages;
    });

    useEffect(() => {
        localStorage.setItem('hazakfit-gallery', JSON.stringify(images));
    }, [images]);

    const addImage = (image: string) => {
        if (images.length < 10) {
            setImages(prev => [...prev, image]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <GalleryContext.Provider value={{ images, addImage, removeImage }}>
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
