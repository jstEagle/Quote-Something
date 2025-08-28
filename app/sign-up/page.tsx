"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center">
      <SignUp />
    </div>
  );
}


