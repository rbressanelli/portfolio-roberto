import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
  
import { defaultContent } from '../data/defaultContent';
import { supabase } from '../lib/supabaseClient';

const emptyProject = { title: '', description: '', stack: '', link: '' };
const emptyTechnology = { name: '', icon: '', url: '' };

function AdminPage({ content, setContent, resetContent }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');

  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(content)));

  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(content)));
  }, [content]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === 'rbressanelli@gmail.com') {
        setIsAuthenticated(true);
      }
    };
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user?.email === 'rbressanelli@gmail.com') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setError('');
    setLoadingMsg('');
    if (!email) {
      setError('Digite seu email.');
      return;
    }
    
    if (email !== 'rbressanelli@gmail.com') {
      setError('Usuário não autorizado.');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.href,
        }
      });
      if (error) {
        setError(error.message);
      } else {
        setLoadingMsg('Link de login enviado! Verifique seu email.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSectionChange = (section, field, value) => {
    setDraft((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleTechnologyChange = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      technologies: prev.technologies.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      projects: prev.projects.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addTechnology = () => {
    setDraft((prev) => ({
      ...prev,
      technologies: [...prev.technologies, { ...emptyTechnology, id: Date.now() }],
    }));
  };

  const removeTechnology = (index) => {
    setDraft((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const addProject = () => {
    setDraft((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...emptyProject, id: Date.now() }],
    }));
  };

  const removeProject = (index) => {
    setDraft((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const saveChanges = () => {
    setContent(draft);
  };

  const handleReset = () => {
    resetContent();
    setDraft(JSON.parse(JSON.stringify(defaultContent)));
  };

  if (!isAuthenticated) {
    return (
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, maxWidth: 520 }}>
        <Stack spacing={2}>
          <Typography variant="h4">Admin</Typography>
          <Typography color="text.secondary">
            Acesso administrativo restrito. Insira o email mestre para receber um link de acesso.
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          {error ? <Alert severity="error">{error}</Alert> : null}
          {loadingMsg ? <Alert severity="success">{loadingMsg}</Alert> : null}
          <Button variant="contained" onClick={handleLogin}>
            Enviar Link
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack spacing={3}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ md: 'center' }}>
          <Box>
            <Typography variant="h4">Painel administrativo</Typography>
            <Typography color="text.secondary">
              As alterações são salvas diretamente no banco de dados do Supabase.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Sair
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              Restaurar padrão
            </Button>
            <Button variant="contained" onClick={saveChanges}>
              Salvar alterações
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Home
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Título da saudação"
              value={draft.home.greetingTitle}
              onChange={(event) => handleSectionChange('home', 'greetingTitle', event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="URL da imagem da Home"
              value={draft.home.heroImage}
              onChange={(event) => handleSectionChange('home', 'heroImage', event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Texto de apresentação"
              value={draft.home.greetingText}
              onChange={(event) => handleSectionChange('home', 'greetingText', event.target.value)}
              multiline
              minRows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          About
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Título"
              value={draft.about.title}
              onChange={(event) => handleSectionChange('about', 'title', event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="URL da foto"
              value={draft.about.photo}
              onChange={(event) => handleSectionChange('about', 'photo', event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Texto formal"
              value={draft.about.text}
              onChange={(event) => handleSectionChange('about', 'text', event.target.value)}
              multiline
              minRows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Página de projetos
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Título"
              value={draft.projectsPage.title}
              onChange={(event) => handleSectionChange('projectsPage', 'title', event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="URL da imagem"
              value={draft.projectsPage.image}
              onChange={(event) => handleSectionChange('projectsPage', 'image', event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Texto da seção"
              value={draft.projectsPage.text}
              onChange={(event) => handleSectionChange('projectsPage', 'text', event.target.value)}
              multiline
              minRows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h5">Tecnologias</Typography>
          <Button variant="outlined" onClick={addTechnology}>
            Adicionar tecnologia
          </Button>
        </Stack>

        <Stack spacing={2}>
          {draft.technologies.map((technology, index) => (
            <Paper key={technology.id} variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label="Nome"
                    value={technology.name}
                    onChange={(event) => handleTechnologyChange(index, 'name', event.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <TextField
                    label="Ícone"
                    value={technology.icon}
                    onChange={(event) => handleTechnologyChange(index, 'icon', event.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                  <TextField
                    label="Link"
                    value={technology.url}
                    onChange={(event) => handleTechnologyChange(index, 'url', event.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Button color="error" variant="text" onClick={() => removeTechnology(index)} fullWidth>
                    Remover
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h5">Projetos</Typography>
          <Button variant="outlined" onClick={addProject}>
            Adicionar projeto
          </Button>
        </Stack>

        <Stack spacing={2}>
          {draft.projects.map((project, index) => (
            <Paper key={project.id} variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Título"
                      value={project.title}
                      onChange={(event) => handleProjectChange(index, 'title', event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Stack"
                      value={project.stack}
                      onChange={(event) => handleProjectChange(index, 'stack', event.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Descrição"
                  value={project.description}
                  onChange={(event) => handleProjectChange(index, 'description', event.target.value)}
                  multiline
                  minRows={3}
                  fullWidth
                />

                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 9 }}>
                    <TextField
                      label="Link do projeto"
                      value={project.link}
                      onChange={(event) => handleProjectChange(index, 'link', event.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Button color="error" variant="text" onClick={() => removeProject(index)} fullWidth>
                      Remover
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>

      <Divider />
    </Stack>
  );
}

export default AdminPage;
