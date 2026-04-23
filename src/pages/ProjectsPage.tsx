import { Box, Grid, Typography } from '@mui/material';
import SectionHero from '../components/SectionHero';
import ProjectCard from '../components/ProjectCard';
import { useSortable } from '@dnd-kit/react/sortable';
import { Project, Content } from '../types';

interface SortableProps {
  id: string | number;
  index: number;
  project: Project;
}

function Sortable({ id, index, project }: SortableProps) {
  const { ref } = useSortable({ id, index });

  return (
    <li style={{ textDecoration: "none", margin: "10px" }} ref={ref} className="item"><ProjectCard project={project} /></li>
  );
}

function ProjectsPage({ content }: { content: Content }) {
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
        <ul style={{ listStyleType: "none", textDecoration: "none", padding: 0, margin: 0, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {/* <Grid size={{xs: 12, sm: 6, md: 4}}> */}
            {content.projects.map((project: Project, index: number) => (
              <Sortable key={project.id} id={project.id} index={index} project={project} />
            ))}
          {/* </Grid> */}
        </ul>
      </Grid>
    </Box>
  );
}

export default ProjectsPage;
