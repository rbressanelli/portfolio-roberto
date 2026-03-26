import { Card, CardActions, CardContent, Button, Typography, Stack, Chip } from '@mui/material';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';

function ProjectCard({ project }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={2}>
          <Typography variant="h6">{project.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {project.description}
          </Typography>
          <Chip label={project.stack} variant="outlined" sx={{ width: 'fit-content' }} />
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          href={project.link}
          target="_blank"
          rel="noreferrer"
          variant="outlined"
          endIcon={<LaunchRoundedIcon />}
        >
          Ver projeto
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;
