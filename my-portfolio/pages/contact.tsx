import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../app/styles/Home.module.css';

const Contact = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Contact - Josué's Portfolio</title>
        <meta name="description" content="Contact Josué" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Contact Me</h1>
        <p className={styles.description}>
          Feel free to reach out to me at [your email].
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
