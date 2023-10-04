import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <div className=" my-80" id="faq">
      <h1 className="mt-10 mb-10 text-5xl font-bold text-center text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
        Frequently Asked Questions
      </h1>
      <Accordion className="" type="single" collapsible>
        <AccordionItem value="item-1" className="border-2 ">
          <AccordionTrigger className="text-xl font-bold">
            How do i know if Skill-Sync is right for me?
          </AccordionTrigger>
          <AccordionContent className="text-md">
            We offer a free to trial answer exactly this! If you don&apos;t like
            it, that&apos;s fine. We won&apos;t charge you a dime for your first
            try.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border-2 ">
          <AccordionTrigger className="text-xl font-bold">
            Will Skill-Sync create a resume for me?
          </AccordionTrigger>
          <AccordionContent className="text-md">
            No. We are not a resume builder. We are a resume syncer. We will
            sync your resume to the job description you provide us. If you need
            to create a resume, we recommend using
            <span>
              {" "}
              <a href="https://zety.com/resume-builder "> zety.com</a>
            </span>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="border-2 ">
          <AccordionTrigger className="text-xl font-bold">
            Is Skill Sync free to use?
          </AccordionTrigger>
          <AccordionContent className="text-md">
            No we are not free to use. We offer a free trial, but after that you are required to use your api key to use our service.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-2 ">
          <AccordionTrigger className="text-xl font-bold">
            Are there any limits on how many resumes i can sync?
          </AccordionTrigger>
          <AccordionContent className="text-md">
            The number of resumes you can sync is based on your api usage, so
            this is entirely dependent on how many times you use the app.
          </AccordionContent>
        </AccordionItem>
        {/* 
        <AccordionItem value="item-5" className="border-2 ">
          <AccordionTrigger className="text-xl font-bold">
            Is there a subscription greater than the premium tier?
          </AccordionTrigger>
          <AccordionContent className="text-md">
            No, currently we only offer the standard and premium tiers. However
            if you need more resumes synced than the premium can offer, please
            contact us.
          </AccordionContent>
        </AccordionItem> */}

        <AccordionItem value="item-6" className="border-2 ">
          <AccordionTrigger className="text-xl font-bold">
            What is an api key?
          </AccordionTrigger>
          <AccordionContent className="text-md">
            An api key is a unique identifier that allows you to use our
            service. You can get one from{" "}
            <a href="https://platform.openai.com/account/api-keys" className="underline">OpenAI</a>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7" className="border-2 ">
          <AccordionTrigger className="text-xl font-bold">
            Who can i contact for help?
          </AccordionTrigger>
          <AccordionContent className="text-md">
            There is a chat icon on the bottom right of the screen. Click on it
            and you will be able to chat with a real human being.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
