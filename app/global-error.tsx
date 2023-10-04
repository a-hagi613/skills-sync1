"use client";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);
  
  return (
    <html>
      <body>
        <h2>Oops something went wrong! 😅</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}