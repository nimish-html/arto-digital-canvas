import { cn } from "../../lib/utils";
import { Terminal, Split, CircleDollarSign, Cloud, Route, HelpCircle, Settings, Heart, FileText, FileInput as Input, Globe, Calendar, Bell } from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  // Using existing features content from the BentoDemo component
  const features = [
    {
      title: "Advanced Drawing Tools",
      description: "Multiple brush types including pencil, marker, watercolor, and neon effects.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "Smart Symmetry",
      description: "Create perfect symmetrical designs with horizontal, vertical, and quad mirror modes.",
      icon: <Input className="w-6 h-6" />,
    },
    {
      title: "Shape Library",
      description: "Perfect shapes with customizable fill and stroke options.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "History Tracking",
      description: "Full undo/redo capabilities to perfect your artwork.",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "Export Options",
      description: "Save your creations in multiple formats and share them directly to social media.",
      icon: <Bell className="w-6 h-6" />,
    },
    {
      title: "Intuitive Interface",
      description: "A clean, user-friendly interface designed for both beginners and professionals.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "Color Palettes",
      description: "Access a wide range of custom color palettes or create your own.",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: "Layer Management",
      description: "Create complex compositions with easy-to-use layer controls.",
      icon: <Split className="w-6 h-6" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-purple-dark dark:text-purple-medium">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-purple-dark dark:group-hover/feature:bg-purple-medium transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};