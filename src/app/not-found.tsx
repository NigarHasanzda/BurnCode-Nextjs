// app/not-found.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">

      <div className="mb-10">
        <Image
          src="/404-error-img.png"
          alt="404 Not Found"
          width={400}
          height={400}
          className="mx-auto"
        />
      </div>
      <div className="mb-10">
        <h2 className="text-5xl font-bold mb-4 text-[#635BFF]">Page Not Found!</h2>
        <p className="text-gray-500 mb-6">
          We're sorry, the page you requested could not be found.
        </p>
      </div>
      <button
        onClick={() => router.push("/az")}
        className="bg-[#635BFF] text-white px-8 py-3 rounded-lg hover:bg-[#5249e6] transition-all uppercase font-semibold"
      >
        Back To Home
      </button>
    </div>
  );
}