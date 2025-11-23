'use client';

import styles from './AnimatedBackground.module.css';

export function AnimatedBackground() {
    return (
        <div className={styles.background}>
            {/* Floating gradient orbs */}
            <div className={styles.orb1} />
            <div className={styles.orb2} />
            <div className={styles.orb3} />
            <div className={styles.orb4} />

            {/* Particle effects */}
            <div className={styles.particles}>
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className={styles.particle}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            {/* Animated grid overlay */}
            <div className={styles.grid} />
        </div>
    );
}
