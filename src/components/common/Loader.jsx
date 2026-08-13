

import { motion } from 'framer-motion';

function Loader({
  
  
  
  size = "md",           
  variant = "spinner",   
  text = "Chargement...",
  fullScreen = false,
  color = "#2563eb",
  className = "",
  style = {},
}) {
 
  const sizes = {
    sm: {
      spinner: { width: "24px", height: "24px", borderWidth: "3px" },
      dots: { width: "8px", height: "8px" },
      text: "14px",
    },
    md: {
      spinner: { width: "40px", height: "40px", borderWidth: "4px" },
      dots: { width: "12px", height: "12px" },
      text: "16px",
    },
    lg: {
      spinner: { width: "56px", height: "56px", borderWidth: "5px" },
      dots: { width: "16px", height: "16px" },
      text: "18px",
    },
  };

  
  const renderSpinner = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 0.8, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      style={{
        width: sizes[size].spinner.width,
        height: sizes[size].spinner.height,
        border: `${sizes[size].spinner.borderWidth} solid ${color}33`,
        borderTop: `${sizes[size].spinner.borderWidth} solid ${color}`,
        borderRadius: "50%",
        display: "inline-block",
        ...style,
      }}
      className={className}
    />
  );

  
  const renderDots = () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: i * 0.15,
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.6,
          }}
          style={{
            width: sizes[size].dots.width,
            height: sizes[size].dots.height,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );

 
  const renderPulse = () => (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: sizes[size].spinner.width,
        height: sizes[size].spinner.height,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: 0.6,
      }}
    />
  );

 
  const renderSkeleton = () => (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          height: "20px",
          background: `linear-gradient(90deg, ${color}22, ${color}44, ${color}22)`,
          backgroundSize: "200% 100%",
          borderRadius: "4px",
          marginBottom: "12px",
        }}
      />
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
        style={{
          height: "20px",
          width: "80%",
          background: `linear-gradient(90deg, ${color}22, ${color}44, ${color}22)`,
          backgroundSize: "200% 100%",
          borderRadius: "4px",
          marginBottom: "12px",
        }}
      />
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        style={{
          height: "20px",
          width: "60%",
          background: `linear-gradient(90deg, ${color}22, ${color}44, ${color}22)`,
          backgroundSize: "200% 100%",
          borderRadius: "4px",
        }}
      />
    </div>
  );

  
  const renderers = {
    spinner: renderSpinner,
    dots: renderDots,
    pulse: renderPulse,
    skeleton: renderSkeleton,
  };

  const LoaderContent = renderers[variant] || renderers.spinner;

  
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <LoaderContent />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: sizes[size].text,
            color: "#6b7280",
            margin: 0,
            fontWeight: "500",
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  
  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

export default Loader;