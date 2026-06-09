import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <h4 className="font-bold text-white text-4xl">404</h4>
        <Button className="rounded-sm cursor-pointer">Back to main</Button>
      </div>
      <Footer />
    </div>
  );
}
