import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "lucide-react";

export default function Hero() {
  const hero = "/pic1.jpg";
  return (
    <div className="grid gap-10 md:grid-cols-5 lg:grid-cols-5 md:mt-10">
      <div className=" sm:mt-12 md:col-span-2 lg:col-span-2">
        <h1 className="mt-12 text-6xl font-bold text-transparent mr-18 text-start bg-gradient-to-br from-orange-400 via-rose-300 to-violet-500 bg-clip-text">
          Custom Ai-Tailored resumes & cover letters for every job!
        </h1>
        <a href="#product" className="flex">
          <Button className="w-full mt-10 text-lg bg-orange-400 hover:bg-violet-500 ">
            Try Now for Free!
            <span className="ml-2">
              <BsFillArrowRightCircleFill />
            </span>
          </Button>
        </a>

        <p className="mt-2 text-xs italic text-center text-gray-400 font-extralight">
          *No sign-up or credit card required
        </p>
      </div>
      <div className="md:col-span-3 lg:col-span-3 ">
        <Image
          priority
          src={"/hero1.svg"}
          className="w-full rounded-full h-"
          width={1000}
          height={1000}
          alt="girl chatting with ai"
        />
      </div>
    </div>
  );
}

// <div className="grid grid-cols-5 gap-10 mt-20 sm:flex">
// <div className="col-span-2 ">
//   <h1 className="text-5xl font-bold">
//     Tailored resumes and cover letters for every job!
//   </h1>
// </div>
// <div className="col-span-3">
//   <Image
//     src={hero}
//     className="w-full rounded-lg"
//     width={1000}
//     height={1000}
//     alt="girl chatting with ai"
//   />
// </div>
// </div>
