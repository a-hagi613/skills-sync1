import Image from "next/image";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function Section() {
  return (
    <div id="about" className="grid mt-40 md:grid-cols-3">
      <div className="md:col-span-1">
        <Image
          className=" rounded-full  w-[50rem]  "
          src={"/section2.svg"}
          alt="section 2 image"
          width={1000}
          height={1000}
        />
      </div>
      <div className="px-5 md:mt-12 md:ml-10 md:col-span-2">
        <h1 className="mt-5 text-5xl font-bold text-transparent sm:text-center text-start bg-gradient-to-br from-orange-400 via-rose-300 to-violet-500 bg-clip-text">
          With the power of our enhanced Ai you can{" "}
        </h1>
        <ul className="items-center mt-3 text-lg">
          <li className="flex items-center p-3">
            <BsFillCheckCircleFill className="flex-shrink-0 mr-1 text-green-600" />{" "}
            seamlessly sync your resume to match the job description
          </li>
          <li className="flex items-center p-3">
            <BsFillCheckCircleFill className="flex-shrink-0 mr-1 text-green-600" />{" "}
            create brand new cover letters that are tailored to the company and
            position
          </li>
          <li className="flex items-center p-3">
            <BsFillCheckCircleFill className="flex-shrink-0 mr-1 text-green-600" />{" "}
            get a list of keywords to include in your resume
          </li>
          <li className="flex items-center p-3">
            <BsFillCheckCircleFill className="flex-shrink-0 mr-1 text-green-600" />{" "}
            generate personal messages for recruiters and hiring managers{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
