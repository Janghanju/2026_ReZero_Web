'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSession } from "next-auth/react";

export function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Navbar');

    const navItems = [
        { name: t('home'), href: '/' },
        { name: t('about'), href: '/about' },
        { name: t('services'), href: '/services' },
        { name: t('portfolio'), href: '/portfolio' },
        { name: t('news'), href: '/news' },
        { name: t('contact'), href: '/contact' },
    ];

    const toggleLocale = () => {
        const nextLocale = locale === 'en' ? 'ko' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: 'rgba(3, 7, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border)'
        }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)' }}>
                    One Week
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                color: pathname === item.href ? 'var(--primary)' : 'var(--muted-foreground)',
                                fontWeight: 500,
                                fontSize: '0.95rem'
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <button onClick={toggleLocale} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)' }}>
                        <Globe size={20} />
                    </button>

                    {session ? (
                        <Link
                            href="/profile"
                            style={{
                                padding: '0.5rem 1.2rem',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: 'var(--primary)',
                                borderRadius: '999px',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {session.user?.image ? (
                                <img src={session.user.image} alt="Profile" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                            ) : (
                                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                                    {session.user?.name?.[0]?.toUpperCase() || 'U'}
                                </span>
                            )}
                            {session.user?.name || 'Profile'}
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            style={{
                                padding: '0.5rem 1.2rem',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: '999px',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}
                        >
                            {t('login')}
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ display: 'none', background: 'none', border: 'none', color: 'var(--foreground)' }}
                    className="md:hidden"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
    );
}
