import Image from "next/image";
import logo from "@/assets/logo.png";
export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src={logo} alt="FlowBrain Logo" width={100} height={100} />
        <span className="font-extrabold tracking-tight text-4xl lg:text-5xl">
          FlowBrain
        </span>
      </div>
    </main>
  );
}
// time 11:36
