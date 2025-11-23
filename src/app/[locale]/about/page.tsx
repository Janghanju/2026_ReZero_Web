'use client';

import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useTranslations } from 'next-intl';
import { MotionContainer } from "@/components/ui/motion-container";
import { MotionCard } from "@/components/ui/motion-card";
import { User, Code, Briefcase } from "lucide-react";

export default function AboutPage() {
    const t = useTranslations('About');

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', position: 'relative' }}>
            <AnimatedBackground />
            <Navbar />

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '8rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
                <MotionContainer>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 style={{
                            fontSize: '3rem',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            background: 'linear-gradient(to right, var(--primary), var(--accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {t('title')}
                        </h1>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '1.2rem' }}>
                            {t('subtitle')}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                        {/* Intro Card */}
                        <MotionCard>
                            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <User size={32} color="var(--primary)" />
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{t('introTitle')}</h2>
                                </div>
                                <p style={{ lineHeight: 1.8, color: 'var(--muted-foreground)' }}>
                                    {t('intro')}
                                </p>
                            </div>
                        </MotionCard>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {/* Experience Card */}
                            <MotionCard>
                                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <Briefcase size={32} color="var(--accent)" />
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{t('experience')}</h2>
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, color: 'var(--muted-foreground)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <li>
                                            <strong style={{ color: 'var(--foreground)' }}>{t('job1Title')}</strong><br />
                                            {t('job1Company')}
                                        </li>
                                        <li>
                                            <strong style={{ color: 'var(--foreground)' }}>{t('job2Title')}</strong><br />
                                            {t('job2Company')}
                                        </li>
                                    </ul>
                                </div>
                            </MotionCard>

                            {/* Skills Card */}
                            <MotionCard>
                                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <Code size={32} color="#10b981" />
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{t('skills')}</h2>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {['C/C++', 'Rust', 'Python', 'React', 'Next.js', 'TypeScript', 'Docker', 'AWS'].map(skill => (
                                            <span key={skill} style={{
                                                background: 'rgba(255,255,255,0.1)',
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '99px',
                                                fontSize: '0.9rem'
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </MotionCard>
                        </div>
                    </div>
                </MotionContainer>
            </main>
        </div>
    );
}
