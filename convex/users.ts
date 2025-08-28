import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const ensureUser = mutation({
    args: {
        clerkId: v.string(),
        email: v.optional(v.string()),
        name: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx: any, args: any) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q: any) => q.eq("clerkId", args.clerkId))
            .first();
        if (existing) return existing._id;
        const id = await ctx.db.insert("users", {
            clerkId: args.clerkId,
            email: args.email,
            name: args.name,
            imageUrl: args.imageUrl,
            createdAt: Date.now(),
        });
        return id;
    },
});

export const getByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q: any) => q.eq("clerkId", args.clerkId))
            .first();
    },
});
