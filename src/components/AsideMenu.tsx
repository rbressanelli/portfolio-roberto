import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';

const menuItems = [
  { to: '/', label: 'Home', icon: <HomeRoundedIcon fontSize="small" /> },
  { to: '/about', label: 'About', icon: <PersonRoundedIcon fontSize="small" /> },
  { to: '/projects', label: 'Projects', icon: <WorkRoundedIcon fontSize="small" /> },
];

function AsideMenu({ themeMode, onChangeTheme }: any) {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [place, setPlace] = useState('Obtendo local...');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        const city = data.city || 'Cidade não identificada';
        const region = data.region || '';
        const country = data.country_name || '';
        setPlace([city, region, country].filter(Boolean).join(', '));
      } catch {
        setPlace('Local não disponível');
      }
    }

    getLocation();
  }, []);

  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(currentTime),
    [currentTime],
  );

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: 94, md: 300 },
        p: { xs: 1.5, md: 2 },
        position: 'sticky',
        top: 0,
        height: '100vh',
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          p: { xs: 1.5, md: 2.5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, display: { xs: 'none', md: 'block' } }}>
              Meu Portfólio
            </Typography>
          </Box>

          <Stack spacing={1}>
            {menuItems.map((item) => {
              const active = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  underline="none"
                  color="inherit"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    px: 1.5,
                    py: 1.25,
                    borderRadius: 3,
                    bgcolor: active ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  {item.icon}
                  <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{item.label}</Typography>
                </Link>
              );
            })}
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Divider />

          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <PaletteRoundedIcon fontSize="small" />
              <Typography sx={{ display: { xs: 'none', md: 'block' } }}>Tema</Typography>
            </Stack>
            <FormControl fullWidth size="small">
              <InputLabel id="theme-mode-label">Tema</InputLabel>
              <Select
                labelId="theme-mode-label"
                value={themeMode}
                label="Tema"
                onChange={(event) => onChangeTheme(event.target.value)}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">Sistema</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeRoundedIcon fontSize="small" />
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                {formattedTime}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <PublicRoundedIcon fontSize="small" sx={{ mt: 0.15 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                {place}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AsideMenu;
