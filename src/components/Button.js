import Link from "next/link";
import { motion } from "framer-motion";

const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  hoverIntensity = "medium",
  className = "",
  fullWidth = false,
  disabled = false,
  type = "button",
  icon = null,
  iconPosition = "left",
  ...props
}) => {
  const baseClasses =
    "rounded-full font-medium transition-all duration-200 inline-flex items-center justify-center overflow-hidden";

  const sizeClasses = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2.5",
    lg: "px-8 py-3 text-lg",
  };

  const variantClasses = {
    primary: `
      bg-primary hover:bg-primary-dark text-white
      shadow-md hover:shadow-lg
      dark:bg-primary/90 dark:hover:bg-primary
      dark:shadow-primary/20
    `,
    secondary: `
      bg-secondary hover:bg-secondary/90 text-white
      shadow-md hover:shadow-lg
      dark:bg-secondary/90 dark:hover:bg-secondary
      dark:shadow-secondary/20
    `,
    outline: `
        bg-transparent border border-primary/50 hover:border-primary
        text-[color:var(--foreground)] hover:text-primary hover:bg-primary/5
        dark:hover:text-primary-dark dark:hover:bg-primary/10 dark:border-primary/30
      `,
      ghost: `
        bg-transparent text-[color:var(--foreground)] hover:text-primary
        dark:hover:text-primary-dark hover:bg-primary/5 dark:hover:bg-primary/10
      `,

      link: `
  bg-transparent p-0
  text-[color:var(--foreground)] hover:text-primary
  dark:hover:text-primary-dark
  underline-offset-4 hover:underline transition-colors
`,
circle: `
  w-10 h-10 p-0
  bg-transparent
  text-[color:var(--foreground)] hover:text-primary hover:bg-primary/5
  dark:hover:text-primary-dark dark:hover:bg-primary/10
  transition-colors
`,

    
  };

  const buttonClasses = [
    baseClasses,
    variant !== "circle" ? sizeClasses[size] : "",
    variantClasses[variant] || "",
    fullWidth ? "w-full" : "",
    disabled ? "opacity-60 cursor-not-allowed dark:opacity-50" : "",
    className,
  ]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ");

  const renderContent = () => {
    if (variant === "circle") return icon;

    return (
      <>
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </>
    );
  };

  const getHoverAnimation = () => {
    const intensity = {
      low: {
        scale: 1.02,
        y: -2,
        shadow: "0 5px 15px rgba(139, 92, 246, 0.15)",
        darkShadow: "0 5px 15px rgba(167, 139, 250, 0.2)",
      },
      medium: {
        scale: 1.05,
        y: -4,
        shadow: "0 8px 25px rgba(139, 92, 246, 0.25)",
        darkShadow: "0 8px 25px rgba(167, 139, 250, 0.3)",
      },
      high: {
        scale: 1.08,
        y: -6,
        shadow: "0 12px 35px rgba(139, 92, 246, 0.4)",
        darkShadow: "0 12px 35px rgba(167, 139, 250, 0.5)",
      },
    }[hoverIntensity];

    const baseHover = {
      scale: intensity.scale,
      y: variant !== "link" ? intensity.y : 0,
      filter: "brightness(1.05)",
    };

    // Add shadow only for primary and secondary variants
    if (["primary", "secondary"].includes(variant)) {
      baseHover.boxShadow = `var(--shadow, ${intensity.shadow})`;
    }

    return {
      initial: {
        "--shadow": intensity.shadow,
      },
      whileHover: {
        ...baseHover,
        "--shadow": intensity.darkShadow,
      },
      whileTap: {
        scale: 0.98,
        filter: "brightness(0.95)",
        y: variant !== "link" ? -1 : 0,
      },
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    };
  };

  const MotionWrapper = ({ children }) => (
    <motion.div
      className={`inline-block ${fullWidth ? "w-full" : ""} rounded-full overflow-hidden`}
      {...getHoverAnimation()}
    >
      {children}
    </motion.div>
  );

  if (disabled) {
    return <div className={buttonClasses}>{renderContent()}</div>;
  }

  if (href) {
    return (
      <MotionWrapper>
        <Link href={href} className={buttonClasses} {...props}>
          {renderContent()}
        </Link>
      </MotionWrapper>
    );
  }

  return (
    <MotionWrapper>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonClasses}
        {...props}
      >
        {renderContent()}
      </button>
    </MotionWrapper>
  );
};

export default Button;
