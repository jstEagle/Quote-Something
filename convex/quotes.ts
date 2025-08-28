import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        text: v.string(),
        groupId: v.id("groups"),
        category: v.optional(v.string()),
    },
    handler: async (ctx: any, args: any) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q: any) =>
                q.eq("clerkId", identity.subject)
            )
            .first();
        if (!user) throw new Error("User not found");

        const group = await ctx.db.get(args.groupId);
        if (!group) throw new Error("Group not found");
        if (!group.memberIds.find((id: any) => String(id) === String(user._id)))
            throw new Error("Not a group member");
        const id = await ctx.db.insert("quotes", {
            text: args.text,
            authorId: user._id,
            groupId: args.groupId,
            category: args.category,
            createdAt: Date.now(),
        });
        return id;
    },
});

export const listByGroup = query({
    args: { groupId: v.id("groups") },
    handler: async (ctx: any, args: any) => {
        return await ctx.db
            .query("quotes")
            .withIndex("by_group", (q: any) => q.eq("groupId", args.groupId))
            .order("desc")
            .collect();
    },
});

export const listMine = query({
    args: {},
    handler: async (ctx: any) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q: any) =>
                q.eq("clerkId", identity.subject)
            )
            .first();
        if (!user) return [];

        // Fetch groups that this user is a member of
        const groups = await ctx.db.query("groups").collect();
        const myGroupIds = new Set(
            groups
                .filter((g: any) =>
                    g.memberIds?.some(
                        (id: any) => String(id) === String(user._id)
                    )
                )
                .map((g: any) => g._id)
        );

        if (myGroupIds.size === 0) return [];

        // Fetch quotes for each group and merge results
        const quotesByGroupPromises: Promise<any[]>[] = [];
        for (const groupId of myGroupIds) {
            const p = ctx.db
                .query("quotes")
                .withIndex("by_group", (q: any) => q.eq("groupId", groupId))
                .order("desc")
                .collect();
            quotesByGroupPromises.push(p);
        }

        const quotesNested = await Promise.all(quotesByGroupPromises);
        const quotes = quotesNested.flat();

        // Sort newest to oldest by createdAt (defensive sort in case of clock skew)
        quotes.sort((a: any, b: any) => b.createdAt - a.createdAt);
        return quotes;
    },
});
