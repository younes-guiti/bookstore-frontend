import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useCartContext } from "../context/CartContext";
import { orderService } from "../services/orderService";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCartContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const orderItems = items.map((item) => ({ bookId: item.bookId, quantity: item.quantity }));
      const response = await orderService.create(orderItems);
      clearCart();
      navigate(`/orders`);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la commande");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <MainLayout>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <ShoppingBag size={48} color="#d1d5db" style={{ marginBottom: "16px" }} />
          <h2 style={{ color: "#1f2937" }}>Votre panier est vide</h2>
          <p style={{ color: "#6b7280", marginBottom: "20px" }}>
            Parcourez notre catalogue pour ajouter des livres.
          </p>
          <Button variant="primary" onClick={() => navigate("/books")}>
            Voir les livres
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", marginBottom: "24px" }}>
          🛒 Mon panier
        </h1>

        {error && (
          <div style={{ padding: "12px 16px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: "14px", marginBottom: "16px" }}>
            ⚠️ {error}
          </div>
        )}

        <Card variant="default" padding="md">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {items.map((item) => (
              <div
                key={item.bookId}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px", borderRadius: "10px", background: "#f9fafb", flexWrap: "wrap", gap: "12px",
                }}
              >
                <div style={{ flex: 1, minWidth: "180px" }}>
                  <div style={{ fontWeight: "600", color: "#1f2937" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>{item.author}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                    style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ minWidth: "24px", textAlign: "center", fontWeight: "500" }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                    style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div style={{ fontWeight: "700", color: "#1f2937", minWidth: "70px", textAlign: "right" }}>
                  {(item.price * item.quantity).toFixed(2)} €
                </div>

                <button
                  onClick={() => removeFromCart(item.bookId)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#1f2937" }}>
              Total : {totalPrice.toFixed(2)} €
            </span>
            <Button variant="primary" size="lg" onClick={handleCheckout} isLoading={loading}>
              {loading ? "Commande en cours..." : "Commander"}
            </Button>
          </div>
        </Card>
      </motion.div>
    </MainLayout>
  );
}

export default Cart;