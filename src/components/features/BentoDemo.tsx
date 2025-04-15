import {
  FileTextIcon,
  InputIcon,
  GlobeIcon,
  CalendarIcon,
  BellIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "../ui/bento-grid";

const features = [
  {
    Icon: FileTextIcon,
    name: "Advanced Drawing Tools",
    description: "Multiple brush types including pencil, marker, watercolor, and neon effects.",
    href: "/canvas",
    cta: "Try it now",
    background: <img src="https://images.unsplash.com/photo-1629196914375-f9bed855af7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" className="absolute -right-20 -top-20 opacity-30" alt="Drawing tools" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Smart Symmetry",
    description: "Create perfect symmetrical designs with horizontal, vertical, and quad mirror modes.",
    href: "/canvas",
    cta: "Explore symmetry",
    background: <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" className="absolute -right-20 -top-20 opacity-30" alt="Symmetry" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Shape Library",
    description: "Perfect shapes with customizable fill and stroke options.",
    href: "/canvas",
    cta: "See shapes",
    background: <img src="https://images.unsplash.com/photo-1633354931133-27c877bd32d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" className="absolute -right-20 -top-20 opacity-30" alt="Shapes" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "History Tracking",
    description: "Full undo/redo capabilities to perfect your artwork.",
    href: "/canvas",
    cta: "Learn more",
    background: <img src="https://images.unsplash.com/photo-1633354931113-f01350f43af1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" className="absolute -right-20 -top-20 opacity-30" alt="History" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Export Options",
    description: "Save your creations in multiple formats and share them directly to social media.",
    href: "/canvas",
    cta: "Export your art",
    background: <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" className="absolute -right-20 -top-20 opacity-30" alt="Export" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export { BentoDemo };
export default BentoDemo;