// import { authMiddleware } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
 
// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default authMiddleware({
//     publicRoutes: ["/","api/users", "/#product", "/#about", "/#reviews", "/policy", "/faq","/blog", "/api/free-trial" ,  "/api/cover-letter" ,  "/api/cover-letter-save/", "api/resume-save", "/api/cover-letter/:userId" , "/api/resume/:userId", "/api/cover-letter/find/:userId/:coverLetterId", "/api/resume/find/:userId/:resumeId", "/api/create", "/api/message", "/api/message-save", "/api/message/:userId", "/api/message/find/:userId/:messageId", "/api/message-save/:userId"],
//     ignoredRoutes: ["/((?!api|trpc))(_next|.+\..+)(.*)" , "/api/free-trial" ,  "/api/cover-letter" ,  "/api/cover-letter-save/", "/api/resume-save/", "/api/resume/" , "/api/resume/:userId", "/api/cover-letter/:userId" , "/api/resume/find/:userId/:resumeId", "/api/cover-letter/find/:userId/:coverLetterId", "/api/create" , "/api/message", "/api/message-save", "/api/message/:userId", "/api/message/find/:userId/:messageId", "/api/message-save/:userId"]

//   });
 
// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
 


import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes:["/", ]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 