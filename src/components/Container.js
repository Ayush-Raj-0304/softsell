const Container = ({
  children,
  className = "",
  as: Component = "div",
  maxWidth = "7xl", // xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, full
  padding = true, // true, false, "x", "y"
  centered = true, // true or false
  ...props
}) => {
  // Max width classes
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  };
  
  // Padding classes
  const getPaddingClasses = () => {
    if (padding === true) return "px-4 sm:px-6 lg:px-8 py-6 sm:py-8";
    if (padding === "x") return "px-4 sm:px-6 lg:px-8";
    if (padding === "y") return "py-6 sm:py-8";
    return "";
  };
  
  // Final classes
  const containerClasses = `
    ${maxWidthClasses[maxWidth] || "max-w-7xl"}
    ${getPaddingClasses()}
    ${centered ? "mx-auto" : ""}
    ${className}
  `;
  
  return (
    <Component className={containerClasses} {...props}>
      {children}
    </Component>
  );
};

export default Container; 