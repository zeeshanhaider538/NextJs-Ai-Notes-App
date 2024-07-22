import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default function Home() {
  const { userId } = auth();
  if (userId) {
    redirect("/notes");
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="FlowBrain Logo" width={100} height={100} />
        <span className="font-extrabold tracking-tight text-4xl lg:text-5xl">
          FlowBrain
        </span>
      </div>
      <p className="text-center max-w-prose">
        An Intelligent Note Taking app with AI Integrations, built with OpenAI,
        Pinecone, Next.js, Shadcn UI, Clerk and more...
      </p>
      <Button size="lg" asChild>
        <Link href="/notes">Open</Link>
      </Button>
    </main>
  );
}
// time 1 :11:36
