

import { motion } from 'framer-motion';

function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  variant = "primary",        
  size = "md",               
  isLoading = false,         
  icon: Icon,               
  iconPosition = "left",    
  fullWidth = false,         
}) {
  
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      color: "#fff",
      boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
    },
    secondary: {
      background: "#f3f4f6",
      color: "#1f2937",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    danger: {
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      color: "#fff",
      boxShadow: "0 4px 14px rgba(239, 68, 68, 0.35)",
    },
    outline: {
      background: "transparent",
      color: "#2563eb",
      border: "2px solid #2563eb",
      boxShadow: "none",
    },
    ghost: {
      background: "transparent",
      color: "#6b7280",
      boxShadow: "none",
    },
  };

  
  const sizes = {
    sm: { padding: "6px 14px", fontSize: "13px", borderRadius: "6px" },
    md: { padding: "10px 20px", fontSize: "15px", borderRadius: "8px" },
    lg: { padding: "14px 28px", fontSize: "17px", borderRadius: "10px" },
  };

  
  const baseStyle = {
    padding: sizes[size].padding,
    fontSize: sizes[size].fontSize,
    borderRadius: sizes[size].borderRadius,
    border: variants[variant]?.border || "none",
    backgroundColor: variants[variant]?.background || "#2563eb",
    color: variants[variant]?.color || "#fff",
    boxShadow: variants[variant]?.boxShadow || "0 1px 3px rgba(0,0,0,0.1)",
    cursor: (disabled || isLoading) ? "not-allowed" : "pointer",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    width: fullWidth ? "100%" : "auto",
    opacity: (disabled || isLoading) ? 0.6 : 1,
    transform: "scale(1)",
    position: "relative",
    overflow: "hidden",
    ...(disabled || isLoading ? { pointerEvents: "none" } : {}),
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={className}
      style={baseStyle}
      
      whileHover={!disabled && !isLoading ? { 
        scale: 1.03,
        boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)",
        y: -2,
      } : {}}
      whileTap={!disabled && !isLoading ? { 
        scale: 0.95,
      } : {}}
      
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      
      {variant === "primary" && !disabled && !isLoading && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transform: "translateX(-100%)",
            transition: "transform 0.8s ease",
          }}
          className="shimmer-effect"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(-100%)";
          }}
        />
      )}

      
      {isLoading && (
        <span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>
          ⏳
        </span>
      )}

    
      {Icon && iconPosition === "left" && !isLoading && <Icon size={size === "sm" ? 14 : 18} />}
      
     
      <span>{children}</span>
      
     
      {Icon && iconPosition === "right" && !isLoading && <Icon size={size === "sm" ? 14 : 18} />}
    </motion.button>
  );
}


const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .shimmer-effect {
    pointer-events: none;
  }
`;
document.head.appendChild(styleSheet);

export default Button;