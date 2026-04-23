export interface Project {
  id: string | number;
  title: string;
  description: string;
  stack: string;
  link: string;
}

export interface Technology {
  id: string | number;
  name: string;
  icon: string;
  url: string;
}

export interface Content {
  home: {
    greetingTitle: string;
    greetingText: string;
    heroImage: string;
  };
  about: {
    title: string;
    text: string;
    photo: string;
  };
  projectsPage: {
    title: string;
    text: string;
    image: string;
  };
  technologies: Technology[];
  projects: Project[];
}
