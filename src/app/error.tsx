"use client";

import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="font-sans h-screen flex flex-col items-center justify-center">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h2 className="font-bold text-4xl text-white">Something went wrong!</h2>
        <Button
          size={"lg"}
          className="cursor-pointer rounded-sm"
          onClick={() => reset()}
        >
          Retry
        </Button>
      </div>
      <Footer />
    </div>
  );
}
