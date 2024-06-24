import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { projects } from '../../app/projectsData';
import styles from '../../app/styles/Home.module.css';

const ProjectPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Encuentra el proyecto basado en el slug
  const project = projects.find(proj => proj.title.toLowerCase().replace(/\s+/g, '_') === slug);

  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{project.title} - Josué's Portfolio</title>
        <meta name="description" content={`Details about ${project.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.date}>{project.date}</p>
        <p className={styles.category}>{project.category}</p>
        <div className={styles.imageGallery}>
          {project.images.map((image, index) => (
            <img key={index} src={image} alt={`${project.title} image ${index + 1}`} className={styles.image} />
          ))}
        </div>
        <p className={styles.description}>{project.description}</p>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.url}>View Project</a>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectPage;
