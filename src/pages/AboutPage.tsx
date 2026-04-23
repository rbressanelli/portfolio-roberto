import { Box } from "@mui/material";
import SectionHero from "../components/SectionHero";
import ContactsCard from "../components/ContactsCard";

import { Content } from "../types";

function AboutPage({ content }: { content: Content }) {
  return (
    <Box>
      <SectionHero
        title={content.about.title}
        text={content.about.text}
        image={content.about.photo}
        imageAlt="Foto de perfil"
      />
      <ContactsCard />
    </Box>
  );
}

export default AboutPage;

