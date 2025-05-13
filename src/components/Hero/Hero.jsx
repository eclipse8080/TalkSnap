import styles from './Hero.module.css';

const Hero = ({ badgeText, title, description, ctaText, ctaLink }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>{badgeText}</div>
        <div className={styles.title}>
          {title.map((line, index) => (
            <span key={index} className={index === 1 ? styles.gradientText : styles.blackText}>
              {line}
              <br />
            </span>
          ))}
        </div>
        <p className={styles.description}>{description}</p>
        <a href={ctaLink} className={styles.cta}>{ctaText}</a>
      </div>
    </section>
  );
};

export default Hero;
