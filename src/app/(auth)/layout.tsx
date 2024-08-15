"use client";
import { Suspense, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, token, tokenExpiry, logout } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
    tokenExpiry: state.tokenExpiry,
    logout: state.logout,
  }));

  useEffect(() => {
    if (user && token && tokenExpiry) {
      const expiryDate = new Date(tokenExpiry);
      const currentDate = new Date();

      if (currentDate >= expiryDate) {
        // Token has expired, log the user out
        logout();
        router.push("/signin");
      } else {
        // User is logged in and token is valid, redirect to the home page
        router.push("/");
      }
    }
  }, [user, token, tokenExpiry, logout, router]);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </main>
  );
}
