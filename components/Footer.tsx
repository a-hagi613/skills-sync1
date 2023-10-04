import React from "react";
import Logo from "/skill-sync-logo-white.svg";
// import Facebook from "/footerFb.svg";
// import Twitter from "/footerTwt.svg";
// import Instagram from "/footerIg.svg";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <div className="mt-2">
      <Separator className="mt-1" />
      <div className="p-3 bg-white-300">
        <div className="grid w-full max-w-screen-xl grid-flow-row grid-cols-3 grid-rows-4 gap-4 px-6 mx-auto sm:px-8 lg:px-16 sm:grid-rows-1 sm:grid-flow-col sm:grid-cols-9">
          <div className="flex flex-col items-start col-start-1 col-end-4 row-span-2 sm:col-span-4 sm:col-end-5 ">
            {/* <LogoVPN className="w-auto h-8 mb-6" /> */}
            <p className="mb-4">
              <strong className="text-lg font-bold text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
                Skill-Sync
              </strong>{" "}
              is a AI-powered resume tool that helps you create a resume that
              stands out from the crowd.
            </p>
            <div className="flex w-full mt-2 mb-8 -mx-2">
              <div className="flex items-center justify-center p-2 mx-2 rounded-full shadow-md bg-white-500">
                {/* <Facebook className="w-6 h-6" /> */}
                <Image
                  alt="facebook icon"
                  src={"/fb-footer.png"}
                  width={1000}
                  height={1000}
                  className="w-6 h-6 text-black cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center p-2 mx-2 rounded-full shadow-md bg-white-500">
                <Image
                  alt="facebook icon"
                  src={"/twt-footer.png"}
                  width={1000}
                  height={1000}
                  className="w-6 h-6 text-black cursor-pointer"
                />{" "}
              </div>
              <div className="flex items-center justify-center p-2 mx-2 rounded-full shadow-md bg-white-500">
                <Image
                  alt="facebook icon"
                  src={"/link-footer.png"}
                  width={1000}
                  height={1000}
                  className="w-6 h-6 text-black cursor-pointer"
                />{" "}
              </div>
            </div>
            <p className="text-gray-400 ">
              {new Date().getFullYear()} - Skill-Sync
              <br />
              Made with ❤️ by{" "}
              <a href="https://github.com/a-hagi613" className="underline">
                Abdullahi
              </a>
            </p>
          </div>
          <div className="flex flex-col row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9">
            <p className="mb-4 text-lg font-medium text-black-600">Product</p>
            <ul className="text-black-500 ">
              <li className="my-2 transition-all cursor-pointer hover:text-orange-500">
                About{" "}
              </li>
              <li className="my-2 transition-all cursor-pointer hover:text-orange-500">
                Reviews{" "}
              </li>
              {/* <li className="my-2 transition-all cursor-pointer hover:text-orange-500">
                Pricing{" "}
              </li> */}
              <li className="my-2 transition-all cursor-pointer hover:text-orange-500">
                FAQ{" "}
              </li>
              <li className="my-2 transition-all cursor-pointer hover:text-orange-500">
                Blog{" "}
              </li>
              <li className="my-2 transition-all cursor-pointer hover:text-orange-500">
                Policy{" "}
              </li>
            </ul>
          </div>

          <div className="flex flex-col row-span-2 sm:col-span-1 sm:col-start-12 ">
            <p className="mb-4 text-lg font-medium text-black-600">
              Contact the Team
            </p>
            <ul className="text-black-500">
              <li className="flex my-2 transition-all cursor-pointer hover:text-orange-500">
                <Image
                  alt="github icon"
                  src="/github.png"
                  width={1000}
                  height={1000}
                  className="w-5 h-5 mr-2"
                />
                <Link href={"https://github.com/a-hagi613"}> Github</Link>
              </li>
              <li className="my-2 transition-all cursor-pointer hover:text-orange-500 ">
                <a href="mailto:abdullahi.hagi98@gmail.com" className="flex ">
                  <MdEmail />

                  <p className="ml-2">Email</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
