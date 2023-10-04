"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import CopyToClipboard from "react-copy-to-clipboard";
import markdownToText from "markdown-to-text";
import ReactMarkdown from "react-markdown";

export default function SideNav() {
  const [coverLetters, setCoverLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoverLetterIndex, setSelectedCoverLetterIndex] =
    useState(null);
  const [copied, setCopied] = useState(false);
  const [showCopyText, setShowCopyText] = useState(true);

  const { userId, isSignedIn, isLoaded, sessionId } = useAuth();

  async function fetchCoverLetters() {
    setIsLoading(true);
    const url = `https://skill-sync.vercel.app/api/cover-letter/${userId}`;

    //`http://127.0.0.1:3000/api/cover-letter/${userId}`;
    if (
      userId !== null &&
      userId !== undefined &&
      isSignedIn === true &&
      isLoaded === true &&
      sessionId !== null &&
      sessionId !== undefined
    ) {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const data = response.data;
          setCoverLetters(data.coverLetters);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCoverLetters();
  }, [isLoaded, isSignedIn, userId, sessionId]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoverLetterIndex(null);
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton className=" h-screen w-56 bg-black  " />
      </div>
    );
  }

  return (
    <div className="flex">
      <div
        className={` w-full sm:w-[70%] md:w-64 lg:w-96 border md:h-screen overflow-y-auto ${
          isModalOpen ? "hidden" : ""
        } mx-auto`}
      >
        <div className="p-2 mt-5 text-xl font-bold text-center underline border-1 ">
          Past Cover Letters
        </div>
        <div>
          {coverLetters.map((coverLetter, index) => (
            <div key={coverLetter.id} className="p-1 my-3">
              <p className="font-bold text-md">
                Cover Letter #{coverLetter.id}
              </p>
              <p className="mb-2 ml-2 truncate">{coverLetter.originalText}</p>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedCoverLetterIndex(index);
                }}
                className="w-full h-10 my-2 bg-orange-400 rounded-lg hover:bg-violet-500"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-3/4 p-4 bg-white rounded-lg shadow-2xl shadow-gradient">
            <div className="flex items-start justify-between">
              <ReactMarkdown className="p-5 leading-loose text-gray-800 text-md">
                {coverLetters[selectedCoverLetterIndex]?.generatedText}
              </ReactMarkdown>
              <div>
                <CopyToClipboard
                  text={markdownToText(
                    coverLetters[selectedCoverLetterIndex]?.generatedText
                  )}
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
                    {showCopyText && <span className="flex ml-1">Copy</span>}
                  </button>
                </CopyToClipboard>
                <button
                  onClick={closeModal}
                  className="bg-orange-400 rounded-lg shadow-2xl shadow-gradient w-[3.5rem] h-8 my-2 mx-1 hover:bg-violet-500"
                >
                  Close
                </button>
                {copied ? (
                  <span className="ml-2 text-lg font-extrabold text-transparent bg-gradient-to-br from-violet-500 via-rose-300 to-orange-400 bg-clip-text">
                    Copied!
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
