import { Paper, Stack, Link, Box } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const ContactsCard = () => {
  const contacts = [
    {
      icon: <EmailRoundedIcon color="primary" />,
      label: "Roberto Bressanelli",
      href: "mailto:rbressanelli@gmail.com",
    },
    {
      icon: <LinkedInIcon color="primary" />,
      label: "Linkedin",
      href: "https://www.linkedin.com/in/robertobressanelli/",
    },
    {
      icon: <GitHubIcon color="primary" />,
      label: "GitHub",
      href: "https://github.com/rbressanelli",
    },
  ];

  return (
    <Paper elevation={2} sx={{ p: { xs: 2.5, md: 4 }, mt: 3, borderRadius: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 4 }}
        justifyContent="space-around"
        alignItems="center"
      >
        {contacts.map((contact, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {contact.icon}
            </Box>
            <Link
              href={contact.href}
              target={contact.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              underline="hover"
              color="text.primary"
              sx={{
                fontSize: "1.05rem",
                fontWeight: 500,
                transition: "all 0.2s",
                "&:hover": { 
                  color: "primary.main",
                  transform: "translateY(-1px)"
                },
              }}
            >
              {contact.label}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default ContactsCard;
