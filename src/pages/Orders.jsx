import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import { orderService } from "../services/orderService";
import { useAuthContext } from "../context/AuthContext";
import { Package, User, CheckCircle } from "lucide-react";

const statusLabels = {
  pending: { label: "En attente", color: "#f59e0b", bg: "#fef3c7" },
  confirmed: { label: "Confirmée", color: "#2563eb", bg: "#dbeafe" },
  shipped: { label: "Expédiée", color: "#8b5cf6", bg: "#ede9fe" },
  delivered: { label: "Livrée", color: "#22c55e", bg: "#dcfce7" },
  cancelled: { label: "Annulée", color: "#ef4444", bg: "#fee2e2" },
};

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

function Orders() {
  const { user } = useAuthContext();
  const isAdmin = user?.role === "admin";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null); 
  const [justUpdated, setJustUpdated] = useState(null); 

  useEffect(() => {
    loadOrders();
  }, [isAdmin]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      
      const res = isAdmin ? await orderService.getAll() : await orderService.getMyOrders();
      setOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await orderService.updateStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      setJustUpdated(orderId);
      setTimeout(() => setJustUpdated(null), 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la mise à jour du statut");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <MainLayout><Loader fullScreen text="Chargement des commandes..." /></MainLayout>;
  }

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            📦 {isAdmin ? "Toutes les commandes" : "Mes commandes"}
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280", margin: "4px 0 0 0" }}>
            {isAdmin ? "Gérez et traitez les commandes des clients" : "Suivez l'état de vos commandes"}
          </p>
        </div>

        {orders.length === 0 ? (
          <Card padding="md">
            <p style={{ textAlign: "center", color: "#6b7280" }}>
              {isAdmin ? "Aucune commande pour le moment." : "Aucune commande pour le moment."}
            </p>
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {orders.map((order, index) => {
              const status = statusLabels[order.status] || statusLabels.pending;
              const isUpdating = updatingId === order.id;
              const wasJustUpdated = justUpdated === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Card variant="default" padding="md">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <Package size={20} color="#2563eb" />
                          <span style={{ fontWeight: "600" }}>Commande #{order.id}</span>
                          <span style={{ fontSize: "13px", color: "#6b7280" }}>
                            {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                     
                        {isAdmin && order.user && (
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6b7280", marginLeft: "30px" }}>
                            <User size={13} />
                            {order.user.name} — {order.user.email}
                          </div>
                        )}
                      </div>

                      
                      {isAdmin ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <AnimatePresence>
                            {wasJustUpdated && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <CheckCircle size={16} color="#22c55e" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <select
                            value={order.status}
                            disabled={isUpdating}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            style={{
                              padding: "6px 12px", borderRadius: "20px", border: `1px solid ${status.color}40`,
                              background: status.bg, color: status.color, fontSize: "12px", fontWeight: "600",
                              cursor: isUpdating ? "wait" : "pointer", outline: "none",
                              opacity: isUpdating ? 0.6 : 1,
                            }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>{statusLabels[s].label}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "500", background: status.bg, color: status.color }}>
                          {status.label}
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                      {order.items?.map((item) => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#374151" }}>
                          <span>{item.book?.title} × {item.quantity}</span>
                          <span>{(item.priceAtPurchase * item.quantity).toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: "right", fontWeight: "700", color: "#1f2937", paddingTop: "8px", borderTop: "1px solid #e5e7eb" }}>
                      Total : {parseFloat(order.totalAmount).toFixed(2)} €
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
}

export default Orders;