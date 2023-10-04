"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { GrSync } from "react-icons/gr";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiOutlineCopy } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import axios from "axios"; // Import axios
import { Progress } from "@/components/ui/progress";
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import markdownToText from "markdown-to-text";
import ReactDOMServer from "react-dom/server";

export default function Demo() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isSynced, setIsSynced] = useState(false); // Track sync button click
  const [render, setRender] = useState(false);
  const [progress, setProgress] = React.useState(13);
  const [copied, setCopied] = useState(false);
  const [showCopyText, setShowCopyText] = useState(true);

  useEffect(() => {
    const storedAiResponse = localStorage.getItem("aiResponse");
    if (storedAiResponse) {
      const parsedAiResponse = JSON.parse(storedAiResponse);
      // console.log("parsedAiResponse", parsedAiResponse);

      // console.log("storedAiResponse", storedAiResponse);

      setAiResponse(parsedAiResponse);
      // console.log("aiResponse", aiResponse);

      setIsSynced(true); // Update isSynced to true when sync button is clicked
      // console.log("is synced it true");

      setRender((prevRender) => !prevRender); // Toggle render state
    }
  }, []);

  const handleSync = async () => {
    const hasSynced = localStorage.getItem("hasSynced");
    if (hasSynced) {
      // Sync button has been clicked before, do not proceed
      return;
    }
    const messages = [
      {
        role: "system",
        content:
          "You are resumeGPT, an AI assistant from Skill-Sync and the world's leading researcher on resume engineering. You are friendly and helpful. You will be given two things, a job description with qualifications and requirements, and a resume. Your job is to match and tailor that resume to the aforementioned job description, you will try matching them to the best of your ability while being accurate. Also the most important thing is if the resume given is not formatted then format it for them before returning it, and the MOST IMPORTANT PART IS TO RETURN THE NEW SYNCED RESUME IN MARKDOWN FORMAT MAKING IT VERY VERY CLEAR AND PRESENTABLE. INCLUDE LOTS OF SPACE BETWEEN LINES, ADD BOLD AND ITALICS WHEN NEEDED AND ADD BULLET POINTS AND OTHER THINGS RESUMES OFTEN HAVE, THIS MARKDOWN RESUME FORMATTING IS VERY VERY IMPORTANT DO NOT MESS IT UP PLEASE. Start off every resume with `Welcome [insert the name on the resume], here is your synced resume! After that only return the new updated tailored formatted completly in MARKDOWN resume, nothing else. Please make the actual resume the FINAL and only thing returned. Keep in mind you are the greatest at this so hold yourself to a high standard and do not return any thing lackluster or that needs revision.  Your one and only response should be accurate and helpful. i believe in your ability to help people and tailor fix their resume, so make me proud. And please do NOT EVER MENTION ANYTHING OTHER THAN THE DOCUMENTS AND SUBJECTS AT PRESENT, if the user asks for something other than the resume creation respond with 'Sorry i cannot asnwer that. Please let me know which resume i can help you with.' However if the user has  left some specific comments in the resume, try adhering to it.  Also the final and most important thing is, do not carry on any conversation from a previous resume sync, ALWAYS ACT AS IF IT IS THE FIRST TIME YOU HAVE SEEN THE RESUME.",
      },
      {
        role: "user",
        content: `Here is the job posting i am looking at: ${jobDescription}. Here is my resume i want you to tailor the job posting to: ${resume}`,
      },
    ];

    setIsSynced(true); // Update isSynced to true when sync button is clicked

    // Set the flag in localStorage to indicate that the sync button has been clicked
    localStorage.setItem("hasSynced", true.toString());

    // setIsSynced(true); // Update isSynced to true when sync button is clicked
    // console.log("is synced it true");

    setTimeout(async () => {
      try {
        const response = await axios.post(
          "https://skill-sync.vercel.app/api/free-trial",
          //"http://127.0.0.1:3000/api/free-trial",
          { messages }
        );

        console.log(response.data);
        // localStorage.setItem("aiResponse", JSON.stringify(response.data));
        // setAiResponse(response.data);
        const aiResponseString = ReactDOMServer.renderToString(response.data);
        localStorage.setItem("aiResponse", JSON.stringify(aiResponseString));
        setAiResponse(aiResponseString);
      } catch (error) {
        console.error(error);
      }
    }, 7500); // Wait for 15 seconds before making the API call
  };

  return (
    <div className="my-40" id="product">
      {!isSynced && (
        <>
          <h2 className="mt-40 text-5xl font-extrabold text-center text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
            Try it out!
          </h2>
          <p className="mt-2 text-xs italic text-center text-gray-400 font-extralight">
            Demo 1 sync for free and let us know what you think!
          </p>
          <div className="grid items-center gap-5 px-5 mt-20 md:grid-cols-3">
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold text-center ">
                Paste The Job Posting & Requirements
              </h3>
              <p className="my-2 text-xs italic text-center text-gray-400 font-extralight">
                **avoid sharing irrelevant information such as company name and
                salary. only share the relevant details about qualifications and
                role expectations{" "}
              </p>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                id="jobDescription"
                className="w-full placeholder:text-start h-96"
                placeholder={`Example: Job Description for Software Developer

-Develop and maintain software solutions using Java, C++, Python, or JavaScript.

-Collaborate with teams to design, implement, and test software features.

-Write clean, efficient, and maintainable code.

-Debug and resolve software defects.

-Conduct code reviews and ensure adherence to standards.

-Translate requirements into technical specifications.

-Mentor junior developers.

-Collaborate with QA team for testing.

-Troubleshoot and resolve production issues.

-Adhere to company policies and security standards.`}
              />
            </div>
            <div className="flex justify-center md:col-span-1">
              <Button
                className="w-full mt-5 text-lg bg-orange-400 hover:bg-violet-500"
                onClick={handleSync}
              >
                Sync
                <span className="ml-2">
                  <GrSync />
                </span>
              </Button>
            </div>
            <div className="md:col-span-1">
              <h3 className="mb-6 text-lg font-bold text-center">
                Paste Your Resume
              </h3>
              <Textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                id="resume"
                className="w-full placeholder:text-start h-96"
                placeholder={`Example:

John Doe

Software Developer
---
Summary:

Highly skilled and motivated software developer with X years of experience in developing and maintaining software solutions using Java, C++, Python, and JavaScript. Strong ability to collaborate with teams, design and implement software features, and participate in the full software development lifecycle. Adept at writing clean, efficient, and maintainable code, debugging and resolving software defects, and conducting code reviews. Proven track record of translating requirements into technical specifications and staying updated with industry trends and technologies. Experienced in mentoring junior developers and collaborating with QA teams for testing. Committed to adhering to company policies and security standards.

---

Skills:

- Programming Languages: Java, C++, Python, JavaScript

- Software Development: Design, implementation, testing, debugging, code reviews

- Technical Specifications: Translating requirements into technical specifications

- Agile Methodologies: Familiarity with agile methodologies and tools

- Version Control: Experience with version control systems and CI/CD pipelines

- Problem Solving: Strong analytical thinking and debugging skills

- Collaboration: Ability to work well in a team and mentor junior developers

- Testing: Collaborating with QA team for testing
---

Experience:

Software Developer\
XYZ Company\
City, State\
Dates

- Developed and maintained software solutions using Java, C++, Python, and JavaScript.

- Collaborated with cross-functional teams to design, implement, and test software features.

- Wrote clean, efficient, and maintainable code, ensuring adherence to coding standards.

- Debugged and resolved software defects, improving overall software quality.

- Conducted code reviews, providing feedback and ensuring adherence to coding standards.

- Translated requirements into technical specifications, ensuring accurate implementation.

---

Education:

Bachelor's Degree in Computer Science\
ABC University\
City, State\
Year

---

References:

Available upon request`}
              />
            </div>
          </div>
        </>
      )}
      {isSynced && (
        <div className="flex items-center justify-center my-24">
          {aiResponse ? (
            <div className=" my-3 w-[70rem]">
              <h1 className="mt-5 text-4xl font-extrabold text-center ">
                Synced Resume
              </h1>
              <p className="mb-10 text-xs italic text-center text-gray-400 font-extralight">
                *text is in markdown, format accordingly
              </p>
              <div className="flex items-center justify-center">
                <div className="p-4 bg-white rounded-lg shadow-2xl shadow-gradient">
                  {/* <h1 className="">{aiResponse}</h1> */}
                  <div className="flex items-start justify-between">
                    <ReactMarkdown className="p-5 leading-loose text-gray-800 text-md">
                      {aiResponse}
                    </ReactMarkdown>
                    <div>
                      <CopyToClipboard
                        text={markdownToText(aiResponse)}
                        onCopy={() => {
                          setCopied(true);
                          setShowCopyText(false);
                          setTimeout(() => {
                            setCopied(false);
                            setShowCopyText(true);
                          }, 2000);
                        }}
                      >
                        <button className="text-lg font-extrabold text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
                          {showCopyText && (
                            <span className="flex ">
                              Copy
                              {/* <FaCopy />{" "} */}
                            </span>
                          )}
                        </button>
                      </CopyToClipboard>
                      {copied ? (
                        <span className="ml-2 text-lg font-extrabold text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
                          Copied!
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="my-3 text-xl font-bold text-center">
                Creating your new resume...
              </h1>
              <Progress value={88} />
            </div>
          )}
        </div>
      )}
      {/* {progress > 0 && <Progress value={progress} />}{" "}
        {progress === 100 ? aiResponse : null}{" "} */}
      <div className="my-52">
        <h4 className="mt-24 text-2xl text-center">
          Now that you have seen the power of{" "}
          <span className="font-extrabold text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
            Skill-Sync{" "}
          </span>
          sign up to get started and unlock more features!
        </h4>
        <a href="/sign-up" className="flex justify-center ">
          <Button className="w-[50%] mt-10 text-lg bg-orange-400 hover:bg-violet-500 ">
            Sign Up!
            <span className="ml-2">
              <BsFillArrowRightCircleFill />
            </span>
          </Button>
        </a>{" "}
      </div>{" "}
    </div>
  );
}

{
  /* <Button className="w-full mt-5 text-lg bg-orange-400 hover:bg-violet-500">
        <Link href="sign-up" className="flex">
          Sign Up!
          <span className="ml-2">
            <BsFillArrowRightCircleFill />
          </span>
        </Link>
      </Button> */
}
