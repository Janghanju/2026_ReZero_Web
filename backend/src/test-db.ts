import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to connect to database...');
        await prisma.$connect();
        console.log('Connection successful!');

        // List tables (PostgreSQL specific query)
        const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

        console.log('Tables found in database:');
        console.log(tables);

        const newsCount = await prisma.news.count();
        console.log(`News count: ${newsCount}`);

        const userCount = await prisma.user.count();
        console.log(`User count: ${userCount}`);

    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
