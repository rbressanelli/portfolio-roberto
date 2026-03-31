import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";

interface Project {
  title: string;
  description: string;
  stack: string;
  link: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      elevation={5}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: (theme) => `1px solid ${theme.palette.divider}`,

        "&:hover": {
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? '#232b3a'
              : "#f4f4f4",
          transform: "scale(1.02)",
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack height={'100%'} spacing={2}>
          <Typography variant="h6">{project.title}</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 1, height: "100%" }}>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              {project.description}
            </Typography>
            <Chip
              label={project.stack}
              variant="outlined"
              sx={{ width: "fit-content", mt: 2 }}
            />
          </Box>
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
