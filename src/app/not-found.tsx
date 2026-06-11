"use client";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <h4 className="font-bold text-white text-4xl">404</h4>
        <Button
          onClick={() => router.back()}
          className="rounded-sm cursor-pointer"
        >
          Back to main
        </Button>
      </div>
      <Footer />
    </div>
  );
}
