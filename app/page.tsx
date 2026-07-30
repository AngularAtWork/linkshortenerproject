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
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      <main className="flex flex-col items-center justify-center px-6 py-12 text-center max-w-4xl">
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10">
          <Link2 className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          Shorten Your Links
        </h1>

        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl">
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
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
    </div>
  );
}
