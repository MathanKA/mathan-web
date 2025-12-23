"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, Variants } from "motion/react";
import { ElementType } from "react";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

interface TextAnimateProps extends MotionProps {
  /**
   * The text content to animate
   */
  children: string;
  /**
   * The class name to apply to the element
   */
  className?: string;
  /**
   * The element type to render
   * @default "div"
   */
  as?: ElementType;
  /**
   * The animation type to use
   * @default "text"
   */
  by?: AnimationType;
  /**
   * The animation variant to use
   * @default "fadeIn"
   */
  animation?: AnimationVariant;
  /**
   * Whether to animate only once
   * @default false
   */
  once?: boolean;
  /**
   * The delay before starting the animation
   * @default 0
   */
  delay?: number;
  /**
   * The duration of the animation
   * @default 0.3
   */
  duration?: number;
}

export function TextAnimate({
  children,
  className,
  as: Component = "span",
  by = "word",
  animation = "fadeIn",
  once = false,
  delay = 0,
  duration = 0.3,
  ...props
}: TextAnimateProps) {
  const motionVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: {
      filter: animation.includes("blur") ? "blur(10px)" : "blur(0px)",
      opacity: 0,
      y: animation.includes("Up") ? 20 : animation.includes("Down") ? -20 : 0
    },
    show: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: duration
      }
    }
  };

  const segments = by === "word" ? children.split(" ") : [children];

  return (
    <Component className={cn("inline-block", className)} {...props}>
      <motion.span
        variants={motionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once }}
        className="inline-block"
      >
        {segments.map((segment, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block mr-[0.25em] last:mr-0"
          >
            {segment}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
