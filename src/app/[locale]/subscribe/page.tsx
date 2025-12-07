'use client';

import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Container, Paper, Title, Text, TextInput, Button, Group, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function SubscribePage() {
    const t = useTranslations('News'); // Reusing News translations or generic
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Subscription failed');
            }
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <AnimatedBackground />
            <Navbar />

            <Container size="sm" style={{ paddingTop: '120px', position: 'relative', zIndex: 1 }}>
                <Paper p="xl" radius="lg" withBorder style={{ background: 'rgba(30, 30, 30, 0.6)', backdropFilter: 'blur(10px)' }}>
                    {!submitted ? (
                        <form onSubmit={handleSubscribe}>
                            <Stack gap="lg">
                                <div style={{ textAlign: 'center' }}>
                                    <Title order={2} mb="sm" style={{ color: 'white' }}>
                                        Subscribe to One Week
                                    </Title>
                                    <Text c="dimmed">
                                        Get the latest tech news and updates delivered directly to your inbox.
                                    </Text>
                                </div>

                                <TextInput
                                    label="Email Address"
                                    placeholder="your@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    leftSection={<Mail size={16} />}
                                    size="md"
                                    styles={{
                                        input: { backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' },
                                        label: { color: '#ccc' }
                                    }}
                                />

                                <Button type="submit" size="md" fullWidth color="blue">
                                    Subscribe Now
                                </Button>
                            </Stack>
                        </form>
                    ) : (
                        <Stack align="center" gap="md" py="xl">
                            <div style={{
                                width: 60, height: 60, borderRadius: '50%',
                                background: 'rgba(16, 185, 129, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Check size={32} color="#10b981" />
                            </div>
                            <Title order={3} style={{ color: 'white' }}>Subscribed!</Title>
                            <Text c="dimmed" ta="center">
                                Thank you for subscribing. You'll receive our next newsletter soon.
                            </Text>
                            <Button variant="light" onClick={() => setSubmitted(false)}>
                                Subscribe another email
                            </Button>
                        </Stack>
                    )}
                </Paper>
            </Container>
        </div>
    );
}
