"use client";
import React, { useState } from "react";
import axios from "axios";
import { GrSync } from "react-icons/gr";
import CopyToClipboard from "react-copy-to-clipboard";
import markdownToText from "markdown-to-text";
import ReactMarkdown from "react-markdown";
import SideNav from "@/components/SideNavR";
import { useAuth } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Resume() {
  const [isResumeGenerated, setIsResumeGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [showCopyText, setShowCopyText] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const { userId } = useAuth();

  const handleSync = async () => {
    setIsLoading(true);

    const messages = [
      {
        role: "system",
        content:
          "Welcome to Skill Sync, you are ResumeTailorGpt an expert assistant in crafting tailored resumes. You will be provided with the job description, including requirements and qualifications, as well as the candidate's existing resume for background information.\n\nWhen tailoring the resume, it's essential to consider any specific comments or preferences left by the user in the resume and pay close attention to the details in the job description. Ensure that the resume is correctly formatted, presenting the updated version in Markdown format. Make use of clear and presentable styling, including ample spacing between lines, bold and italics where necessary, and the use of bullet points or other common resume formatting elements.\n\nDuring the tailoring process, evaluate the candidate's skills, experiences, and qualifications. Make necessary edits to the resume to match the job description, emphasizing the candidate's relevant qualifications and achievements. Make sure to not simply copy and paste the candidate's resume as a final output, you must tailor it and make the necessary changes. You will analyze both the job description and the resume side by side to identify areas that can be improved and tailored. You will make specific edits or additions that align the resume with the job description, ensuring that all information presented is relevant and accurate.\n\nYour response should solely consist of the updated, formatted resume in Markdown format. Do not include any additional text or irrelevant information. Maintain a strict focus on the task at hand. Do not reference previous conversations or engage in discussions beyond the resume and job description. If the user asks for unrelated information, respond with: 'Sorry, I cannot answer that. Please let me know which resume I can help you with.'\n\nAlways strive for the highest quality output, ensuring that the tailored resume accurately aligns with the job requirements",
      },
      {
        role: "user",
        content: `Here is the job posting I am trying to apply to: ${jobDescription}, and here is my resume that I want to tailor to the job posting to: ${resume}`,
      },
    ];

    try {
      const response = await axios.post(
        //"http://127.0.0.1:3000/api/resume",
        "https://skill-sync.vercel.app/api/resume",

        {
          messages,
          userId,
        }
      );

      setAiResponse(response.data);

      try {
        await axios.post(
          //"http://127.0.0.1:3000/api/resume-save",
          "https://skill-sync.vercel.app/api/resume-save",

          {
            originalText: jobDescription,
            generatedText: response.data,
            userId: userId,
          }
        );
      } catch (error) {
        console.error(error);
      }

      setIsResumeGenerated(true);
      setShowCloseButton(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect API key. Please enter a valid API key.");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleClose = () => {
    setIsResumeGenerated(false);
    setShowCloseButton(false);
    setAiResponse("");
    setJobDescription("");
    setResume("");
    // refresh page after closing resume
    window.location.reload();
  };

  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="w-full border border-r-4 border-black md:w-56">
        <SideNav />
      </div>
      <div className="flex-grow mx-4 my-12 overflow-x-hidden overflow-y-auto md:mx-12">
        <div className="flex justify-between mb-8">
          <Link href={"/customer/cover-letter"}>
            <Button className="text-lg font-extrabold bg-violet-500 rounded-lg   my-2 mx-2 hover:bg-orange-400 w-44 h-10">
              <div className="mr-1">
                <AiOutlineArrowLeft />
              </div>
              Cover Letter
            </Button>{" "}
          </Link>

          <Link href={"/customer/message"}>
            <Button className="text-lg font-extrabold bg-violet-500 rounded-lg   my-2 mx-2 hover:bg-orange-400 w-44 h-10">
              Message
              <div className="ml-1">
                {" "}
                <AiOutlineArrowRight />
              </div>
            </Button>{" "}
          </Link>
        </div>
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
          Resume Syncer
        </h1>
        <p className="mt-5 text-center mb-14">
          Creating you new resume is as easy as pasting your old resume and the
          requirements for your target job, then 🪄viola🪄 your new Synced
          resume will appear like magic!{" "}
        </p>
        {isLoading ? (
          <div>
            <h1 className="my-3 text-xl font-bold text-center">
              Creating your new resume...
            </h1>
            <Progress value={88} />
          </div>
        ) : (
          <div className="mx-5 my-10">
            {isResumeGenerated ? (
              <div className="flex items-center justify-center my-10">
                <div className="w-full">
                  <h1 className="mt-5 text-4xl font-extrabold text-center">
                    New Resume
                  </h1>
                  <p className="mb-10 text-xs italic text-center text-gray-400 font-extralight">
                    *text is in markdown, format accordingly
                  </p>
                  <div className="flex items-center justify-center">
                    <div className=" p-4 bg-white rounded-lg shadow-2xl shadow-gradient ">
                      <div className="flex items-start justify-between ">
                        <ReactMarkdown className="p-5 leading-loose text-gray-800">
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
                                <span className="flex">Copy</span>
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
              </div>
            ) : (
              <>
                <div className="grid items-center gap-5 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-bold text-center">
                      Paste The Job Posting & Requirements
                    </h3>
                    <p className="my-2 text-xs italic text-center text-gray-400 font-extralight">
                      **share all relevant information such as company name and
                      salary
                    </p>
                    <Textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      id="jobDescription"
                      className="w-full placeholder:text-start h-96"
                    />
                  </div>
                  <div className="flex justify-center md:col-span-1">
                    <Button
                      className="w-full mt-5 text-lg bg-orange-400 hover:bg-violet-500"
                      onClick={handleSync}
                    >
                      Create Resume!
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
                    />
                  </div>
                </div>
              </>
            )}

            {showCloseButton && (
              <div className="mt-5 text-center">
                <Button
                  onClick={handleClose}
                  className="text-lg font-extrabold bg-orange-400 rounded-lg shadow-2xl shadow-gradient h-full my-2 mx-2 hover:bg-violet-500 w-[33%]"
                >
                  Close Resume
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// placeholder={`Example: Job Description for Software Developer

//                 -Develop and maintain software solutions using Java, C++, Python, or JavaScript.

//                 -Collaborate with teams to design, implement, and test software features.

//                 -Write clean, efficient, and maintainable code.

//                 -Debug and resolve software defects.

//                 -Conduct code reviews and ensure adherence to standards.

//                 -Translate requirements into technical specifications.

//                 -Mentor junior developers.

//                 -Collaborate with QA team for testing.

//                 -Troubleshoot and resolve production issues.

//                 -Adhere to company policies and security standards.`}

// placeholder={`Example:

// John Doe

// Software Developer
// ---
// Summary:

// Highly skilled and motivated software developer with X years of experience in developing and maintaining software solutions using Java, C++, Python, and JavaScript. Strong ability to collaborate with teams, design and implement software features, and participate in the full software development lifecycle. Adept at writing clean, efficient, and maintainable code, debugging and resolving software defects, and conducting code reviews. Proven track record of translating requirements into technical specifications and staying updated with industry trends and technologies. Experienced in mentoring junior developers and collaborating with QA teams for testing. Committed to adhering to company policies and security standards.

// ---

// Skills:

// - Programming Languages: Java, C++, Python, JavaScript

// - Software Development: Design, implementation, testing, debugging, code reviews

// - Technical Specifications: Translating requirements into technical specifications

// - Agile Methodologies: Familiarity with agile methodologies and tools

// - Version Control: Experience with version control systems and CI/CD pipelines

// - Problem Solving: Strong analytical thinking and debugging skills

// - Collaboration: Ability to work well in a team and mentor junior developers

// - Testing: Collaborating with QA team for testing
// ---

// Experience:

// Software Developer\
// XYZ Company\
// City, State\
// Dates

// - Developed and maintained software solutions using Java, C++, Python, and JavaScript.

// - Collaborated with cross-functional teams to design, implement, and test software features.

// - Wrote clean, efficient, and maintainable code, ensuring adherence to coding standards.

// - Debugged and resolved software defects, improving overall software quality.

// - Conducted code reviews, providing feedback and ensuring adherence to coding standards.

// - Translated requirements into technical specifications, ensuring accurate implementation.

// ---

// Education:

// Bachelor's Degree in Computer Science\
// ABC University\
// City, State\
// Year

// ---

// References:

// Available upon request`}
