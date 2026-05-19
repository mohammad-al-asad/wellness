import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.glowOrb1}></div>
          <div className={styles.glowOrb2}></div>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.brandBadge}>Dominion Wellness Solutions</div>
          <h1 className={styles.title}>
            Optimize Your <span className={styles.highlight}>Performance</span>
          </h1>
          <p className={styles.subtitle}>
            A premium, data-driven wellness tracking application empowering you to monitor your physical capacity, mental resilience, and overall well-being.
          </p>
          <div className={styles.ctaGroup}>
            <a href="#" className={styles.storeButton}>
              <img src="/apple.png" className={styles.storeIcon} alt="Apple logo" />
              <div className={styles.storeBtnText}>
                <span className={styles.storeSub}>Download on the</span>
                <span className={styles.storeMain}>App Store</span>
              </div>
            </a>
            <a href="#" className={styles.storeButton}>
              <img src="/play.png" className={styles.storeIcon} alt="Google Play logo" />
              <div className={styles.storeBtnText}>
                <span className={styles.storeSub}>GET IT ON</span>
                <span className={styles.storeMain}>Google Play</span>
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Core Features</h2>
          <p>Everything you need to master your daily performance</p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.card} glass`}>
            <div className={styles.cardIconWrapper}>
              <div className={styles.iconDash}></div>
            </div>
            <h3>Dynamic Dashboard</h3>
            <p>Visualize your performance pillars with interactive radar charts and track your Optimal Performance Score (OPS) in real-time.</p>
          </div>

          <div className={`${styles.card} glass`}>
            <div className={styles.cardIconWrapper}>
              <div className={styles.iconAssess}></div>
            </div>
            <h3>Daily Assessment</h3>
            <p>Seamless 3-step check-ins for energy, focus, and stress. Build reflection streaks to encourage consistency and growth.</p>
          </div>

          <div className={`${styles.card} glass`}>
            <div className={styles.cardIconWrapper}>
              <div className={styles.iconReport}></div>
            </div>
            <h3>Comprehensive Reports</h3>
            <p>Analyze 7-day trends with beautiful area charts and discover actionable insights through AI-powered behavioral grids.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
