import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Link2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
  // Redirect authenticated users to dashboard
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  // Show landing page for unauthenticated users
  return (
    <div className="flex h-screen max-w-full flex-col overflow-hidden bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-6 py-4 text-center sm:py-8">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 sm:h-16 sm:w-16">
          <Link2 className="w-8 h-8 text-primary" />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl my-[30px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Shorten Your Links
          </h1>

          <p className="max-w-2xl mb-[30px] text-base text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Create short, memorable links in seconds. Track clicks, manage your
            links, and share them with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <SignInButton mode="modal">
              <button className="flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-primary-foreground font-medium transition-colors hover:bg-primary/90">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="flex h-12 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 px-8 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 text-left sm:gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
              Fast & Simple
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Create shortened links instantly with just a few clicks
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
              Track Performance
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Monitor clicks and engagement on all your links
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
              Secure & Reliable
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Your links are protected and always available
            </p>
          </div>
        </div>
      </main>
      <footer className="mt-3 flex grow-[0.25] items-end justify-center px-4 pb-4 pt-2 text-center text-xs text-zinc-600 dark:text-zinc-400 sm:mt-4 sm:px-6 sm:py-4 sm:text-sm">
        © {new Date().getFullYear()} Link Shortener. All rights reserved.
      </footer>
    </div>
  );
}
