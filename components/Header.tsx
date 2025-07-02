import { useState } from "react";
import styles from "../app/styles/Header.module.css"; // Ajusta la ruta si es necesario

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* ✅ Botón de menú hamburguesa (solo en móviles) */}
      <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* ✅ Fondo oscuro solo cuando el menú está abierto */}
      {menuOpen && (
        <div
          className={`${styles.menuBackground} ${menuOpen ? styles.show : ""}`}
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* ✅ Menú principal en escritorio */}
      <nav className={styles.nav}>
        <ul className={`${styles.menu} ${styles.menuLeft}`}>
          <li><a href="/">Inicio</a></li>
        </ul>

        <ul className={`${styles.menu} ${styles.menuCenter}`}>
          <li><a href="/obra-de-arte">Obra</a></li>
          <li><a href="/produccion-tecnica">Producción técnica</a></li>
          <li><a href="/obra-multimedia">Producción de Obra</a></li>
          <li><a href="/ensenanza">Enseñanza</a></li>

        </ul>

        <ul className={`${styles.menu} ${styles.menuRight}`}>
          <li><a href="/about">Bio</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>

<nav className={`${styles.menuMobile} ${menuOpen ? styles.show : ""}`}>
  <ul>
    <li><a href="/" onClick={() => setMenuOpen(false)}>Inicio</a></li>
    <li><a href="/obra-de-arte" onClick={() => setMenuOpen(false)}>Obra</a></li>
    <li><a href="/produccion-tecnica" onClick={() => setMenuOpen(false)}>Producción técnica</a></li>
    <li><a href="/obra-multimedia" onClick={() => setMenuOpen(false)}>Producción de Obra</a></li>
    <li><a href="/ensenanza" onClick={() => setMenuOpen(false)}>Enseñanza</a></li>
    <li><a href="/about" onClick={() => setMenuOpen(false)}>Bio</a></li>
    <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contacto</a></li>
  </ul>
</nav>


    </header>
  );
};

export default Header;
