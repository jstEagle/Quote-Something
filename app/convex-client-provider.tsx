"use client";

import { ReactNode, useEffect } from "react";
import { ClerkProvider, useUser, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convex = new ConvexReactClient(convexUrl);

function ClerkSync() {
  const { isSignedIn, user } = useUser();
  const ensureUser = useMutation(api.users.ensureUser);

  useEffect(() => {
    if (!isSignedIn || !user) return;
    ensureUser({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? undefined,
      name: user.fullName ?? undefined,
      imageUrl: user.imageUrl ?? undefined,
    }).catch(() => {});
  }, [isSignedIn, user, ensureUser]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkSync />
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}