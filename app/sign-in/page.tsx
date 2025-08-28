"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
      <SignIn />
    </div>
  );
}


