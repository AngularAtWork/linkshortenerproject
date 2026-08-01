import { CreateLinkDialog } from "@/components/create-link-dialog";
import { DeleteLinkDialog } from "@/components/delete-link-dialog";
import { EditLinkDialog } from "@/components/edit-link-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserLinks } from "@/data/links";
import { auth } from "@clerk/nextjs/server";
import { ExternalLink, Link2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const links = await getUserLinks(userId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              My Links
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Manage and track your shortened links
            </p>
          </div>
          <CreateLinkDialog />
        </div>

        {/* Links List */}
        {links.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <Link2 className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                No links yet
              </h3>
              <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
                Get started by creating your first shortened link
              </p>
              <div className="mt-6">
                <CreateLinkDialog />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {links.map((link) => (
              <Card key={link.id} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Link2 className="h-4 w-4 text-primary" />
                        <span className="font-mono text-primary">
                          /{link.shortCode}
                        </span>
                      </CardTitle>
                      <CardDescription className="break-all">
                        {link.url}
                      </CardDescription>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      aria-label="Open original link"
                    >
                      <ExternalLink className="h-4 w-4 text-zinc-500" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Created {new Date(link.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <EditLinkDialog link={link} />
                      <DeleteLinkDialog
                        linkId={link.id}
                        shortCode={link.shortCode}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
