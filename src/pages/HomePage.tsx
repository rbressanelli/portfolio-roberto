import { Box } from '@mui/material';
import SectionHero from '../components/SectionHero';
import TechnologyList from '../components/TechnologyList';

function HomePage({ content }) {
  return (
    <Box>
      <SectionHero
        title={content.home.greetingTitle}
        text={content.home.greetingText}
        image={content.home.heroImage}
        imageAlt="Imagem que remete à programação"
      />

      <TechnologyList technologies={content.technologies} />
    </Box>
  );
}

export default HomePage;
