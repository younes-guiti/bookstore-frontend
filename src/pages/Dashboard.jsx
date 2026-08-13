
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import { bookService } from "../services/bookService";
import { userService } from "../services/userService";
import { orderService } from "../services/orderService";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import {
  Users, BookOpen, Activity, ShoppingCart, Package,
  ArrowRight, Sparkles, TrendingUp,
} from "lucide-react";

function timeAgo(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "à l'instant";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days}j`;
}

const statusLabels = {
  pending: { label: "En attente", color: "#f59e0b", bg: "#fef3c7" },
  confirmed: { label: "Confirmée", color: "#2563eb", bg: "#dbeafe" },
  shipped: { label: "Expédiée", color: "#8b5cf6", bg: "#ede9fe" },
  delivered: { label: "Livrée", color: "#22c55e", bg: "#dcfce7" },
  cancelled: { label: "Annulée", color: "#ef4444", bg: "#fee2e2" },
};

function Dashboard() {
  const { user } = useAuthContext();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  if (isAdmin) return <AdminDashboard />;
  return <UserDashboard user={user} navigate={navigate} />;
}


function AdminDashboard() {
  const [stats, setStats] = useState([
    { title: "Utilisateurs", value: "...", icon: Users, color: "blue" },
    { title: "Livres", value: "...", icon: BookOpen, color: "green" },
  ]);
  const [activities, setActivities] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [signupTrend, setSignupTrend] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoadingStats(true);
      const [booksRes, usersRes, ordersRes] = await Promise.all([
        bookService.getAll(),
        userService.getAll(),
        orderService.getAll(),
      ]);
      const books = booksRes.data.data || [];
      const users = usersRes.data.data || [];
      const orders = ordersRes.data.data || [];

      setStats([
        { title: "Utilisateurs", value: users.length.toString(), icon: Users, color: "blue" },
        { title: "Livres", value: books.length.toString(), icon: BookOpen, color: "green" },
      ]);

      const statusCounts = {};
      orders.forEach((o) => {
        statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
      });
      const pieData = Object.entries(statusCounts).map(([status, count]) => ({
        name: statusLabels[status]?.label || status,
        value: count,
        color: statusLabels[status]?.color || "#9ca3af",
      }));
      setOrderStatusData(pieData);

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split("T")[0];
      });
      const trend = last7Days.map((day) => {
        const count = users.filter((u) => u.createdAt?.startsWith(day)).length;
        return {
          day: new Date(day).toLocaleDateString("fr-FR", { weekday: "short" }),
          inscriptions: count,
        };
      });
      setSignupTrend(trend);

      const bookActivities = books.map((book) => ({
        id: `book-${book.id}`, text: "a ajouté le livre", target: book.title,
        time: book.createdAt, icon: "📚", color: "#2563eb",
      }));
      const userActivities = users.map((u) => ({
        id: `user-${u.id}`, text: `${u.name} s'est inscrit`, target: "Nouvel utilisateur",
        time: u.createdAt, icon: "👤", color: "#22c55e",
      }));

      setActivities(
        [...bookActivities, ...userActivities]
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(0, 5)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            📊 Tableau de bord
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280", margin: "4px 0 0 0" }}>
            Vue d'ensemble de l'activité
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {stats.map((stat, index) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
              <StatCard title={stat.title} value={loadingStats ? "..." : stat.value} icon={stat.icon} color={stat.color} />
            </motion.div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginBottom: "24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="default" padding="md">
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", margin: "0 0 16px 0" }}>
                Commandes par statut
              </h3>
              {orderStatusData.length === 0 ? (
                <p style={{ color: "#9ca3af", fontSize: "14px", textAlign: "center", padding: "40px 0" }}>
                  Aucune commande pour le moment
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                    >
                      {orderStatusData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginTop: "8px" }}>
                {orderStatusData.map((entry) => (
                  <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#6b7280" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: entry.color }} />
                    {entry.name} ({entry.value})
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card variant="default" padding="md">
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", margin: "0 0 16px 0" }}>
                Inscriptions (7 derniers jours)
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={signupTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="inscriptions"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: "#2563eb", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card variant="default" padding="md">
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={20} color="#8b5cf6" />
              Activités récentes
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {activities.length === 0 ? (
                <p style={{ color: "#9ca3af", fontSize: "14px" }}>Aucune activité pour le moment</p>
              ) : (
                activities.map((activity) => (
                  <div key={activity.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "10px", background: "#f9fafb", borderLeft: `3px solid ${activity.color}` }}>
                    <div style={{ fontSize: "20px" }}>{activity.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: "13px", color: "#1f2937" }}>
                        {activity.text} <span style={{ color: "#2563eb", fontWeight: "500" }}>{activity.target}</span>
                      </p>
                      <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#6b7280" }}>{timeAgo(activity.time)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}


function UserDashboard({ user, navigate }) {
  const { items, totalItems, totalPrice } = useCartContext();
  const [recentOrders, setRecentOrders] = useState([]);
  const [bookCount, setBookCount] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersRes, booksRes] = await Promise.all([
        orderService.getMyOrders(),
        bookService.getAll(),
      ]);
      const orders = ordersRes.data.data || [];
      const books = booksRes.data.data || [];

      setRecentOrders(orders.slice(0, 3));
      setBookCount(books.length);
      if (books.length > 0) {
        setSuggestion(books[Math.floor(Math.random() * books.length)]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", top: "-40px", right: "-40px", opacity: 0.15 }}
          >
            <Sparkles size={160} />
          </motion.div>
          <h1 style={{ fontSize: "26px", fontWeight: "700", margin: 0, position: "relative" }}>
            {greeting}, {user?.name?.split(" ")[0] || "vous"} 👋
          </h1>
          <p style={{ fontSize: "14px", opacity: 0.9, margin: "6px 0 0 0", position: "relative" }}>
            Ravi de vous revoir sur React Starter
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card variant="default" padding="md">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <ShoppingCart size={18} color="#f59e0b" />
                    <span style={{ fontSize: "13px", color: "#6b7280" }}>Mon panier</span>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>
                    {totalItems} article{totalItems > 1 ? "s" : ""}
                  </div>
                  <div style={{ fontSize: "13px", color: "#22c55e", fontWeight: "600" }}>
                    {totalPrice.toFixed(2)} €
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button size="sm" variant="outline" onClick={() => navigate("/cart")}>
                    Voir <ArrowRight size={14} style={{ marginLeft: "4px" }} />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="default" padding="md">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <BookOpen size={18} color="#2563eb" />
                    <span style={{ fontSize: "13px", color: "#6b7280" }}>Catalogue</span>
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>
                    {loading ? "..." : bookCount} livres
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>disponibles</div>
                </div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button size="sm" variant="outline" onClick={() => navigate("/books")}>
                    Parcourir <ArrowRight size={14} style={{ marginLeft: "4px" }} />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card variant="default" padding="md">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#1f2937", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Package size={18} color="#8b5cf6" />
                  Mes dernières commandes
                </h3>
                {recentOrders.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={() => navigate("/orders")}>
                    Tout voir <ArrowRight size={14} style={{ marginLeft: "4px" }} />
                  </Button>
                )}
              </div>

              {loading ? (
                <p style={{ color: "#9ca3af", fontSize: "14px" }}>Chargement...</p>
              ) : recentOrders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "12px" }}>
                    Aucune commande pour l'instant
                  </p>
                  <Button size="sm" variant="primary" onClick={() => navigate("/books")}>
                    Découvrir le catalogue
                  </Button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {recentOrders.map((order) => {
                    const status = statusLabels[order.status] || statusLabels.pending;
                    return (
                      <motion.div
                        key={order.id}
                        whileHover={{ scale: 1.01 }}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: "10px", background: "#f9fafb" }}
                      >
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "500", color: "#1f2937" }}>Commande #{order.id}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>{new Date(order.createdAt).toLocaleDateString("fr-FR")}</div>
                        </div>
                        <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "500", background: status.bg, color: status.color }}>
                          {status.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="gradient" padding="md">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <TrendingUp size={18} color="#fff" />
                <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#fff", margin: 0 }}>
                  Suggestion pour vous
                </h3>
              </div>

              {loading ? (
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Chargement...</p>
              ) : suggestion ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>
                    {suggestion.title}
                  </div>
                  <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginBottom: "16px" }}>
                    par {suggestion.author} · {suggestion.year}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>
                      {parseFloat(suggestion.price || 0).toFixed(2)} €
                    </span>
                    <Button size="sm" variant="outline" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.3)" }} onClick={() => navigate("/books")}>
                      Voir le catalogue
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>Aucun livre disponible</p>
              )}
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}

export default Dashboard;