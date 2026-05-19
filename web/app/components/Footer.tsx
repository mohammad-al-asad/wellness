import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandInfo}>
            <h3 className={styles.brandName}>Dominion Wellness Solutions</h3>
            <p className={styles.brandDescription}>
              Premium, data-driven wellness and performance tracking application designed to elevate your physical and mental resilience.
            </p>
          </div>
          <div className={styles.links}>
            <h4>Contact</h4>
            <a href="mailto:noreply@dominionwellness.ai" className={styles.link}>noreply@dominionwellness.ai</a>
          </div>
          <div className={styles.links}>
            <h4>Legal</h4>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms & Conditions</Link>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <p>&copy; {currentYear} Dominion Wellness Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
