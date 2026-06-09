import { cn } from "@/lib/utils";

type FooterProps = {
  classname?: string;
};

export const Footer = ({ classname }: FooterProps) => {
  return (
    <div
      className={cn(
        "w-full border-t-gray-600 mt-8 flex items-center justify-center",
        classname,
      )}
    >
      <div className="py-8">
        <p className="text-white">
          &copy; Agam. Made with NextJS{" "}
          <span className="text-red-600 text-2xl">&hearts;</span>
        </p>
      </div>
    </div>
  );
};
