import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './styles/Home.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Me - Josué's Portfolio</title>
        <meta name="description" content="About Josué" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>About Me</h1>
        <p className={styles.description}>
          Here is some information about me...
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default About;
