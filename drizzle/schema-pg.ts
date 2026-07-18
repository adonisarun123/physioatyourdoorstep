import { integer, pgSchema, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Postgres (Supabase) schema for the website's form submissions.
 * Lives in the isolated "physio" schema of the shared Supabase project.
 *
 * NOTE: drizzle/schema.ts (MySQL) is legacy — kept only so the unused
 * server/ scaffold still compiles. The live app uses THIS file via lib/db.ts.
 * Schema changes are applied through Supabase migrations, not drizzle-kit.
 */

export const physio = pgSchema("physio");

export const bookingStatus = physio.enum("booking_status", [
    "pending",
    "confirmed",
    "completed",
    "cancelled",
]);

export const contactStatus = physio.enum("contact_status", ["new", "read", "replied"]);

export const bookings = physio.table("bookings", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    serviceId: integer("serviceId"),
    locationArea: varchar("locationArea", { length: 255 }),
    preferredDate: varchar("preferredDate", { length: 100 }),
    preferredTime: varchar("preferredTime", { length: 100 }),
    condition: text("condition"),
    notes: text("notes"),
    status: bookingStatus("status").default("pending").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

export const contactSubmissions = physio.table("contactSubmissions", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    subject: varchar("subject", { length: 255 }),
    message: text("message").notNull(),
    status: contactStatus("status").default("new").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
