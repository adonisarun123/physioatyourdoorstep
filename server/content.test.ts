import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  return {
    user: undefined,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Content Routers", () => {
  it("should list all services", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const services = await caller.services.list();
    
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
    expect(services[0]).toHaveProperty("slug");
    expect(services[0]).toHaveProperty("title");
  });

  it("should get service by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const service = await caller.services.getBySlug({ slug: "sports-physiotherapy" });
    
    expect(service).toBeDefined();
    expect(service?.slug).toBe("sports-physiotherapy");
    expect(service?.title).toBe("Sports Physiotherapy");
  });

  it("should list all locations", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const locations = await caller.locations.list();
    
    expect(Array.isArray(locations)).toBe(true);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0]).toHaveProperty("slug");
    expect(locations[0]).toHaveProperty("city");
    expect(locations[0]).toHaveProperty("area");
  });

  it("should get location by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const location = await caller.locations.getBySlug({ slug: "best-physiotherapist-in-bellandur" });
    
    expect(location).toBeDefined();
    expect(location?.slug).toBe("best-physiotherapist-in-bellandur");
    expect(location?.city).toBe("Bangalore");
    expect(location?.area).toBe("Bellandur");
  });

  it("should list all categories", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.categories.list();
    
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty("slug");
    expect(categories[0]).toHaveProperty("name");
  });

  it("should create a booking", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.booking.create({
      name: "Test User",
      email: "test@example.com",
      phone: "+919876543210",
      serviceId: 1,
      locationArea: "Test Area",
      preferredDate: "2025-02-01",
      preferredTime: "morning",
      condition: "Test condition",
      notes: "Test notes",
    });
    
    expect(result).toEqual({ success: true });
  });

  it("should create a contact submission", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "Test User",
      email: "test@example.com",
      phone: "+919876543210",
      subject: "Test Subject",
      message: "Test message",
    });
    
    expect(result).toEqual({ success: true });
  });
});
