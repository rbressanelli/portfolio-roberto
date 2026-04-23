import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { defaultContent } from "../data/defaultContent";
import { supabase } from "../lib/supabaseClient";

const emptyProject = { title: "", description: "", stack: "", link: "" };
const emptyTechnology = { name: "", icon: "", url: "" };

const userEmail = import.meta.env.VITE_ADMIN_EMAIL;

function AdminPage({ content, setContent, resetContent }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);

  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(content)));

  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(content)));
  }, [content]);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email === userEmail) {
        setIsAuthenticated(true);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user?.email === userEmail) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setError("");
    setLoadingMsg("");
    if (!email) {
      setError("Digite seu email.");
      return;
    }

    if (email !== userEmail) {
      setError("Usuário não autorizado.");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.href,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setLoadingMsg("Link de login enviado! Verifique seu email.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>, section: string, field: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(field);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${section}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      handleSectionChange(section, field, publicUrl);
    } catch (err: any) {
      alert(`Erro ao fazer upload: ${err.message}`);
    } finally {
      setUploading(null);
    }
  };

  const handleSectionChange = (
    section: string,
    field: string,
    value: string,
  ) => {
    setDraft((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleTechnologyChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    setDraft((prev: any) => ({
      ...prev,
      technologies: prev.technologies.map((item: any, currentIndex: number) =>
        currentIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleTechnologyUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const techName = draft.technologies[index].name || "tech";
    const uploadId = `tech-${index}`;
    setUploading(uploadId);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `tech_${techName.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.${fileExt}`;
      const filePath = `technologies/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      handleTechnologyChange(index, "icon", publicUrl);
    } catch (err: any) {
      alert(`Erro ao fazer upload do ícone: ${err.message}`);
    } finally {
      setUploading(null);
    }
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    setDraft((prev: any) => ({
      ...prev,
      projects: prev.projects.map((item: any, currentIndex: number) =>
        currentIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addTechnology = () => {
    setDraft((prev: any) => ({
      ...prev,
      technologies: [
        { ...emptyTechnology, id: Date.now() },
        ...prev.technologies,
      ],
    }));
  };

  const removeTechnology = (index: number) => {
    setDraft((prev: any) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (_: any, currentIndex: number) => currentIndex !== index,
      ),
    }));
  };

  const addProject = () => {
    setDraft((prev: any) => ({
      ...prev,
      projects: [
        { ...emptyProject, id: Date.now() },
        ...prev.projects,
      ],
    }));
  };

  const removeProject = (index: number) => {
    setDraft((prev: any) => ({
      ...prev,
      projects: prev.projects.filter(
        (_: any, currentIndex: number) => currentIndex !== index,
      ),
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
            Acesso administrativo restrito. Insira o email mestre para receber
            um link de acesso.
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
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, position: "fixed", zIndex: 1, width: "calc(100% - 365px)", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ md: "center" }}
        >
          <Box sx={{}}>
            <Typography variant="h4">Painel administrativo</Typography>
            <Typography color="text.secondary">
              As alterações são salvas diretamente no banco de dados do
              Supabase.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
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

      <div style={{ marginTop: "150px" }}></div>
      <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Home
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}> 
            <TextField
              label="Título da saudação"
              value={draft.home.greetingTitle}
              onChange={(event) =>
                handleSectionChange("home", "greetingTitle", event.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 1,
                  overflow: "hidden",
                  bgcolor: "grey.100",
                }}
              >
                <img
                  src={draft.home.heroImage}
                  alt="Previa"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Button
                variant="outlined"
                component="label"
                disabled={uploading === "heroImage"}
              >
                {uploading === "heroImage" ? <CircularProgress size={24} /> : "Mudar imagem Home"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleUpload(e, "home", "heroImage")}
                />
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Texto de apresentação"
              value={draft.home.greetingText}
              onChange={(event) =>
                handleSectionChange("home", "greetingText", event.target.value)
              }
              multiline
              minRows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          About
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Título"
              value={draft.about.title}
              onChange={(event) =>
                handleSectionChange("about", "title", event.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 1,
                  overflow: "hidden",
                  bgcolor: "grey.100",
                }}
              >
                <img
                  src={draft.about.photo}
                  alt="Previa"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Button
                variant="outlined"
                component="label"
                disabled={uploading === "photo"}
              >
                {uploading === "photo" ? <CircularProgress size={24} /> : "Mudar foto About"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleUpload(e, "about", "photo")}
                />
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Texto formal"
              value={draft.about.text}
              onChange={(event) =>
                handleSectionChange("about", "text", event.target.value)
              }
              multiline
              minRows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Página de projetos
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Título"
              value={draft.projectsPage.title}
              onChange={(event) =>
                handleSectionChange("projectsPage", "title", event.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 1,
                  overflow: "hidden",
                  bgcolor: "grey.100",
                }}
              >
                <img
                  src={draft.projectsPage.image}
                  alt="Previa"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Button
                variant="outlined"
                component="label"
                disabled={uploading === "image"}
              >
                {uploading === "image" ? <CircularProgress size={24} /> : "Mudar imagem Projetos"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleUpload(e, "projectsPage", "image")}
                />
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Texto da seção"
              value={draft.projectsPage.text}
              onChange={(event) =>
                handleSectionChange("projectsPage", "text", event.target.value)
              }
              multiline
              minRows={4}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h5">Tecnologias</Typography>
          <Button variant="outlined" onClick={addTechnology}>
            Adicionar tecnologia
          </Button>
        </Stack>

        <Stack spacing={2}>
          {draft.technologies.map((technology: any, index: number) => (
            <Paper key={technology.id} variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    label="Nome"
                    value={technology.name}
                    onChange={(event) =>
                      handleTechnologyChange(index, "name", event.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        overflow: "hidden",
                        bgcolor: "grey.100",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      {technology.icon && (technology.icon.startsWith("http") || technology.icon.startsWith("/")) ? (
                        <img
                          src={technology.icon}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      ) : (
                        <Typography variant="h6">{technology.icon}</Typography>
                      )}
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      component="label"
                      disabled={uploading === `tech-${index}`}
                      sx={{ minWidth: 120 }}
                    >
                      {uploading === `tech-${index}` ? <CircularProgress size={20} /> : "Mudar Ícone"}
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleTechnologyUpload(e, index)}
                      />
                    </Button>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Link"
                    value={technology.url}
                    onChange={(event) =>
                      handleTechnologyChange(index, "url", event.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Button
                    color="error"
                    variant="text"
                    onClick={() => removeTechnology(index)}
                    fullWidth
                  >
                    Remover
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>
      </Paper>

      <Paper elevation={1} sx={{ p: { xs: 3, md: 4 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h5">Projetos</Typography>
          <Button variant="outlined" onClick={addProject}>
            Adicionar projeto
          </Button>
        </Stack>

        <Stack spacing={2}>
          {draft.projects.map((project: any, index: number) => (
            <Paper key={project.id} variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Título"
                      value={project.title}
                      onChange={(event) =>
                        handleProjectChange(index, "title", event.target.value)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Stack"
                      value={project.stack}
                      onChange={(event) =>
                        handleProjectChange(index, "stack", event.target.value)
                      }
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Descrição"
                  value={project.description}
                  onChange={(event) =>
                    handleProjectChange(
                      index,
                      "description",
                      event.target.value,
                    )
                  }
                  multiline
                  minRows={3}
                  fullWidth
                />

                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, md: 9 }}>
                    <TextField
                      label="Link do projeto"
                      value={project.link}
                      onChange={(event) =>
                        handleProjectChange(index, "link", event.target.value)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Button
                      color="error"
                      variant="text"
                      onClick={() => removeProject(index)}
                      fullWidth
                    >
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

