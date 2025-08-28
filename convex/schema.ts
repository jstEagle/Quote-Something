import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        email: v.optional(v.string()),
        name: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        createdAt: v.number(),
    }).index("by_clerkId", ["clerkId"]),

    groups: defineTable({
        name: v.string(),
        description: v.optional(v.string()),
        accessCode: v.string(),
        categoryNames: v.array(v.string()),
        ownerId: v.id("users"),
        memberIds: v.array(v.id("users")),
        createdAt: v.number(),
    })
        .index("by_accessCode", ["accessCode"]) // for joining via code
        .index("by_owner", ["ownerId"]),

    quotes: defineTable({
        text: v.string(),
        authorId: v.id("users"),
        groupId: v.id("groups"),
        category: v.optional(v.string()),
        createdAt: v.number(),
    }).index("by_group", ["groupId"]),

    // Users who liked a quote (one row per user per quote)
    quoteLikes: defineTable({
        quoteId: v.id("quotes"),
        userId: v.id("users"),
        createdAt: v.number(),
    })
        .index("by_quote", ["quoteId"])
        .index("by_user", ["userId"])
        .index("by_quote_user", ["quoteId", "userId"]),

    // Users who saved/bookmarked a quote (one row per user per quote)
    quoteSaves: defineTable({
        quoteId: v.id("quotes"),
        userId: v.id("users"),
        createdAt: v.number(),
    })
        .index("by_quote", ["quoteId"])
        .index("by_user", ["userId"])
        .index("by_quote_user", ["quoteId", "userId"]),

    // (comments removed)
});
