"use client";

import React, { useState } from "react";
import { Button } from "./button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface ShowMoreButtonProps {
  onClick?: () => void;
  className?: string;
  initialState?: boolean;
  showMoreLabel?: string;
  showLessLabel?: string;
}

export function ShowMoreButton({
  onClick,
  className,
  initialState = false,
  showMoreLabel = "Show more",
  showLessLabel = "Show less"
}: ShowMoreButtonProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(initialState);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
    if (onClick) onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex justify-center my-6"
    >
      <Button
        variant="ghost"
        onClick={toggleExpand}
        aria-expanded={isExpanded}
        aria-controls="expandable-content"
        className={className}
      >
        {isExpanded ? showLessLabel : showMoreLabel}
        {isExpanded ? (
          <ChevronUp className="ml-1" size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <ChevronDown className="ml-1" size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </Button>
    </motion.div>
  );
}