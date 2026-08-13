

import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Home, LayoutDashboard, User, LogIn } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import NotificationBell from "../ui/NotificationBell";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const isAdmin = user?.role === "admin";

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/login", label: "Login", icon: LogIn },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#2563eb",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(37, 99, 235, 0.3)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <motion.h2
        whileHover={{ scale: 1.05 }}
        style={{
          fontSize: "22px",
          fontWeight: "700",
          margin: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
<span style={{ 
          background: "rgba(255,255,255,0.15)", 
          padding: "6px 10px", 
          borderRadius: "8px",
          fontSize: "18px",
        }}>
          📚
        </span>
        Book Store
      </motion.h2>

     
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {isAdmin && <NotificationBell />}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "8px",
            fontSize: "24px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
          }}
          className="mobile-menu-button"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <motion.div
            key={link.to}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={link.to}
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "15px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                background: isActive(link.to) ? "rgba(255,255,255,0.15)" : "transparent",
                border: isActive(link.to) ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <link.icon size={18} />
              {link.label}
              {isActive(link.to) && (
                <motion.span
                  layoutId="active-nav"
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "20px",
                    height: "3px",
                    background: "#fff",
                    borderRadius: "2px",
                  }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#2563eb",
              padding: "16px 24px",
              display: "none",
              flexDirection: "column",
              gap: "8px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
            className="mobile-nav"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    transition: "background 0.2s ease",
                    background: isActive(link.to) ? "rgba(255,255,255,0.15)" : "transparent",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.to)) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}

export default Navbar;