"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import {
  useAuth,
  clerkClient,
  currentUser,
  useUser,
  auth,
} from "@clerk/nextjs";
import ApiKey from "./ApiKey";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  const logo = "/ai-logo.jpeg";

  useEffect(() => {
    setIsClient(true);
    // console.log(process.env.USER_API_KEY + " user api key");
  }, []);

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  console.log(userId + "user id");

  useEffect(() => {
    if (!userId && isLoaded) {
      console.log("User is not signed in");
      // router.push("/");
    } else {
      console.log("User is signed in");
      // console.log(process.env.USER_API_KEY + " process . env user api key");

      // router.push("/customer");
    }
  }, [userId, isLoaded, router]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="grid w-full h-20 grid-cols-2 md:grid-cols-5 lg:grid-cols-5"
        suppressHydrationWarning
      >
        <div className="col-span-1 md:col-span-1 lg:col-span-1 ">
          <Link href="/" className="flex items-center ">
            <Image
              src={"/skill-sync-logo-white.png"}
              className="w-24 h-16 mt-2 ml-5 rounded-md dark:filter dark:invert"
              width={1000}
              height={1000}
              alt="logo"
            />
          </Link>
        </div>
        <div className="mt-4 text-xl ml- md:col-span-4 lg:col-span-4">
          <button onClick={toggleMenu} className="lg:hidden ">
            <Image
              src="/burger-menu.svg"
              alt="menu"
              width={1000}
              height={1000}
              className="ml-24 w-9 h-9 dark:filter dark:invert"
            />
          </button>{" "}
          <div className="flex justify-around col-span-4 text-xl mt- ">
            {" "}
            <ul
              className={`flex  flex-col space-y-4 lg:space-y-0 lg:flex-row justify-evenly lg:block ${
                isOpen ? " block z-10 " : "hidden "
              } lg:flex`}
            >
              <li className="flex items-center mx-4 cursor-pointer hover:text-slate-700 hover:underline md:mb-4">
                <Link
                  href="/#product"
                  className="flex items-center no-underline"
                >
                  Product
                  <Badge className="ml-2 bg-orange-400 md:-ml- sm:block hover:bg-violet-500 hover:no-underline ">
                    demo!
                  </Badge>
                </Link>
              </li>
              <li className="mx-4 cursor-pointer hover:text-slate-700 hover:underline">
                <Link href="/#about">About</Link>
              </li>
              <li className="mx-4 cursor-pointer hover:text-slate-700 hover:underline">
                <Link href="/#reviews">Reviews</Link>
              </li>
              {/* <li className="mx-4 mt-0 cursor-pointer hover:text-slate-700 hover:underline">
                <Link href="/#pricing">Pricing</Link>
              </li> */}
              <li className="mx-4 mt-0 cursor-pointer hover:text-slate-700 hover:underline">
                <Link href="/#faq">FAQ</Link>
              </li>
              <li className="mx-4 mt-0 cursor-pointer hover:text-slate-700 hover:underline">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="mx-4 mt-0 cursor-pointer hover:text-slate-700 hover:underline">
                <Link href="/policy">Policy</Link>
              </li>
              {isClient && isLoaded ? (
                userId ? (
                  <>
                    <li className="mx-8 mb-5">
                      <Button
                        asChild
                        className="w-full text-lg bg-orange-400 h-15 hover:bg-violet-500"
                      >
                        <Link href="/customer">Dashboard</Link>
                      </Button>
                    </li>

                    <li className="ml-auto">
                      <ApiKey />
                    </li>
                    <li className="mx-8">
                      <UserButton afterSignOutUrl="/" />
                    </li>
                    <li className="mx-8">
                      <ModeToggle />
                    </li>
                  </>
                ) : (
                  <>
                    <li className="mx-8 mb-5">
                      <Button
                        asChild
                        className="w-full text-lg bg-orange-400 h-15 hover:bg-violet-500"
                      >
                        <Link href="/sign-up">Sign Up!</Link>
                      </Button>
                    </li>
                    <li className="mx-8">
                      <UserButton afterSignOutUrl="/" />
                    </li>
                    <li className="mx-8">
                      <ModeToggle />
                    </li>
                    {/* <li className="ml-auto">
                      <ApiKey />
                    </li> */}
                  </>
                )
              ) : null}
            </ul>
          </div>
        </div>
      </div>

      <Separator suppressHydrationWarning />
    </>
  );
}
