'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { User, Edit2, Save, X, Camera, Shield } from 'lucide-react';
import styles from './profile.module.css';
import { SignOutButton } from './sign-out-button';

interface ProfileEditorProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
    };
}

export function ProfileEditor({ user }: ProfileEditorProps) {
    const { update } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name || '');
    const [image, setImage] = useState(user.image || '');
    const [loading, setLoading] = useState(false);

    // Master Admin Logic (Hardcoded for safety/simplicity in this demo)
    const isMaster = user.email === 'hanju1215@naver.com';
    const [promoteEmail, setPromoteEmail] = useState('');

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, image }),
            });

            if (!res.ok) throw new Error('Failed to update');

            await update({ name, image }); // Update session
            setIsEditing(false);
        } catch (error) {
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePromote = async () => {
        if (!promoteEmail) return;
        try {
            const res = await fetch('/api/admin/promote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: promoteEmail }),
            });
            if (res.ok) {
                alert(`Successfully promoted ${promoteEmail} to ADMIN`);
                setPromoteEmail('');
            } else {
                alert('Failed to promote user');
            }
        } catch (e) {
            alert('Error promoting user');
        }
    };

    return (
        <div className={styles.profileCard}>
            <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                    {image ? (
                        <img src={image} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                            <User size={40} />
                        </div>
                    )}
                </div>
                {isEditing && (
                    <div className={styles.avatarOverlay}>
                        <label htmlFor="avatar-upload" style={{ cursor: 'pointer' }}>
                            <Camera size={24} color="white" />
                        </label>
                        {/* In a real app, we'd handle file upload here. For now, we'll just use URL input */}
                    </div>
                )}
            </div>

            {isEditing ? (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Display Name</label>
                        <input
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Display Name"
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Avatar URL</label>
                        <input
                            className={styles.input}
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button onClick={handleSave} disabled={loading} className={styles.saveBtn}>
                            <Save size={16} /> Save
                        </button>
                        <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>
                            <X size={16} /> Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className={styles.name}>{name}</h2>
                    <p className={styles.email}>{user.email}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <span className={styles.roleBadge}>
                            {user.role === 'ADMIN' && <Shield size={12} />}
                            {user.role || 'USER'}
                        </span>
                        <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                            <Edit2 size={14} /> Edit
                        </button>
                    </div>
                </>
            )}

            <div style={{ marginTop: '2rem', width: '100%' }}>
                <SignOutButton />
            </div>

            {isMaster && (
                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', width: '100%' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shield size={14} color="var(--primary)" /> Master Admin Area
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            className={styles.input}
                            placeholder="User Email to Promote"
                            value={promoteEmail}
                            onChange={e => setPromoteEmail(e.target.value)}
                            style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                        />
                        <button onClick={handlePromote} className={styles.saveBtn} style={{ padding: '0.5rem' }}>
                            Promote
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
