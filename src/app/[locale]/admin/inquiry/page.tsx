'use client';

import { useEffect, useState } from 'react';
import { Container, Title, Paper, Table, Badge, Button, Modal, Textarea, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from "@/components/navbar";

interface Inquiry {
    id: string;
    title: string;
    content: string;
    answer: string | null;
    isPrivate: boolean;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
}

export default function AdminInquiryPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [answer, setAnswer] = useState('');
    const [opened, { open, close }] = useDisclosure(false);

    const fetchInquiries = async () => {
        try {
            const res = await fetch('/api/nest/admin/inquiries');
            if (res.ok) {
                const data = await res.json();
                setInquiries(data);
            }
        } catch (error) {
            console.error('Failed to fetch inquiries', error);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleOpenAnswer = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        setAnswer(inquiry.answer || '');
        open();
    };

    const handleSubmitAnswer = async () => {
        if (!selectedInquiry) return;

        try {
            const res = await fetch(`/api/nest/admin/inquiries/${selectedInquiry.id}/answer`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer }),
            });

            if (res.ok) {
                close();
                fetchInquiries(); // Refresh list
            } else {
                alert('Failed to submit answer');
            }
        } catch (error) {
            console.error('Error submitting answer', error);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#1a1b1e' }}>
            <Navbar />
            <Container size="xl" py="xl" style={{ paddingTop: '100px' }}>
                <Title order={2} mb="lg" c="white">Admin Inquiry Management</Title>
                <Paper p="md" radius="md" withBorder>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Date</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {inquiries.map((inquiry) => (
                                <Table.Tr key={inquiry.id}>
                                    <Table.Td>
                                        <Badge color={inquiry.answer ? 'green' : 'yellow'}>
                                            {inquiry.answer ? 'Answered' : 'Pending'}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>{inquiry.title}</Table.Td>
                                    <Table.Td>
                                        <Text size="sm">{inquiry.user?.name}</Text>
                                        <Text size="xs" c="dimmed">{inquiry.user?.email}</Text>
                                    </Table.Td>
                                    <Table.Td>{new Date(inquiry.createdAt).toLocaleDateString()}</Table.Td>
                                    <Table.Td>
                                        <Button size="xs" onClick={() => handleOpenAnswer(inquiry)}>
                                            {inquiry.answer ? 'Edit Answer' : 'Answer'}
                                        </Button>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            </Container>

            <Modal opened={opened} onClose={close} title="Answer Inquiry" size="lg">
                {selectedInquiry && (
                    <>
                        <Paper p="sm" bg="gray.1" mb="md">
                            <Text fw={700}>{selectedInquiry.title}</Text>
                            <Text size="sm" mt="xs">{selectedInquiry.content}</Text>
                        </Paper>
                        <Textarea
                            label="Your Answer"
                            placeholder="Type your response here..."
                            minRows={5}
                            value={answer}
                            onChange={(e) => setAnswer(e.currentTarget.value)}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button variant="default" onClick={close}>Cancel</Button>
                            <Button onClick={handleSubmitAnswer}>Submit Answer</Button>
                        </Group>
                    </>
                )}
            </Modal>
        </div>
    );
}
