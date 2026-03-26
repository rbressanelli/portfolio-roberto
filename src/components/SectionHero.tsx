import { Grid, Paper, Typography, Box } from '@mui/material';

function SectionHero({ title, text, image, imageAlt }) {
  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, lg: 7 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {text}
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <Paper elevation={0} sx={{ p: 1.5, height: '100%' }}>
          <Box
            component="img"
            src={image}
            alt={imageAlt}
            sx={{
              width: '100%',
              height: { xs: 260, md: 360 },
              objectFit: 'cover',
              borderRadius: 4,
              display: 'block',
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SectionHero;
