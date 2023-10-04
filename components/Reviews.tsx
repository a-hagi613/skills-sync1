import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiFillStar, AiFillHeart } from "react-icons/ai";

export default function Reviews() {
  return (
    <>
      <div id="reviews" className="flex items-center justify-center mt-32">
        <div className="text-center">
          <h3 className="flex mb-8 text-5xl text-transparent sm:text-center bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
            Our Customer Reviews{" "}
            <span className="ml-2 text-red-500 rounded-lg">
              <AiFillHeart />
            </span>
          </h3>
        </div>
      </div>

      <div className="grid  gap-7 md:grid-cols-4">
        <div>
          <Card className="h-full border-2 ">
            <CardContent className="flex flex-col justify-between">
              <p className="p-1 text-lg">
                {
                  '"I couldn`t believe how perfectly my resume and cover letter were tailored to the job descriptions! Thanks to Skill-Sync, I landed my dream job! Serious game-changer!"'
                }

                <span className="font-bold ">-Sarah M </span>
              </p>
              <div className="flex items-center justify-between mt-8">
                <div className="flex">
                  <p className="flex">
                    4.6{" "}
                    <span className="mt-1 ml-1 text-yellow-500">
                      <AiFillStar />
                    </span>
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Avatar>
                    <AvatarImage src="/userG1.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full border-2 ">
            <CardContent className="flex flex-col justify-between">
              <p className="p-1 text-lg">
                {
                  '"Skill-Swap took my existing resume and transformed it into a powerful tool that showcased and highlighted my skills and experience in alignment with the job requirements. Highly recommended!"'
                }

                <span className="font-bold ">-John D </span>
              </p>
              <div className="flex items-center justify-between mt-8">
                <div className="flex">
                  <p className="flex">
                    4.7{" "}
                    <span className="mt-1 ml-1 text-yellow-500">
                      <AiFillStar />
                    </span>
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Avatar>
                    <AvatarImage src="/userB1.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full border-2 ">
            <CardContent className="flex flex-col justify-between">
              <p className="p-1 text-lg">
                {
                  '"I was amazed at how quickly and accurately the Skill-Swap generated a tailored resume and cover letter for me. It saved me hours of manual work and helped me secure multiple job interviews."'
                }

                <span className="font-bold ">-Emily S </span>
              </p>
              <div className="flex items-center justify-between mt-8">
                <div className="flex">
                  <p className="flex">
                    4.4{" "}
                    <span className="mt-1 ml-1 text-yellow-500">
                      <AiFillStar />
                    </span>
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Avatar>
                    <AvatarImage src="/userG2.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full border-2 ">
            <CardContent className="flex flex-col justify-between">
              <p className="p-1 text-lg">
                {
                  '"As a recent graduate, I was struggling to create a compelling resume. Skill-Swap not only tailored my resume to match the job description but also provided valuable suggestions to improve on it."'
                }
                <span className="font-bold ">-Michael R </span>
              </p>
              <div className="flex items-center justify-between mt-8">
                <div className="flex">
                  <p className="flex">
                    4.9{" "}
                    <span className="mt-1 ml-1 text-yellow-500">
                      <AiFillStar />
                    </span>
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Avatar>
                    <AvatarImage src="/userB2.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
