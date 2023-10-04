import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <center>
        <div className="text-4xl text-center font-extrabold my-4">
          {" "}
          Loading...
        </div>
        <Skeleton
          className="w-[90%] h-screen rounded bg-gray-200
"
        />
      </center>
    </>
  );
}
