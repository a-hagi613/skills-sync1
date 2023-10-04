import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CrispBot from "@/components/CrispBot";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill-Sync",
  description:
    "Skill-Sync is a AI-powered resume builder that helps you create a resume that stands out from the crowd! ",

  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
    // publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning={true}>
        <head>
          <link rel="icon" href="/favicon.ico" /> <CrispBot />
          <body className={"font-mono vsc-initialized"}>
            {/*          ${inter.className}
             */}
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Nav />
              {children}
              {/* <Separator /> */}
              <Footer />
              <ToastContainer />

              <Analytics />
            </ThemeProvider>
          </body>
        </head>
      </html>
    </ClerkProvider>
  );
}
