import { bookings, contactSubmissions } from "@/drizzle/schema-pg";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

/**
 * Database access for the live site — Supabase Postgres, "physio" schema.
 *
 * DATABASE_URL must be the Supabase TRANSACTION POOLER connection string
 * (aws-…pooler.supabase.com:6543) — required for serverless (Vercel).
 * `prepare: false` is mandatory in transaction-pooling mode.
 */

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
    if (!_db && process.env.DATABASE_URL) {
        try {
            const client = postgres(process.env.DATABASE_URL, {
                prepare: false,
                max: 1,
            });
            _db = drizzle(client);
        } catch (error) {
            console.warn("[Database] Failed to connect:", error);
            _db = null;
        }
    }
    return _db;
}

// Booking mutations
/** Inserts a booking and returns the new row's id (0 if unavailable). */
export async function createBooking(booking: typeof bookings.$inferInsert): Promise<number> {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const rows = await db.insert(bookings).values(booking).returning({ id: bookings.id });
    return rows[0]?.id ?? 0;
}

// Contact submission mutations
export async function createContactSubmission(
    submission: typeof contactSubmissions.$inferInsert
): Promise<void> {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    await db.insert(contactSubmissions).values(submission);
}
