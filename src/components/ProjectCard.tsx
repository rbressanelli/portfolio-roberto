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
import { useState, useRef, useEffect } from "react";

import { Project } from "../types";

const LINE_LIMIT = 3;

function ProjectCard({ project }: { project: Project }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current;
      if (element) {
        // Se estiver expandido, não conseguimos medir o overflow "no limite"
        // então apenas medimos se não estivesse expandido.
        // Mas a forma mais simples é medir o scrollHeight contra a altura teórica
        const lineHeight = parseInt(getComputedStyle(element).lineHeight);
        const limitHeight = lineHeight * LINE_LIMIT;
        // Adicionamos uma pequena margem de 2px para evitar problemas de arredondamento
        setIsOverflowing(element.scrollHeight > limitHeight + 2);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [project.description]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      elevation={5}
      sx={{
        maxWidth: 500,
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

            <Box sx={{ position: "relative" }}>
              <Typography
                ref={textRef}
                variant="body2"
                color="text.secondary"
                align="justify"
                sx={{
                  lineHeight: 1.7,
                  display: isExpanded ? 'block' : '-webkit-box',
                  WebkitLineClamp: isExpanded ? 'unset' : LINE_LIMIT,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                }}
              >
                {project.description}
                {isExpanded && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpansion();
                    }}
                    size="small"
                    sx={{
                      p: 0,
                      ml: 1,
                      verticalAlign: 'baseline',
                      textTransform: 'none',
                      minWidth: 'auto',
                      fontWeight: 'bold',
                      '&:hover': { background: 'none', textDecoration: 'underline' }
                    }}
                  >
                    Mostrar menos
                  </Button>
                )}
              </Typography>

              {!isExpanded && isOverflowing && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpansion();
                  }}
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    p: 0,
                    pl: 1,
                    background: (theme) =>
                      theme.palette.mode === "dark"
                        ? '#1e1e1e' // Valor base do card ou aproximado
                        : "#fff",
                    textTransform: 'none',
                    minWidth: 'auto',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? '#232b3a'
                          : "#f4f4f4",
                    }
                  }}
                >
                  ... mais
                </Button>
              )}
            </Box>
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
