'use client';

import { useEffect, useState } from 'react';
import styles from './AnimatedBackground.module.css';

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Return a static background or empty div initially to match server HTML as closely as possible,
    // or just return the background container without the random particles.
    // Returning just the container avoids layout shift if the container has styles.
    if (!mounted) {
        return (
            <div className={styles.background}>
                <div className={styles.orb1} />
                <div className={styles.orb2} />
                <div className={styles.orb3} />
                <div className={styles.orb4} />
                <div className={styles.grid} />
            </div>
        );
    }

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
