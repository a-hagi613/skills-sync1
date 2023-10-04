import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex justify-center mt-10">
      <SignIn
        appearance={{
          elements: {
            footerActionText: "text-md ml-16",
          },
        }}
      />
    </div>
  );
}
