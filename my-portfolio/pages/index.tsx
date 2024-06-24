import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../app/projectsData';
import styles from '../app/styles/Home.module.css';

const Home = () => {
  const recentProjects = projects
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <div className={styles.container}>
      <Head>
        <title>Josué's Portfolio</title>
        <meta name="description" content="Portfolio of Josué" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Portfolio</h1>
        <div className={styles.grid}>
          {recentProjects.map((project, index) => (
            <Link key={index} href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '_')}`} legacyBehavior>
              <a>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  date={project.date}
                  url={project.url}
                  images={project.images}
                  category={project.category}
                />
              </a>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
