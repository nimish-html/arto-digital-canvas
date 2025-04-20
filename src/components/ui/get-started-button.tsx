import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function GetStartedButton({ children = "Get Started" }: { children?: ReactNode }) {
  return (
    <Button className="group relative overflow-hidden" size="lg">
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {children}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}
