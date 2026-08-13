

import { motion, AnimatePresence } from "framer-motion";

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
}) {
 
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "24px",
        padding: "12px 16px",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        flexWrap: "wrap",
      }}
    >
    
      <motion.button
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        onClick={onPrevious}
        disabled={currentPage === 1}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          background: currentPage === 1 ? "#f3f4f6" : "#ffffff",
          color: currentPage === 1 ? "#9ca3af" : "#374151",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s ease",
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.borderColor = "#d1d5db";
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }
        }}
      >
        <span style={{ fontSize: "16px" }}>‹</span>
        Précédent
      </motion.button>

      
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "0 8px",
        }}
      >
        <AnimatePresence>
          {getPageNumbers().map((page, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => {
                if (page !== "..." && onPageChange) {
                  onPageChange(page);
                }
              }}
              disabled={page === "..." || page === currentPage}
              style={{
                minWidth: "36px",
                height: "36px",
                padding: "0 8px",
                borderRadius: "8px",
                border: page === currentPage ? "2px solid #2563eb" : "1px solid transparent",
                background: page === currentPage ? "#2563eb" : "transparent",
                color: page === currentPage ? "#ffffff" : page === "..." ? "#9ca3af" : "#374151",
                cursor: page === "..." || page === currentPage ? "default" : "pointer",
                fontSize: "14px",
                fontWeight: page === currentPage ? "700" : "500",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (page !== "..." && page !== currentPage) {
                  e.currentTarget.style.background = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }
              }}
              onMouseLeave={(e) => {
                if (page !== "..." && page !== currentPage) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "transparent";
                }
              }}
            >
              {page}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      
      <motion.button
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        onClick={onNext}
        disabled={currentPage === totalPages}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          background: currentPage === totalPages ? "#f3f4f6" : "#ffffff",
          color: currentPage === totalPages ? "#9ca3af" : "#374151",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "all 0.2s ease",
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.background = "#f3f4f6";
            e.currentTarget.style.borderColor = "#d1d5db";
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }
        }}
      >
        Suivant
        <span style={{ fontSize: "16px" }}>›</span>
      </motion.button>
    </motion.div>
  );
}

export default Pagination;