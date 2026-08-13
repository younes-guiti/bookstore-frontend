
import { motion, AnimatePresence } from "framer-motion";

function Table({ columns, data }) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        padding: "4px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0",
          minWidth: "600px",
        }}
      >
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                style={{
                  padding: "16px 20px",
                  textAlign: "left",
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#6b7280",
                  background: index === 0 ? "transparent" : "transparent",
                  borderBottom: "2px solid #e5e7eb",
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {column.title}
                  {column.sortable !== false && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#d1d5db",
                      }}
                    >
                      ↕
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {data.map((row, index) => (
              <motion.tr
                key={row.id || index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
                style={{
                  background: index % 2 === 0 ? "#ffffff" : "#fafbfc",
                  borderRadius: "8px",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "default",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#eff6ff";
                  e.currentTarget.style.transform = "scale(1.002)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(37, 99, 235, 0.08)";
                  e.currentTarget.style.borderRadius = "8px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = index % 2 === 0 ? "#ffffff" : "#fafbfc";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      padding: "14px 20px",
                      fontSize: "14px",
                      color: "#1f2937",
                      borderBottom: "1px solid #f3f4f6",
                      verticalAlign: "middle",
                      lineHeight: "1.5",
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.04 + 0.1 }}
                      style={{
                        display: "inline-block",
                      }}
                    >
                     {column.render ? column.render(row) : row[column.key]}
                    </motion.span>
                  </td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default Table;