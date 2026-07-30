import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link Shortener",
  description: "A link shortener application with Clerk authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        elements: {
          modalBackdrop: "!bg-black/50",
        },
      }}
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <html
        lang="en"
        className={`dark ${geistSans.variable} ${geistMono.variable} h-full`}
      >
        <body className="flex flex-col h-full antialiased">
          <header className="border-b">
            <div className="container mx-auto flex items-center justify-between p-4">
              <h1 className="text-xl font-bold">Link Shortener</h1>
              <div className="flex items-center gap-4">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Sign Up</Button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
