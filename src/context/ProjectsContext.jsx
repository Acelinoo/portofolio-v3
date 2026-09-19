import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProjectsData as defaultAllProjects, featuredProjectSlugs as defaultFeaturedSlugs } from '../data/projectsData';

const STORAGE_PROJECTS_KEY = 'acelino_portfolio_projects_v3';
const STORAGE_PINNED_KEY = 'acelino_portfolio_pinned_v3';

const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  // 1. Initialize allProjects from localStorage or fallback to default
  const [allProjects, setAllProjects] = useState(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_PROJECTS_KEY) ||
        localStorage.getItem('acelino_portfolio_projects_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge any projects from defaultAllProjects that are not present in parsed
          const savedSlugs = new Set(parsed.map((p) => p.slug));
          const missingDefaults = defaultAllProjects.filter((p) => !savedSlugs.has(p.slug));
          if (missingDefaults.length > 0) {
            return [...missingDefaults, ...parsed];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse projects from localStorage:', e);
    }
    return defaultAllProjects;
  });

  // 2. Initialize pinned slugs from localStorage or fallback to default (capped at 4)
  const [pinnedSlugs, setPinnedSlugs] = useState(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_PINNED_KEY) ||
        localStorage.getItem('acelino_portfolio_pinned_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 4);
        }
      }
    } catch (e) {
      console.warn('Failed to parse pinned slugs from localStorage:', e);
    }
    return defaultFeaturedSlugs.slice(0, 4);
  });

  // Sync allProjects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(allProjects));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  }, [allProjects]);

  // Sync pinnedSlugs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PINNED_KEY, JSON.stringify(pinnedSlugs));
    } catch (e) {
      console.error('Error saving pinned slugs to localStorage:', e);
    }
  }, [pinnedSlugs]);

  // Derived: Active (visible) projects with recalculated sequential numbers
  const projects = allProjects
    .filter((p) => !p.hidden)
    .map((p, index) => ({
      ...p,
      number: String(index + 1).padStart(2, '0'),
    }));

  // Derived: Featured projects for landing page (strictly max 4, ordered as pinned)
  const featuredProjects = pinnedSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  /**
   * Add a new project
   */
  const addProject = (projectData) => {
    const slug = projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `project-${Date.now()}`;
    const newProject = {
      ...projectData,
      id,
      slug,
      features: Array.isArray(projectData.features) ? projectData.features : [],
      brief: Array.isArray(projectData.brief) ? projectData.brief : [projectData.brief].filter(Boolean),
      challenge: Array.isArray(projectData.challenge) ? projectData.challenge : [projectData.challenge].filter(Boolean),
      tech: Array.isArray(projectData.tech) ? projectData.tech : (projectData.stack || []),
      stack: Array.isArray(projectData.stack) ? projectData.stack : (projectData.tech || []),
      hidden: Boolean(projectData.hidden),
    };

    setAllProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  /**
   * Update an existing project
   */
  const updateProject = (slug, updatedData) => {
    setAllProjects((prev) =>
      prev.map((p) => {
        if (p.slug === slug) {
          const newSlug = updatedData.slug || p.slug;
          // If slug changed, update pinned list as well
          if (newSlug !== p.slug && pinnedSlugs.includes(p.slug)) {
            setPinnedSlugs((prevSlugs) =>
              prevSlugs.map((s) => (s === p.slug ? newSlug : s))
            );
          }
          return {
            ...p,
            ...updatedData,
            slug: newSlug,
            tech: updatedData.tech || updatedData.stack || p.tech,
            stack: updatedData.stack || updatedData.tech || p.stack,
          };
        }
        return p;
      })
    );
  };

  /**
   * Delete a project permanently
   */
  const deleteProject = (slug) => {
    setAllProjects((prev) => prev.filter((p) => p.slug !== slug));
    setPinnedSlugs((prev) => prev.filter((s) => s !== slug));
  };

  /**
   * Toggle Pin for landing page (Strict limit: max 4)
   * Returns: { success: boolean, error?: string }
   */
  const togglePin = (slug) => {
    if (pinnedSlugs.includes(slug)) {
      setPinnedSlugs((prev) => prev.filter((s) => s !== slug));
      return { success: true, isPinned: false };
    } else {
      if (pinnedSlugs.length >= 4) {
        return {
          success: false,
          error: 'Maksimal 4 proyek yang dapat di-pin untuk tampilan Landing Page.',
        };
      }
      setPinnedSlugs((prev) => [...prev, slug]);
      return { success: true, isPinned: true };
    }
  };

  /**
   * Toggle Hidden status (Archive / Unarchive)
   */
  const toggleHide = (slug) => {
    setAllProjects((prev) =>
      prev.map((p) => {
        if (p.slug === slug) {
          const nextHidden = !p.hidden;
          // If hiding, unpin it automatically if it was pinned
          if (nextHidden && pinnedSlugs.includes(slug)) {
            setPinnedSlugs((pins) => pins.filter((s) => s !== slug));
          }
          return { ...p, hidden: nextHidden };
        }
        return p;
      })
    );
  };

  /**
   * Reorder pinned slugs
   */
  const reorderPinned = (newSlugs) => {
    setPinnedSlugs(newSlugs.slice(0, 4));
  };

  /**
   * Reset everything back to original projectsData.js seed
   */
  const resetToDefault = () => {
    setAllProjects(defaultAllProjects);
    setPinnedSlugs(defaultFeaturedSlugs.slice(0, 4));
    localStorage.removeItem(STORAGE_PROJECTS_KEY);
    localStorage.removeItem(STORAGE_PINNED_KEY);
    localStorage.removeItem('acelino_portfolio_projects_v2');
    localStorage.removeItem('acelino_portfolio_pinned_v2');
  };

  /**
   * Generate code string to easily copy to projectsData.js
   */
  const generateExportCode = () => {
    const code = `export const featuredProjectSlugs = ${JSON.stringify(pinnedSlugs, null, 2)};\n\nexport const allProjectsData = ${JSON.stringify(allProjects, null, 2)};\n\nexport const projectsData = allProjectsData.filter((project) => !project.hidden);\n\nexport default projectsData;\n`;
    return code;
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        allProjects,
        featuredProjects,
        pinnedSlugs,
        addProject,
        updateProject,
        deleteProject,
        togglePin,
        toggleHide,
        reorderPinned,
        resetToDefault,
        generateExportCode,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};

export default ProjectsContext;
