import styles from './Navigation.module.css';
import logo from '../../assets/logo.png';
const Navigation = ({ brandName, links, ctaText, ctaLink }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <img src={logo} alt="Logo" className={styles.logoIcon} />
        <span className={styles.logoText}>{brandName}</span>
      </div>
      <div className={styles.links}>
        {links.map((link, index) => (
          <a key={index} href={link.href}>{link.text}</a>
        ))}
      </div>
      <div className={styles.cta}>
        <div className={styles.ctaWrapper}>
          <a href={ctaLink} className={styles.ctaButton}>{ctaText}</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
