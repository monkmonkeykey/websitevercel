import { useRouter } from 'next/router';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  title: string;
  description: string;
  date: string;
  url: string;
  images: string[];
  category: string;
};

const ProjectCard = ({ title, description, date, url, images, category }: ProjectCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${title.toLowerCase().replace(/\s+/g, '_')}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageGallery}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`${title} image ${index + 1}`} className={styles.image} />
        ))}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.date}>{date}</p>
      <p className={styles.category}>{category}</p>
      <p className={styles.description}>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.url}>View Project</a>
    </div>
  );
};

export default ProjectCard;
