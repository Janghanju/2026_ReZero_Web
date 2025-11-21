import Link from "next/link";
import styles from "./page.module.css";
import { ArrowRight, Github, Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={`${styles.title} text-gradient`}>
          Re:Zero
          <br />
          <span style={{ fontSize: "0.5em", fontWeight: 400, color: "var(--foreground)" }}>
            Jang Hanju
          </span>
        </h1>
        
        <p className={styles.subtitle}>
          Premium Freelance Services & Real-time Tech Insights.
          <br />
          Building the future of web with precision and elegance.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/services" className={styles.primaryBtn}>
            Start a Project <ArrowRight size={20} style={{ marginLeft: "0.5rem" }} />
          </Link>
          <Link href="/portfolio" className={styles.secondaryBtn}>
            View Portfolio
          </Link>
        </div>

        <div className={styles.features}>
          <div className={`${styles.card} glass-panel`}>
            <Terminal size={32} color="var(--primary)" style={{ marginBottom: "1rem" }} />
            <h3 className={styles.cardTitle}>Advanced Development</h3>
            <p className={styles.cardDesc}>
              Next.js, React, and modern web technologies tailored for performance and scale.
            </p>
          </div>
          
          <div className={`${styles.card} glass-panel`}>
            <Github size={32} color="var(--accent)" style={{ marginBottom: "1rem" }} />
            <h3 className={styles.cardTitle}>Open Source</h3>
            <p className={styles.cardDesc}>
              Active contributions and transparent coding practices.
            </p>
          </div>

          <div className={`${styles.card} glass-panel`}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀</div>
            <h3 className={styles.cardTitle}>Tech News</h3>
            <p className={styles.cardDesc}>
              Curated real-time news feed for developers and tech enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
