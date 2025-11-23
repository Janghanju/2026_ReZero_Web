'use client';
import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useTranslations } from 'next-intl';
import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";
import styles from './Contact.module.css';
import { MotionContainer } from "@/components/ui/motion-container";
import { MotionCard } from "@/components/ui/motion-card";

export default function ContactPage() {
    const t = useTranslations('Contact');

    const contacts = [
        { icon: <Mail size={40} />, label: t('email'), value: 'hanju@example.com' },
        { icon: <Phone size={40} />, label: t('phone'), value: '+82-10-1234-5678' },
        { icon: <Github size={40} />, label: t('github'), value: 'github.com/hanju' },
        { icon: <Linkedin size={40} />, label: t('linkedin'), value: 'linkedin.com/in/hanju' },
        { icon: <MapPin size={40} />, label: t('address'), value: t('addressValue') }
    ];

    return (
        <div className={styles.container}>
            <AnimatedBackground />
            <Navbar />
            <MotionContainer className={styles.main}>
                <h1 className={styles.title}>{t('title')}</h1>
                <p className={styles.subtitle}>{t('subtitle')}</p>
                <MotionCard>
                    <div className={styles.card}>
                        <p className={styles.bio}>{t('bio')}</p>
                        <ul className={styles.list}>
                            {contacts.map((c, i) => (
                                <li key={i} className={styles.item}>
                                    {c.icon}
                                    <span className={styles.label}>{c.label}:</span>
                                    <span className={styles.value}>{c.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </MotionCard>
            </MotionContainer>
        </div>
    );
}
