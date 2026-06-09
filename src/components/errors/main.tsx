import { Footer } from "../footer";
import { Button } from "../ui/button";

export const MainErrorFallback = () => {
  return (
    <div className="font-sans h-screen flex flex-col items-center justify-center">
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h2 className="font-bold text-4xl text-white">Something went wrong!</h2>
        <Button
          size={"lg"}
          className="cursor-pointer rounded-sm"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Retry
        </Button>
      </div>
      <Footer />
    </div>
  );
};
