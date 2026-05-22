import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setIsMounted] = useState(Boolean);

  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <motion.button
        aria-label='Light mode button'
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className='p-1 flex items-center justify-center rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer '
      >
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className='flex items-center transition-colors duration-300 justify-center h-8 w-8 bg-neutral-300 dark:bg-neutral-700 rounded-full p-1.5'
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </motion.div>
      </motion.button>
    </div>
  );
}

export default ThemeToggle;
