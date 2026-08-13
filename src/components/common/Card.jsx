

import { motion } from 'framer-motion';

function Card({
  
  children,
  
  
  variant = "default",     
  padding = true,          
  hover = false,           
  className = "",
  style = {},
  onClick,
  ...props
}) {
 
  const variants = {
    default: {
      background: "#ffffff",
      border: "1px solid #f3f4f6",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    },
    glass: {
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    },
    bordered: {
      background: "#ffffff",
      border: "2px solid #e5e7eb",
      boxShadow: "none",
    },
    elevated: {
      background: "#ffffff",
      border: "none",
      boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
    },
    gradient: {
      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
      border: "none",
      boxShadow: "0 8px 32px rgba(37, 99, 235, 0.2)",
      color: "#ffffff",
    },
  };

  
  const paddings = {
    none: { padding: "0" },
    sm: { padding: "12px" },
    md: { padding: "20px" },
    lg: { padding: "28px" },
  };

  
  let paddingStyle = {};
  if (padding === true) paddingStyle = paddings.md;
  else if (padding === false) paddingStyle = paddings.none;
  else if (typeof padding === 'string' && paddings[padding]) {
    paddingStyle = paddings[padding];
  }

 
  const baseStyle = {
    borderRadius: "12px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    ...variants[variant] || variants.default,
    ...paddingStyle,
    ...style,
    cursor: onClick ? "pointer" : "default",
  };

  return (
    <motion.div
      className={className}
      style={baseStyle}
      onClick={onClick}
      
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut",
      }}
      
      whileHover={hover ? { 
        scale: 1.01,
        boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        y: -4,
        transition: { duration: 0.2 },
      } : {}}
      
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...props}
    >
      
      {variant === 'glass' && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            padding: "1px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
      )}

      
      {variant === 'gradient' && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            padding: "2px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        />
      )}

      {children}
    </motion.div>
  );
}

export default Card;