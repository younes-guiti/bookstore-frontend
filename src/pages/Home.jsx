// pages/Home.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { bookService } from "../services/bookService";
import { useAuthContext } from "../context/AuthContext";
import {
  BookOpen, ShoppingCart, Package, Users, ArrowRight,
  Sparkles, Search, LogIn, UserPlus,
} from "lucide-react";

function Home() {
  const { user, isAuthenticated } = useAuthContext();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      const res = await bookService.getAll();
      const books = res.data.data || [];
    
      const sorted = [...books]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
      setFeaturedBooks(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBooks(false);
    }
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

        {!isAuthenticated && <GuestHero navigate={navigate} />}
        {isAuthenticated && !isAdmin && <UserHero user={user} navigate={navigate} />}
        {isAuthenticated && isAdmin && <AdminHero user={user} navigate={navigate} />}

        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={20} color="#f59e0b" />
              Nouveautés
            </h3>
            <Button size="sm" variant="ghost" onClick={() => navigate("/books")}>
              Voir tout le catalogue <ArrowRight size={14} style={{ marginLeft: "4px" }} />
            </Button>
          </div>

          {loadingBooks ? (
            <Loader text="Chargement des livres..." />
          ) : featuredBooks.length === 0 ? (
            <Card variant="default" padding="md">
              <p style={{ color: "#9ca3af", fontSize: "14px", textAlign: "center", margin: 0 }}>
                Aucun livre disponible pour le moment
              </p>
            </Card>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card variant="default" padding="none">
                    <div
                      onClick={() => navigate("/books")}
                      style={{ cursor: "pointer" }}
                    >
                      <div style={{
                        height: "160px", borderRadius: "12px 12px 0 0",
                        background: book.coverImage
                          ? `url(${book.coverImage}) center/cover`
                          : "linear-gradient(135deg, #2563eb, #7c3aed)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {!book.coverImage && <BookOpen size={40} color="#fff" style={{ opacity: 0.7 }} />}
                      </div>
                      <div style={{ padding: "14px" }}>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {book.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
                          {book.author}
                        </div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#2563eb" }}>
                          {parseFloat(book.price || 0).toFixed(2)} €
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}


function GuestHero({ navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        borderRadius: "20px", padding: "48px 32px", color: "#fff",
        position: "relative", overflow: "hidden", textAlign: "center",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: "-60px", right: "-60px", opacity: 0.12 }}
      >
        <BookOpen size={220} />
      </motion.div>

      <h1 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 12px 0", position: "relative" }}>
        📚 Bienvenue sur votre bibliothèque en ligne
      </h1>
      <p style={{ fontSize: "16px", opacity: 0.9, maxWidth: "520px", margin: "0 auto 28px auto", position: "relative" }}>
        Découvrez des centaines de livres, empruntez ou achetez vos prochaines lectures en quelques clics.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
        <Button variant="outline" style={{ background: "#fff", color: "#2563eb", borderColor: "#fff" }} onClick={() => navigate("/register")}>
          <UserPlus size={16} style={{ marginRight: "6px" }} />
          Créer un compte
        </Button>
        <Button variant="outline" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.4)" }} onClick={() => navigate("/login")}>
          <LogIn size={16} style={{ marginRight: "6px" }} />
          Se connecter
        </Button>
        <Button variant="outline" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", borderColor: "rgba(255,255,255,0.4)" }} onClick={() => navigate("/books")}>
          <Search size={16} style={{ marginRight: "6px" }} />
          Parcourir sans compte
        </Button>
      </div>
    </motion.div>
  );
}


function UserHero({ user, navigate }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  const quickLinks = [
    { label: "Parcourir le catalogue", icon: BookOpen, to: "/books", color: "#2563eb" },
    { label: "Mon panier", icon: ShoppingCart, to: "/cart", color: "#f59e0b" },
    { label: "Mes commandes", icon: Package, to: "/orders", color: "#8b5cf6" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <div style={{
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        borderRadius: "20px", padding: "32px", color: "#fff",
        position: "relative", overflow: "hidden", marginBottom: "20px",
      }}>
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
          Prêt à découvrir votre prochaine lecture ?
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
        {quickLinks.map((link, i) => (
          <motion.div key={link.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }} whileHover={{ y: -3 }}>
            <Card variant="default" padding="md">
              <div onClick={() => navigate(link.to)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: link.color + "15", display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <link.icon size={20} color={link.color} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>{link.label}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}


function AdminHero({ user, navigate }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  const quickLinks = [
    { label: "Tableau de bord", icon: Sparkles, to: "/dashboard", color: "#2563eb" },
    { label: "Gérer les utilisateurs", icon: Users, to: "/users", color: "#16a34a" },
    { label: "Gérer les livres", icon: BookOpen, to: "/books", color: "#f59e0b" },
    { label: "Voir les commandes", icon: Package, to: "/orders", color: "#8b5cf6" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a, #6d28d9)",
        borderRadius: "20px", padding: "32px", color: "#fff",
        position: "relative", overflow: "hidden", marginBottom: "20px",
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", top: "-40px", right: "-40px", opacity: 0.15 }}
        >
          <Sparkles size={160} />
        </motion.div>
        <h1 style={{ fontSize: "26px", fontWeight: "700", margin: 0, position: "relative" }}>
          {greeting}, {user?.name?.split(" ")[0] || "Admin"} 🛠️
        </h1>
        <p style={{ fontSize: "14px", opacity: 0.9, margin: "6px 0 0 0", position: "relative" }}>
          Voici un accès rapide à la gestion du site
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
        {quickLinks.map((link, i) => (
          <motion.div key={link.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }} whileHover={{ y: -3 }}>
            <Card variant="default" padding="md">
              <div onClick={() => navigate(link.to)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: link.color + "15", display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <link.icon size={20} color={link.color} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937" }}>{link.label}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Home;