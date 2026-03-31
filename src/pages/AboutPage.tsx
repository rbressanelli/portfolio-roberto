import { Box } from "@mui/material";
import SectionHero from "../components/SectionHero";
import ContactsCard from "../components/ContactsCard";

interface AboutPageProps {
  content: {
    about: {
      title: string;
      text: string;
      photo: string;
    };
  };
}

function AboutPage({ content }: AboutPageProps) {
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

