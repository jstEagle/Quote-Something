export default {
    providers: [
        {
            // Clerk issuer (domain) for your instance
            domain: "https://sharp-urchin-29.clerk.accounts.dev",
            // Must match the Clerk JWT template audience (template name "convex")
            applicationID: "convex",
        },
    ],
};
