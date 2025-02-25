export const safeLocalStorage = {
    getItem: (key: string): string | null => {
        try {
            return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
        } catch (error) {
            console.error('LocalStorage access error:', error);
            return null;
        }
    },
    setItem: (key: string, value: string): void => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, value);
            }
        } catch (error) {
            console.error('LocalStorage set error:', error);
        }
    },
    removeItem: (key: string): void => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(key);
            }
        } catch (error) {
            console.error('LocalStorage remove error:', error);
        }
    }
};