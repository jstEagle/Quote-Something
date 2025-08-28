import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        accessCode: v.string(),
        categoryNames: v.array(v.string()),
    },
    handler: async (ctx: any, args: any) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");
        const owner = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q: any) =>
                q.eq("clerkId", identity.subject)
            )
            .first();
        if (!owner) throw new Error("User not found");
        const groupId = await ctx.db.insert("groups", {
            name: args.name,
            description: args.description,
            accessCode: args.accessCode,
            categoryNames: args.categoryNames,
            ownerId: owner._id,
            memberIds: [owner._id],
            createdAt: Date.now(),
        });
        return groupId;
    },
});

export const joinByCode = mutation({
    args: {
        accessCode: v.string(),
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
        const group = await ctx.db
            .query("groups")
            .withIndex("by_accessCode", (q: any) =>
                q.eq("accessCode", args.accessCode)
            )
            .first();
        if (!group) throw new Error("Invalid access code");
        if (
            !group.memberIds.find((id: any) => String(id) === String(user._id))
        ) {
            await ctx.db.patch(group._id, {
                memberIds: [...group.memberIds, user._id],
            });
        }
        return group._id;
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
        const allGroups = await ctx.db.query("groups").collect();
        return allGroups.filter((g: any) =>
            g.memberIds?.some((id: any) => String(id) === String(user._id))
        );
    },
});

export const get = query({
    args: { id: v.id("groups") },
    handler: async (ctx: any, args: any) => {
        return await ctx.db.get(args.id);
    },
});
