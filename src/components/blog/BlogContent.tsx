import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BlogContentProps {
  htmlContent: string;
  className?: string;
}

export const BlogContent = ({ htmlContent, className }: BlogContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={cn("prose prose-invert max-w-none", className)} // prose-invert for dark mode
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

BlogContent.displayName = "BlogContent";