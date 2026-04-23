import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ProjectsPage from "../pages/ProjectsPage";
import AdminPage from "../pages/AdminPage";

import { usePortfolioContent } from "../hooks/usePortfolioContent";

const PagesRouter = () => {
  const { content, setContent, resetContent } = usePortfolioContent();

  return (
    <Routes>
      <Route path="/" element={<HomePage content={content} />} />
      <Route path="/about" element={<AboutPage content={content} />} />
      <Route path="/projects" element={<ProjectsPage content={content} setContent={setContent} />} />
      <Route
        path="/admin"
        element={
          <AdminPage
            content={content}
            setContent={setContent}
            resetContent={resetContent}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PagesRouter;
