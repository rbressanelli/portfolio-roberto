import {
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Technology {
  id: string | number;
  icon: string;
  name: string;
  url: string;
}

function TechnologyList({ technologies }: { technologies: Technology[] }) {
  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Tecnologias
      </Typography>

      <List disablePadding>
        {technologies.map((technology) => (
          <ListItem
            key={technology.id}
            disablePadding
            sx={{
              mb: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              px: 2,
              py: 1.5,
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Typography variant="h6">{technology.icon}</Typography>
              <ListItemText primary={technology.name} />
              <Link href={technology.url} target="_blank" rel="noreferrer">
                Visitar
              </Link>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TechnologyList;
