import React from 'react';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import styles from './profile.module.css';
import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { MessageSquare } from 'lucide-react';
import { ProfileEditor } from './profile-editor';
import { InquiryList } from './inquiry-list';

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const session = await auth();

    if (!session || !session.user) {
        redirect(`/${locale}/login`);
    }

    const isAdmin = session.user.role === 'ADMIN';

    const inquiries = await prisma.inquiry.findMany({
        where: isAdmin ? {} : { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: { name: true, email: true }
            }
        }
    });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', position: 'relative' }}>
            <AnimatedBackground />
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>My Profile</h1>
                    <p className={styles.subtitle}>Manage your account and view inquiry history</p>
                </div>

                <div className={styles.grid}>
                    {/* Profile Editor (Client Component) */}
                    <ProfileEditor user={session.user} />

                    {/* Inquiry History / Admin Dashboard */}
                    <div className={styles.inquirySection}>
                        <h3 className={styles.sectionTitle}>
                            <MessageSquare size={24} className="text-blue-500" />
                            {isAdmin ? 'Admin Inquiry Dashboard' : 'Inquiry History'}
                        </h3>

                        <InquiryList inquiries={inquiries} isAdmin={isAdmin} />
                    </div>
                </div>
            </div>
        </div>
    );
}
