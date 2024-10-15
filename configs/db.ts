import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const DB_URL:string = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL ?? '';
const sql = neon(DB_URL);

export const db = drizzle(sql);