'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
    ExternalLink,
    Clock,
    AlertCircle,
    RefreshCw,
} from 'lucide-react';
import {
    Card,
    Text,
    Badge,
    Button,
    Group,
    Grid,
    Skeleton,
    Alert,
    Container,
} from '@mantine/core';

interface NewsItem {
    id: string;
    title: string;
    link: string;
    source?: string;
    timeAgo?: string;
    summary?: string;
}

export default function NewsList() {
    const t = useTranslations('News');
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Click log function
    const logClick = useCallback(async (title: string, url: string) => {
        try {
            await fetch('/api/click-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword: title, url }),
            });
        } catch (e) {
            console.warn('Click log failed', e);
        }
    }, []);

    const fetchNews = async (pageNum: number, isAutoRefresh = false) => {
        if (!isAutoRefresh) setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/geek-news?page=${pageNum}`);

            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const txt = await res.text();
                console.error('Received non-JSON response:', txt.substring(0, 200)); // Log first 200 chars
                throw new Error('Server returned unexpected response (not JSON). Please try again later.');
            }

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.details || data.error || 'Failed to fetch news');
            }

            const data = await res.json();
            setNews(data.news || []);
            setLastUpdated(new Date());
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to load news.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(page);
        const interval = setInterval(() => fetchNews(page, true), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [page]);

    const handleNextPage = () => setPage((p) => p + 1);
    const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));

    return (
        <Container size="xl" py="xl">
            <Group justify="space-between" mb="lg">
                <Text size="sm" c="dimmed">
                    {lastUpdated && `${t('lastUpdated')}: ${lastUpdated.toLocaleTimeString()}`}
                </Text>
                <Button
                    variant="light"
                    leftSection={<RefreshCw size={16} />}
                    onClick={() => fetchNews(page)}
                    loading={loading}
                >
                    {t('refresh')}
                </Button>
            </Group>

            {error ? (
                <Alert icon={<AlertCircle size={16} />} title="Connection Error" color="red" variant="filled">
                    {error}
                </Alert>
            ) : (
                <Grid>
                    {loading && news.length === 0
                        ? Array(6)
                            .fill(0)
                            .map((_, i) => (
                                <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4 }}>
                                    <Skeleton height={200} radius="md" />
                                </Grid.Col>
                            ))
                        : news.map((item, idx) => (
                            <Grid.Col key={item.id || idx} span={{ base: 12, md: 6, lg: 4 }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Group justify="space-between" mt="md" mb="xs">
                                            <Badge color="pink" variant="light">
                                                {item.source || 'News'}
                                            </Badge>
                                            <Group gap={4}>
                                                <Clock size={14} color="gray" />
                                                <Text size="xs" c="dimmed">
                                                    {item.timeAgo}
                                                </Text>
                                            </Group>
                                        </Group>

                                        <Text fw={500} size="lg" mt="md" style={{ flex: 1 }}>
                                            {item.title}
                                        </Text>

                                        <Button
                                            component="a"
                                            href={item.link}
                                            target="_blank"
                                            variant="light"
                                            color="blue"
                                            fullWidth
                                            mt="md"
                                            radius="md"
                                            rightSection={<ExternalLink size={14} />}
                                            onClick={() => logClick(item.title, item.link)}
                                        >
                                            Read More
                                        </Button>
                                    </Card>
                                </motion.div>
                            </Grid.Col>
                        ))}
                </Grid>
            )}

            {!error && !loading && news.length > 0 && (
                <Group justify="center" mt="xl">
                    <Button onClick={handlePrevPage} disabled={page === 1} variant="default">
                        Previous
                    </Button>
                    <Text>Page {page}</Text>
                    <Button onClick={handleNextPage} variant="default">
                        Next
                    </Button>
                </Group>
            )}
        </Container>
    );
}
