import React from 'react';
import NewsList from '@/components/news-list';
import { HotTopics } from '@/components/hot-topics';
import styles from './news.module.css';
import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useTranslations } from 'next-intl';
import { Newspaper } from 'lucide-react';

export default function NewsPage() {
    const t = useTranslations('News');

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', position: 'relative' }}>
            <AnimatedBackground />
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                    }}>
                        <Newspaper size={40} color="white" />
                    </div>
                    <h1 className={styles.title}>{t('title')}</h1>
                    <p className={styles.subtitle}>
                        {t('subtitle')}
                    </p>
                </div>

                <aside className={styles.sidebar}>
                    <HotTopics />
                </aside>

                <main className={styles.main}>
                    <NewsList />
                </main>
            </div>
        </div>
    );
}
