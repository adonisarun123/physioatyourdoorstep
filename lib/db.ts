import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
    InsertUser,
    users,
    services,
    locations,
    blogs,
    categories,
    bookings,
    contactSubmissions
} from "@/drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
    if (!_db && process.env.DATABASE_URL) {
        try {
            _db = drizzle(process.env.DATABASE_URL);
        } catch (error) {
            console.warn("[Database] Failed to connect:", error);
            _db = null;
        }
    }
    return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
    if (!user.openId) {
        throw new Error("User openId is required for upsert");
    }

    const db = await getDb();
    if (!db) {
        console.warn("[Database] Cannot upsert user: database not available");
        return;
    }

    try {
        const values: InsertUser = {
            openId: user.openId,
        };
        const updateSet: Record<string, unknown> = {};

        const textFields = ["name", "email", "loginMethod"] as const;
        type TextField = (typeof textFields)[number];

        const assignNullable = (field: TextField) => {
            const value = user[field];
            if (value === undefined) return;
            const normalized = value ?? null;
            values[field] = normalized;
            updateSet[field] = normalized;
        };

        textFields.forEach(assignNullable);

        if (user.lastSignedIn !== undefined) {
            values.lastSignedIn = user.lastSignedIn;
            updateSet.lastSignedIn = user.lastSignedIn;
        }
        if (user.role !== undefined) {
            values.role = user.role;
            updateSet.role = user.role;
        }

        if (!values.lastSignedIn) {
            values.lastSignedIn = new Date();
        }

        if (Object.keys(updateSet).length === 0) {
            updateSet.lastSignedIn = new Date();
        }

        await db.insert(users).values(values).onDuplicateKeyUpdate({
            set: updateSet,
        });
    } catch (error) {
        console.error("[Database] Failed to upsert user:", error);
        throw error;
    }
}

export async function getUserByOpenId(openId: string) {
    const db = await getDb();
    if (!db) {
        console.warn("[Database] Cannot get user: database not available");
        return undefined;
    }

    const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

    return result.length > 0 ? result[0] : undefined;
}

// Service queries
export async function getAllServices() {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(services);
}

export async function getServiceBySlug(slug: string) {
    const db = await getDb();
    if (!db) return undefined;
    const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}

// Location queries
export async function getAllLocations() {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(locations);
}

export async function getLocationBySlug(slug: string) {
    const db = await getDb();
    if (!db) return undefined;
    const result = await db.select().from(locations).where(eq(locations.slug, slug)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}

// Blog queries
export async function getAllBlogs() {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(blogs);
}

export async function getBlogBySlug(slug: string) {
    const db = await getDb();
    if (!db) return undefined;
    const result = await db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}

export async function getBlogsByCategory(categoryId: number) {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(blogs).where(eq(blogs.categoryId, categoryId));
}

// Category queries
export async function getAllCategories() {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(categories);
}

export async function getCategoryBySlug(slug: string) {
    const db = await getDb();
    if (!db) return undefined;
    const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
    return result.length > 0 ? result[0] : undefined;
}

// Booking mutations
export async function createBooking(booking: typeof bookings.$inferInsert) {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.insert(bookings).values(booking);
    return result;
}

// Contact submission mutations
export async function createContactSubmission(submission: typeof contactSubmissions.$inferInsert) {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const result = await db.insert(contactSubmissions).values(submission);
    return result;
}
