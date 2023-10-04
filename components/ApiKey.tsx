"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaKey } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ApiKey() {
  const [apiKey, setApiKey] = useState("");

  const buttonRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the current route is '/customer'
    if (pathname === "/customer") {
      // If so, simulate a click event on the button
      buttonRef.current.click(); // <-- change is here
    }
  }, [pathname]);

  const handleChange = (e) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
  };

  const handleContinue = async () => {
    try {
      await axios.post(
        //"http://127.0.0.1:3000/api/save-api-key",
        "https://skill-sync.vercel.app/api/save-api-key",

        {
          apiKey: apiKey,
        }
      );

      console.log(`API key "${apiKey}" saved successfully`);
      process.env.USER_API_KEY = apiKey;
    } catch (error) {
      console.error("Error saving API key:", error);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            ref={buttonRef}
            variant="outline"
            className="w-full text-lg bg-violet-500 h-15 hover:bg-orange-400"
          >
            API <BsFillGearFill className="ml-2" />{" "}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Please enter your API Key from {"  "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://platform.openai.com/account/api-keys"}
              >
                <span className="underline text-lg font-bold text-orange-400 hover:text-violet-500">
                  OpenAi{" "}
                </span>
              </a>
              <p className="mt-2 text-xs italic  text-gray-400 font-extralight">
                *please click cancel if you have already put your API key
              </p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                type="password"
                placeholder="* * * * * * * * * *"
                onChange={handleChange}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-orange-400 hover:bg-violet-500"
              onClick={handleContinue}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
