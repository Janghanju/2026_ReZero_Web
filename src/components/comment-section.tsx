'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MessageCircle, Send, User } from 'lucide-react';
import styles from '@/app/[locale]/news/news.module.css'; // Reuse news styles or create new? Reuse for consistency

interface Comment {
    id: string;
    content: string;
    createdAt: string;
    user: {
        name: string | null;
        image: string | null;
    };
}

export function CommentSection({ newsId }: { newsId: string }) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/comments?newsId=${newsId}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchComments();
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newsId, content: newComment }),
            });

            if (res.ok) {
                const comment = await res.json();
                setComments(prev => [comment, ...prev]);
                setNewComment('');
            }
        } catch (e) {
            alert('Failed to post comment');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.actionBtn}
                style={{ width: '100%', justifyContent: 'center', padding: '0.5rem' }}
            >
                <MessageCircle size={16} />
                {isOpen ? 'Hide Comments' : 'Show Comments'}
            </button>

            {isOpen && (
                <div style={{ marginTop: '1rem' }}>
                    {session ? (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <input
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                style={{
                                    flex: 1,
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    background: 'var(--background)',
                                    color: 'var(--foreground)'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={submitting || !newComment.trim()}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    opacity: submitting ? 0.7 : 1
                                }}
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    ) : (
                        <p style={{ textAlign: 'center', color: 'var(--muted-foreground)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            Please login to comment.
                        </p>
                    )}

                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>Loading comments...</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {comments.length === 0 ? (
                                <p style={{ textAlign: 'center', color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>No comments yet.</p>
                            ) : (
                                comments.map(comment => (
                                    <div key={comment.id} style={{ display: 'flex', gap: '0.8rem' }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            overflow: 'hidden', flexShrink: 0
                                        }}>
                                            {comment.user.image ? (
                                                <img src={comment.user.image} alt="User" style={{ width: '100%', height: '100%' }} />
                                            ) : (
                                                <User size={16} />
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{comment.user.name || 'User'}</span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--foreground)', lineHeight: 1.4 }}>{comment.content}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
