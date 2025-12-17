'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/app/[locale]/news/news.module.css';
import { Flame, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Topic {
    rank: number;
    keyword: string;
    count: number;
}

export function HotTopics() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const t = useTranslations('News');

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await fetch('/api/hot-topics');
                if (!res.ok) {
                    const txt = await res.text();
                    console.error('Hot topics fetch failed:', txt);
                    return;
                }
                const data = await res.json();
                setTopics(data.topics || []);
            } catch (err) {
                console.error('Failed to fetch hot topics:', err);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div className={styles.trendingBox}>
            <div className={styles.trendingHeader}>
                <TrendingUp size={20} className="text-blue-500" />
                <span>{t('hotTopics')}</span>
            </div>
            <div className={styles.trendingList}>
                {topics.map((topic) => (
                    <div key={topic.rank} className={styles.trendingItem}>
                        <span className={styles.trendingRank}>{topic.rank}</span>
                        <span className={styles.trendingKeyword}>{topic.keyword}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
