import { createContext, useContext, type ReactNode } from 'react';
import img1 from '../assets/img/1.png';
import img2 from '../assets/img/2.png';
import img3 from '../assets/img/3.png';
import img4 from '../assets/img/4.png';
import img5 from '../assets/img/5.png';
import img6 from '../assets/img/6.png';

interface GalleryContextType {
    images: string[];
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

const defaultImages = [img1, img2, img3, img4, img5, img6];

export const GalleryProvider = ({ children }: { children: ReactNode }) => {
    return (
        <GalleryContext.Provider value={{ images: defaultImages }}>
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
