import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, Check } from "lucide-react"; // Sesuaikan dengan library icon kamu
import { Button } from "@/components/ui/button"; // Sesuaikan path Button kamu
import { cn } from "@/lib/utils";

type EnhanceWithAiButtonProps = {
  isLoading: boolean;
  isSuccess: boolean;
} & React.ComponentProps<typeof Button>;

export const EnhanceWithAiButton = ({
  isLoading,
  isSuccess,
  className,
  ...props
}: EnhanceWithAiButtonProps) => {
  return (
    <Button
      type="button"
      size="lg"
      className={cn("col-span-2", className)}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkle className="animate-spin" />
          </motion.span>
        ) : isSuccess ? (
          <motion.span
            key="success"
            // Efek pop-up membal (spring) disertai sedikit rotasi biar dinamis
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex items-center justify-center text-green-500"
          >
            <Check className="h-5 w-5 stroke-[3]" />
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkle className="h-5 w-5" />
            Generate with Aimploy
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};
