import { Box } from '@mui/material';
import SectionHero from '../components/SectionHero';

function AboutPage({ content }) {
  return (
    <Box>
      <SectionHero
        title={content.about.title}
        text={content.about.text}
        image={content.about.photo}
        imageAlt="Foto de perfil"
      />
    </Box>
  );
}

export default AboutPage;
