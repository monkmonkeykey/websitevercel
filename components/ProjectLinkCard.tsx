import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  title: string;
  description: string;
  date: string;
  images?: string[]; // ✅ Hacer opcional
  categories: string[];
  slug: string;
  mainImage?: string; // ✅ Agregar el campo opcional de imagen
  collaborators?: { name: string; image?: string }[]; // ✅ Agregar colaboradores
}

const ProjectLinkCard: React.FC<ProjectCardProps & { url: string }> = ({ 
  title, 
  date, 
  url, 
  slug, 
  mainImage,
  collaborators 
}) => {
  return (
    <div className={styles.card}>
      <a href={url} className={styles.imageContainer}>
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={title} 
            className={styles.mainImage} 
            onError={(e) => (e.currentTarget.src = "/images/default.jpg")} // ✅ Manejo de error con fallback
          />
        ) : (
          <div className={styles.placeholder}>Imagen no disponible</div>
        )}
      </a>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.date}>{date}</p>

      {/* 🔹 Mostrar colaboradores si existen */}
      {collaborators && collaborators.length > 0 && (
        <div className={styles.collaborators}>
          <h4>Colaboradores:</h4>
          <div className={styles.collaboratorsGrid}>
            {collaborators.map((col, index) => (
              <div key={index} className={styles.collaboratorCard}>
                <img 
                  src={col.image || "/images/default-profile.jpg"} 
                  alt={col.name} 
                  className={styles.collaboratorImage} 
                />
                <p className={styles.collaboratorName}>{col.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Exportación corregida
export default ProjectLinkCard;
