import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import AdminPage from './pages/AdminPage';
import AsideMenu from './components/AsideMenu';
import { usePortfolioContent } from './hooks/usePortfolioContent';

function App() {
  const { content, setContent, resetContent, loading } = usePortfolioContent();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('portfolio_theme_mode') || 'system');

  const resolvedMode = themeMode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : themeMode;

  useEffect(() => {
    localStorage.setItem('portfolio_theme_mode', themeMode);
  }, [themeMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedMode,
          primary: {
            main: resolvedMode === 'dark' ? '#90caf9' : '#1565c0',
          },
          background: {
            default: resolvedMode === 'dark' ? '#0f172a' : '#f7f9fc',
            paper: resolvedMode === 'dark' ? '#111827' : '#ffffff',
          },
        },
        shape: {
          borderRadius: 18,
        },
        typography: {
          fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
          h3: {
            fontWeight: 700,
          },
          h4: {
            fontWeight: 700,
          },
          h5: {
            fontWeight: 600,
          },
        },
      }),
    [resolvedMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AsideMenu
          themeMode={themeMode}
          onChangeTheme={setThemeMode}
        />

        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          {loading ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
               Carregando conteúdo...
             </Box>
          ) : (
          <Routes>
            <Route path="/" element={<HomePage content={content} />} />
            <Route path="/about" element={<AboutPage content={content} />} />
            <Route path="/projects" element={<ProjectsPage content={content} />} />
            <Route
              path="/admin"
              element={
                <AdminPage
                  content={content}
                  setContent={setContent}
                  resetContent={resetContent}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
