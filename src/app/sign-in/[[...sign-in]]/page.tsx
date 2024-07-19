import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowBrain - Sign In",
};
export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <SignIn appearance={{ variables: { colorPrimary: "#0F172A" } }} />
    </div>
  );
}
