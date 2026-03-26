import { Box, Grid, Typography } from '@mui/material';
import SectionHero from '../components/SectionHero';
import ProjectCard from '../components/ProjectCard';

function ProjectsPage({ content }) {
  return (
    <Box>
      <SectionHero
        title={content.projectsPage.title}
        text={content.projectsPage.text}
        image={content.projectsPage.image}
        imageAlt="Imagem que remete a projetos"
      />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Meus projetos
      </Typography>

      <Grid container spacing={2}>
        {content.projects.map((project) => (
          <Grid key={project.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProjectsPage;
