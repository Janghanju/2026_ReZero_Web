import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();
    if (!session || !session.user || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { id, answer } = await req.json();

        const updatedInquiry = await prisma.inquiry.update({
            where: { id },
            data: { answer },
        });

        return NextResponse.json({ inquiry: updatedInquiry });
    } catch (error) {
        return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 });
    }
}
