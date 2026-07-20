/**
 * Unified type exports
 * Import shared types from this single entry point.
 *
 * The database row types that used to be re-exported here are gone: form
 * submissions are delivered by email only, so there is no schema to derive
 * them from. See lib/email.ts for the submission payload shapes.
 */

export * from "./_core/errors";
