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

// Get a single quote with likes/saves meta for the current user
export const getByIdWithMeta = query({
    args: { quoteId: v.id("quotes") },
    handler: async (ctx: any, args: any) => {
        const identity = await ctx.auth.getUserIdentity();
        const quote = await ctx.db.get(args.quoteId);
        if (!quote) return null;

        const likes = await ctx.db
            .query("quoteLikes")
            .withIndex("by_quote", (q: any) => q.eq("quoteId", quote._id))
            .collect();
        const likesCount = likes.length;

        let likedByMe = false;
        let savedByMe = false;
        if (identity) {
            const user = await ctx.db
                .query("users")
                .withIndex("by_clerkId", (q: any) =>
                    q.eq("clerkId", identity.subject)
                )
                .first();
            if (user) {
                const [existingLike, existingSave] = await Promise.all([
                    ctx.db
                        .query("quoteLikes")
                        .withIndex("by_quote_user", (q: any) =>
                            q.eq("quoteId", quote._id).eq("userId", user._id)
                        )
                        .first(),
                    ctx.db
                        .query("quoteSaves")
                        .withIndex("by_quote_user", (q: any) =>
                            q.eq("quoteId", quote._id).eq("userId", user._id)
                        )
                        .first(),
                ]);
                likedByMe = !!existingLike;
                savedByMe = !!existingSave;
            }
        }

        return {
            ...quote,
            likesCount,
            likedByMe,
            savedByMe,
        };
    },
});

// List quotes in a group with likes/saves meta for the current user
export const listByGroupWithMeta = query({
    args: { groupId: v.id("groups") },
    handler: async (ctx: any, args: any) => {
        const identity = await ctx.auth.getUserIdentity();
        let user: any | null = null;
        if (identity) {
            user = await ctx.db
                .query("users")
                .withIndex("by_clerkId", (q: any) =>
                    q.eq("clerkId", identity.subject)
                )
                .first();
        }
        const quotes = await ctx.db
            .query("quotes")
            .withIndex("by_group", (q: any) => q.eq("groupId", args.groupId))
            .order("desc")
            .collect();

        const results = await Promise.all(
            quotes.map(async (q: any) => {
                const likes = await ctx.db
                    .query("quoteLikes")
                    .withIndex("by_quote", (qi: any) => qi.eq("quoteId", q._id))
                    .collect();
                const likesCount = likes.length;
                let likedByMe = false;
                let savedByMe = false;
                if (user) {
                    const [existingLike, existingSave] = await Promise.all([
                        ctx.db
                            .query("quoteLikes")
                            .withIndex("by_quote_user", (qi: any) =>
                                qi.eq("quoteId", q._id).eq("userId", user!._id)
                            )
                            .first(),
                        ctx.db
                            .query("quoteSaves")
                            .withIndex("by_quote_user", (qi: any) =>
                                qi.eq("quoteId", q._id).eq("userId", user!._id)
                            )
                            .first(),
                    ]);
                    likedByMe = !!existingLike;
                    savedByMe = !!existingSave;
                }
                return { ...q, likesCount, likedByMe, savedByMe };
            })
        );
        return results;
    },
});

export const toggleLike = mutation({
    args: { quoteId: v.id("quotes") },
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
        const quote = await ctx.db.get(args.quoteId);
        if (!quote) throw new Error("Quote not found");
        const group = await ctx.db.get(quote.groupId);
        if (!group) throw new Error("Group not found");
        if (!group.memberIds.find((id: any) => String(id) === String(user._id)))
            throw new Error("Not a group member");

        const existing = await ctx.db
            .query("quoteLikes")
            .withIndex("by_quote_user", (q: any) =>
                q.eq("quoteId", quote._id).eq("userId", user._id)
            )
            .first();
        if (existing) {
            await ctx.db.delete(existing._id);
            return { liked: false };
        } else {
            await ctx.db.insert("quoteLikes", {
                quoteId: quote._id,
                userId: user._id,
                createdAt: Date.now(),
            });
            return { liked: true };
        }
    },
});

export const toggleSave = mutation({
    args: { quoteId: v.id("quotes") },
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
        const quote = await ctx.db.get(args.quoteId);
        if (!quote) throw new Error("Quote not found");
        const group = await ctx.db.get(quote.groupId);
        if (!group) throw new Error("Group not found");
        if (!group.memberIds.find((id: any) => String(id) === String(user._id)))
            throw new Error("Not a group member");

        const existing = await ctx.db
            .query("quoteSaves")
            .withIndex("by_quote_user", (q: any) =>
                q.eq("quoteId", quote._id).eq("userId", user._id)
            )
            .first();
        if (existing) {
            await ctx.db.delete(existing._id);
            return { saved: false };
        } else {
            await ctx.db.insert("quoteSaves", {
                quoteId: quote._id,
                userId: user._id,
                createdAt: Date.now(),
            });
            return { saved: true };
        }
    },
});

// (comments removed)

// List quotes from all groups the current user belongs to (basic)
// (removed duplicate listMine)

// List quotes from all groups the current user belongs to with likes/saves meta
export const listMineWithMeta = query({
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
        const groups = await ctx.db.query("groups").collect();
        const myGroups = groups.filter((g: any) =>
            g.memberIds?.some((id: any) => String(id) === String(user._id))
        );
        const quotesArrays = await Promise.all(
            myGroups.map((g: any) =>
                ctx.db
                    .query("quotes")
                    .withIndex("by_group", (q: any) => q.eq("groupId", g._id))
                    .order("desc")
                    .collect()
            )
        );
        const quotes = quotesArrays
            .flat()
            .sort((a: any, b: any) => b.createdAt - a.createdAt);
        const results = await Promise.all(
            quotes.map(async (q: any) => {
                const likes = await ctx.db
                    .query("quoteLikes")
                    .withIndex("by_quote", (qi: any) => qi.eq("quoteId", q._id))
                    .collect();
                const likesCount = likes.length;
                const [existingLike, existingSave] = await Promise.all([
                    ctx.db
                        .query("quoteLikes")
                        .withIndex("by_quote_user", (qi: any) =>
                            qi.eq("quoteId", q._id).eq("userId", user!._id)
                        )
                        .first(),
                    ctx.db
                        .query("quoteSaves")
                        .withIndex("by_quote_user", (qi: any) =>
                            qi.eq("quoteId", q._id).eq("userId", user!._id)
                        )
                        .first(),
                ]);
                return {
                    ...q,
                    likesCount,
                    likedByMe: !!existingLike,
                    savedByMe: !!existingSave,
                };
            })
        );
        return results;
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
