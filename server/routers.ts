import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Services router
  services: router({
    list: publicProcedure.query(async () => {
      return await db.getAllServices();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getServiceBySlug(input.slug);
      }),
  }),

  // Locations router
  locations: router({
    list: publicProcedure.query(async () => {
      return await db.getAllLocations();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getLocationBySlug(input.slug);
      }),
  }),

  // Blogs router
  blogs: router({
    list: publicProcedure.query(async () => {
      return await db.getAllBlogs();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBlogBySlug(input.slug);
      }),
    getByCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getBlogsByCategory(input.categoryId);
      }),
  }),

  // Categories router
  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getCategoryBySlug(input.slug);
      }),
  }),

  // Booking router
  booking: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email address"),
          phone: z.string().min(10, "Phone number is required"),
          serviceId: z.number().optional(),
          locationArea: z.string().optional(),
          preferredDate: z.string().optional(),
          preferredTime: z.string().optional(),
          condition: z.string().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await db.createBooking(input);
        return { success: true };
      }),
  }),

  // Contact router
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email address"),
          phone: z.string().optional(),
          subject: z.string().optional(),
          message: z.string().min(1, "Message is required"),
        })
      )
      .mutation(async ({ input }) => {
        await db.createContactSubmission(input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
