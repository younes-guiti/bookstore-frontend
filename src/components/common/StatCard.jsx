

import { motion } from 'framer-motion';

function StatCard({
 
  title,
  value,
  
  
  icon: Icon,
  color = "blue",        
  trend = null,          
  trendLabel = "vs mois dernier",
  description = "",
  className = "",
  style = {},
  onClick,
}) {
  
  const colors = {
    blue: {
      bg: "linear-gradient(135deg, #eff6ff, #dbeafe)",
      icon: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      text: "#1e40af",
      ring: "rgba(37, 99, 235, 0.15)",
    },
    green: {
      bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
      icon: "linear-gradient(135deg, #22c55e, #16a34a)",
      text: "#166534",
      ring: "rgba(34, 197, 94, 0.15)",
    },
    purple: {
      bg: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
      icon: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
      text: "#5b21b6",
      ring: "rgba(139, 92, 246, 0.15)",
    },
    orange: {
      bg: "linear-gradient(135deg, #fff7ed, #ffedd5)",
      icon: "linear-gradient(135deg, #f59e0b, #d97706)",
      text: "#92400e",
      ring: "rgba(245, 158, 11, 0.15)",
    },
    red: {
      bg: "linear-gradient(135deg, #fef2f2, #fee2e2)",
      icon: "linear-gradient(135deg, #ef4444, #dc2626)",
      text: "#991b1b",
      ring: "rgba(239, 68, 68, 0.15)",
    },
    pink: {
      bg: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
      icon: "linear-gradient(135deg, #ec4899, #db2777)",
      text: "#831843",
      ring: "rgba(236, 72, 153, 0.15)",
    },
  };

  const colorStyle = colors[color] || colors.blue;

  
  const formatValue = (val) => {
    if (typeof val !== 'number') return val;
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k';
    return val;
  };

  return (
    <motion.div
      className={className}
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        border: "1px solid #f3f4f6",
        minWidth: "180px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: onClick ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
        y: -4,
        transition: { duration: 0.2 },
      }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
    >
     
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: "-30px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: colorStyle.bg,
          opacity: 0.5,
        }}
      />

     
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#6b7280",
            margin: 0,
            letterSpacing: "0.01em",
          }}
        >
          {title}
        </h3>

      
        {Icon && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: colorStyle.bg,
              boxShadow: `0 4px 12px ${colorStyle.ring}`,
              flexShrink: 0,
            }}
          >
            <Icon
              size={20}
              style={{
                background: colorStyle.icon,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            />
          </div>
        )}
      </div>

      
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          margin: "0 0 4px 0",
          color: "#111827",
          letterSpacing: "-0.02em",
          position: "relative",
          zIndex: 1,
        }}
      >
        {formatValue(value)}
      </h1>

   
      {description && (
        <p
          style={{
            fontSize: "13px",
            color: "#9ca3af",
            margin: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          {description}
        </p>
      )}

   
      {trend !== null && trend !== undefined && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "8px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              background: trend >= 0 ? "#dcfce7" : "#fee2e2",
              color: trend >= 0 ? "#166534" : "#991b1b",
            }}
          >
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#9ca3af",
            }}
          >
            {trendLabel}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default StatCard;