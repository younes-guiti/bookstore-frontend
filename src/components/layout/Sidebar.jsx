
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  User, 
  Settings,
  LogOut,
  Home
} from "lucide-react";

function Sidebar() {
    
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
const { totalItems } = useCartContext();
  
  const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#60a5fa" },
  { to: "/books", label: "Books", icon: BookOpen, color: "#34d399" },
  { to: "/cart", label: "Panier", icon: ShoppingCart, color: "#f59e0b" },
  { to: "/orders", label: "Mes commandes", icon: BookOpen, color: "#a78bfa" },
  { to: "/users", label: "Users", icon: Users, color: "#a78bfa" },
  { to: "/profile", label: "Profile", icon: User, color: "#f472b6" },
  { to: "/settings", label: "Settings", icon: Settings, color: "#9ca3af" },
];

 
  const isActive = (path) => location.pathname === path;

  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      style={{
        width: "260px",
        minHeight: "100vh",
        backgroundColor: "#1f2937",
        color: "#fff",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
        zIndex: 50,
      }}
    >
     
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            }}
          >
            🚀
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Book Store
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#6b7280",
              }}
            >
              v2.0.0
            </p>
          </div>
        </motion.div>
      </div>

      
      <ul
        style={{
          listStyle: "none",
          padding: "12px 12px",
          margin: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {navLinks.map((link, index) => (
          <motion.li
            key={link.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            style={{
              marginBottom: "0",
              listStyle: "none",
            }}
          >
            <Link
              to={link.to}
              style={{
                color: isActive(link.to) ? "#fff" : "#9ca3af",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "14px",
                fontWeight: isActive(link.to) ? "600" : "500",
                transition: "all 0.2s ease",
                background: isActive(link.to) 
                  ? "rgba(255,255,255,0.08)" 
                  : "transparent",
                border: isActive(link.to) 
                  ? "1px solid rgba(255,255,255,0.06)" 
                  : "1px solid transparent",
                position: "relative",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.to)) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#9ca3af";
                }
              }}
            >
             
              <link.icon
                size={20}
                style={{
                  color: isActive(link.to) ? link.color : "#6b7280",
                  flexShrink: 0,
                  transition: "color 0.2s ease",
                }}
              />
              
              <span style={{ flex: 1 }}>{link.label}</span>

             
              {isActive(link.to) && (
                <motion.span
                  layoutId="active-sidebar"
                  style={{
                    position: "absolute",
                    right: "8px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: link.color,
                    boxShadow: `0 0 12px ${link.color}66`,
                  }}
                />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>

     
      <div
        style={{
          padding: "16px 12px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          marginTop: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.04)",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "700",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#fff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.name || "Utilisateur"}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  color: "#6b7280",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.email || ""}
              </p>
            </div>
          </div>

          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              background: "rgba(239, 68, 68, 0.06)",
              color: "#f87171",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.06)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
            }}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            <span>Déconnexion</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.aside>
  );
}

export default Sidebar;