import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    show: boolean;
    onClose: () => void;
}

export const Toast = ({ message, show, onClose }: ToastProps) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    className="fixed top-24 right-8 z-50 bg-primary text-black px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-md"
                >
                    <CheckCircle size={24} className="shrink-0" />
                    <span className="font-bold">{message}</span>
                    <button
                        id="toast-close-btn"
                        onClick={onClose}
                        className="ml-2 hover:bg-black/10 rounded-full p-1 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
