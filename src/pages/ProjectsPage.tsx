import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SectionHero from '../components/SectionHero';
import ProjectCard from '../components/ProjectCard';
import { DragDropProvider, PointerSensor, KeyboardSensor } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { closestCorners } from '@dnd-kit/collision';
import { Project, Content } from '../types';

interface SortableProps {
  id: string | number;
  index: number;
  project: Project;
}

function Sortable({ id, index, project }: SortableProps) {
  // Nesta versão, o detector de colisão é configurado individualmente em cada item
  const { ref } = useSortable({ 
    id, 
    index, 
    collisionDetector: closestCorners 
  });

  return (
    <li 
      style={{ 
        textDecoration: "none", 
        margin: "10px", 
        listStyle: "none",
        cursor: 'grab',
        touchAction: 'none'
      }} 
      ref={ref} 
      className="item"
    >
      <ProjectCard project={project} />
    </li>
  );
}

function ProjectsPage({ content, setContent }: { content: Content, setContent: (content: Content) => void }) {
  const [localProjects, setLocalProjects] = useState<Project[]>(content.projects);

  useEffect(() => {
    setLocalProjects(content.projects);
  }, [content.projects]);
  
  const handleDragOver = (event: any) => {
    const { source, target } = event.operation;
    
    if (target && source.id !== target.id) {
      const oldIndex = localProjects.findIndex((p) => String(p.id) === String(source.id));
      const newIndex = localProjects.findIndex((p) => String(p.id) === String(target.id));

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newProjects = [...localProjects];
        const [removed] = newProjects.splice(oldIndex, 1);
        newProjects.splice(newIndex, 0, removed);
        setLocalProjects(newProjects);
      }
    }
  };

  const handleDragEnd = () => {
    setContent({
      ...content,
      projects: localProjects,
    });
  };

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

      <DragDropProvider 
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd} 
        sensors={[PointerSensor, KeyboardSensor]}
      >
        <Grid container spacing={2}>
          <ul style={{ 
            listStyleType: "none", 
            textDecoration: "none", 
            padding: 0, 
            margin: 0, 
            display: "flex", 
            flexDirection: "row", 
            flexWrap: "wrap", 
            justifyContent: "center",
            width: '100%'
          }}>
            {localProjects.map((project: Project, index: number) => (
              <Sortable key={project.id} id={project.id} index={index} project={project} />
            ))}
          </ul>
        </Grid>
      </DragDropProvider>
    </Box>
  );
}

export default ProjectsPage;
