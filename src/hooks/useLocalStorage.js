import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        try {
            const storedData = localStorage.getItem(key);
            return storedData ? JSON.parse(storedData) : defaultValue;
        } catch (error) {
            console.warn(`Could not parse localStorage item for key "${key}":`, error);
            return defaultValue;
        }
    });

    const setLocalStorageValue = (newValue) => {
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        } catch (error) {
            console.error(`Could not store value for key "${key}":`, error);
        }
    };

    return [value, setLocalStorageValue];
};
