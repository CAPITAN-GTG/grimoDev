"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const REDIRECT_SECONDS = 5;

export default function SuccessPage() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.replace("/");
    }, REDIRECT_SECONDS * 1000);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-white">
      <main
        id="form-conversion-success"
        data-conversion="lead"
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-white"
      >
        <CheckCircle
          className="h-14 w-14 text-black mb-6"
          strokeWidth={1.25}
          aria-hidden
        />
        <h1 className="font-heading text-3xl sm:text-4xl text-black tracking-wide mb-3">
          Thank you
        </h1>
        <p className="font-body text-neutral-600 max-w-md text-base sm:text-lg">
          We received your message and will get back to you soon.
        </p>
        <p className="font-body text-sm text-neutral-400 mt-10 tracking-wide">
          Returning to home in {secondsLeft}s
        </p>
      </main>
    </div>
  );
}
