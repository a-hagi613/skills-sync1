"use client";
import Demo from "@/components/Demo";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Customer() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <>
      <div className="text-center mt-24">
        <h1 className="text-4xl font-bold">
          Welcome back{" "}
          <span className="text-4xl font-bold text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
            {user?.firstName}
          </span>{" "}
          What would you like to do today?
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center my-10 ">
        <div className="w-[50%] space my-10">
          <div className="mt-12">
            <Button
              asChild
              className="w-full text-lg  bg-orange-400 h-12 hover:bg-violet-500"
            >
              <Link href="/customer/resume" >
                Sync Resumes
              </Link>
            </Button>
          </div>
          <div className="my-12">
            <Button
              asChild
              className="w-full text-lg bg-orange-400 h-12 hover:bg-violet-500"
            >
              <Link href="/customer/cover-letter">Sync Cover Letters</Link>
            </Button>
          </div>
          <div className="my-12">
            <Button
              asChild
              className="w-full text-lg bg-orange-400 h-12 hover:bg-violet-500"
            >
              <Link href="/customer/message">Generate Cold Messages</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* <Demo /> */}
    </>
  );
}
