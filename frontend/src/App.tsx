import { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <AuthProvider>
                <AppRouter darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;