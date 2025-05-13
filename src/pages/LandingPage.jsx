import Navigation from '../components/Navigation/Navigation';
import Hero from '../components/Hero/Hero';
import Demo from '../components/Demo/Demo';
import style from './LandingPage.module.css';
import arrowIcon from '../assets/arrow.png'; 

const LandingPage = () => {
  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Problems', href: '/problems' },
    { text: 'Solutions', href: '/solutions' },
    { text: 'Use Cases', href: '/use-cases' },
  ];

  const heroData = {
    badgeText: 'Every Word Matters — Let us Capture It All.',
    title: ['Capture Every Word,', 'Let Us Handle the Notes.'],
    description: 'No more missed announcements or forgotten summaries. ClassNote listens, transcribes, and summarizes, giving students, teachers, and administrators instant access to what matters most — in every school setting.',
    ctaText: 'Get Started',
    ctaLink: '/get-started',
  };

  const demoData = {
    heading: 'Demo',
    subheading: 'See us in action',
    timer: '00:00:00',
  };

  return (
    <div className={style.container}>
      <Navigation brandName="ClassNotes" links={navLinks} ctaText="See Us In Action" ctaLink="/action" />
      <main className={style.main}>
        <div className={style.hero}>
          <Hero {...heroData} />
        </div>
        <div className={style.demo}>
          <Demo {...demoData} />
        </div>
      </main>
      <div className={style.arrowContainer}>
        <img src={arrowIcon} alt="Scroll Down" className={style.arrowIcon} />
      </div>
    </div>
  );
};

export default LandingPage;