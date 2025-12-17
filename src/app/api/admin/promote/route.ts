import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();
    // Hardcoded Master Email Check
    if (!session || !session.user || session.user.email !== 'hanju1215@naver.com') {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ error: "Failed to promote user" }, { status: 500 });
    }
}
