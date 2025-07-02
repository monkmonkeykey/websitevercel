import React from "react";
import Link from "next/link";
import styles from "../app/styles/ProjectGrid.module.css";

interface Project {
  slug: string;
  title: string;
  mainImage: string;
  categories: string[];
}

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <section className={styles.gridContainer}>
      {projects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.projectCard}>
          {/* 📌 Imagen del Proyecto */}
          <div className={styles.imageWrapper}>
            <img src={project.mainImage} alt={project.title} className={styles.projectImage} />
          </div>

          {/* 📌 Información del Proyecto */}
          <div className={styles.projectInfo}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectCategory}>
  {Array.isArray(project.categories) 
    ? project.categories.map(formatCategory).join(", ") 
    : "Sin categoría"}
</p>
          </div>
        </Link>
      ))}
    </section>
  );
};

// ✅ Función para formatear los nombres de las categorías
const formatCategory = (category: string) => {
  return category
    .replace("-", " ") // Reemplaza guiones por espacios
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza cada palabra
};

export default ProjectGrid;
