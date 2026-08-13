import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ShoppingCart, UserPlus, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../services/orderService";
import { userService } from "../../services/userService";
import { bookService } from "../../services/bookService";


const POLL_INTERVAL = 30000;

const LAST_SEEN_KEY = "notifications_last_seen";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, POLL_INTERVAL);
    return () => clearInterval(interval); 
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    try {
      const [ordersRes, usersRes, booksRes] = await Promise.all([
        orderService.getAll(),
        userService.getAll(),
        bookService.getAll(),
      ]);
      const orders = ordersRes.data.data || [];
      const users = usersRes.data.data || [];
      const books = booksRes.data.data || [];

      const orderNotifs = orders
        .filter((o) => o.status === "pending")
        .map((o) => ({
          id: `order-${o.id}`,
          type: "order",
          text: `Nouvelle commande #${o.id}`,
          time: o.createdAt,
          link: "/orders",
        }));

      const userNotifs = users.slice(-5).map((u) => ({
        id: `user-${u.id}`,
        type: "user",
        text: `${u.name} s'est inscrit`,
        time: u.createdAt,
        link: "/users",
      }));

    
      const bookNotifs = [...books]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map((b) => ({
          id: `book-new-${b.id}`,
          type: "book",
          text: `Nouveau livre : ${b.title}`,
          time: b.createdAt,
          link: "/books",
        }));

      
      const borrowedNotifs = books
        .filter((b) => b.status === "borrowed")
        .slice(0, 5)
        .map((b) => ({
          id: `book-borrowed-${b.id}`,
          type: "borrowed",
          text: `"${b.title}" est emprunté`,
          time: b.updatedAt || b.createdAt,
          link: "/books",
        }));

      const all = [...orderNotifs, ...userNotifs, ...bookNotifs, ...borrowedNotifs]
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 10);

      setNotifications(all);
    } catch (err) {
      console.error("Erreur notifications:", err);
    }
  };

 
  const lastSeen = localStorage.getItem(LAST_SEEN_KEY);
  const unreadCount = notifications.filter(
    (n) => !lastSeen || new Date(n.time) > new Date(lastSeen)
  ).length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
    }
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        style={{
          position: "relative", background: "transparent", border: "none",
          cursor: "pointer", padding: "8px", display: "flex", alignItems: "center",
        }}
      >
        <Bell size={22} color="#fff" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: "absolute", top: "2px", right: "2px",
              background: "#ef4444", color: "#fff", borderRadius: "999px",
              fontSize: "10px", fontWeight: "700", minWidth: "16px", height: "16px",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute", top: "44px", right: 0, width: "320px",
              background: "#fff", borderRadius: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)", zIndex: 1000,
              overflow: "hidden", border: "1px solid #f3f4f6",
            }}
          >
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6", fontWeight: "600", fontSize: "14px", color: "#1f2937" }}>
              Notifications
            </div>
            <div style={{ maxHeight: "360px", overflowY: "auto" }}>
              {notifications.length === 0 ? (
                <p style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                  Aucune notification
                </p>
              ) : (
                notifications.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => { navigate(n.link); setIsOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #f9fafb",
                    }}
                    whileHover={{ background: "#f9fafb" }}
                  >
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background:
                        n.type === "order" ? "#dbeafe" :
                        n.type === "user" ? "#dcfce7" :
                        n.type === "book" ? "#fef3c7" : "#fee2e2",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {n.type === "order" && <ShoppingCart size={15} color="#2563eb" />}
                      {n.type === "user" && <UserPlus size={15} color="#16a34a" />}
                      {n.type === "book" && <BookOpen size={15} color="#d97706" />}
                      {n.type === "borrowed" && <BookOpen size={15} color="#dc2626" />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: "13px", color: "#1f2937", fontWeight: "500" }}>{n.text}</p>
                      <p style={{ margin: 0, fontSize: "11px", color: "#9ca3af" }}>
                        {new Date(n.time).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationBell;
