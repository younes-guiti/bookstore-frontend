
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuthContext } from "../context/AuthContext";
import { userService } from "../services/userService";
import { authService } from "../services/authService";
import {
  Sun, Moon, Bell, Lock, User, Globe, Shield,
  Eye, EyeOff, Save, CheckCircle, AlertCircle,
  Users, BookOpen, Package, ArrowRight, Trash2,
} from "lucide-react";

function Toggle({ checked, onChange }) {
  return (
    <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px", cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0 }} />
      <span style={{
        position: "absolute", inset: 0, borderRadius: "12px",
        background: checked ? "#2563eb" : "#d1d5db", transition: "all 0.3s ease",
      }}>
        <span style={{
          position: "absolute", top: "2px", left: checked ? "22px" : "2px",
          width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
          transition: "all 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }} />
      </span>
    </label>
  );
}

function Banner({ type, message }) {
  if (!message) return null;
  const isSuccess = type === "success";
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        padding: "12px 16px", borderRadius: "10px",
        background: isSuccess ? "#f0fdf4" : "#fef2f2",
        border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
        color: isSuccess ? "#166534" : "#991b1b",
        fontSize: "14px", marginBottom: "16px",
        display: "flex", alignItems: "center", gap: "8px",
      }}
    >
      {isSuccess ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      {message}
    </motion.div>
  );
}

function Settings() {
  const { user, updateUser } = useAuthContext();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [showPasswords, setShowPasswords] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState({ type: "", text: "" });

  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem("app_prefs");
    return saved ? JSON.parse(saved) : {
      theme: "light", animations: true,
      emailNotifications: true, pushNotifications: true,
    };
  });

  useEffect(() => {
    localStorage.setItem("app_prefs", JSON.stringify(prefs));
  }, [prefs]);

  const handlePrefToggle = (key) => setPrefs({ ...prefs, [key]: !prefs[key] });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ type: "", text: "" });
    try {
      const res = await userService.update(user.id, profile);
      updateUser?.(res.data.data);
      setProfileMsg({ type: "success", text: "Profil mis à jour avec succès." });
    } catch (err) {
      setProfileMsg({ type: "error", text: err.response?.data?.message || "Erreur lors de la mise à jour." });
    } finally {
      setProfileLoading(false);
      setTimeout(() => setProfileMsg({ type: "", text: "" }), 4000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdMsg({ type: "", text: "" });

    if (passwords.next !== passwords.confirm) {
      setPwdMsg({ type: "error", text: "Les nouveaux mots de passe ne correspondent pas." });
      return;
    }
    if (passwords.next.length < 6) {
      setPwdMsg({ type: "error", text: "Le mot de passe doit contenir au moins 6 caractères." });
      return;
    }

    setPwdLoading(true);
    try {
      await authService.changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });
      setPwdMsg({ type: "success", text: "Mot de passe changé avec succès." });
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (err) {
      setPwdMsg({ type: "error", text: err.response?.data?.message || "Erreur lors du changement." });
    } finally {
      setPwdLoading(false);
      setTimeout(() => setPwdMsg({ type: "", text: "" }), 4000);
    }
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            ⚙️ Paramètres
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280", margin: "4px 0 0 0" }}>
            {isAdmin ? "Gérez votre compte et le site" : "Gérez votre compte et vos préférences"}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card variant="default" padding="md">
              <SectionHeader icon={User} color="#2563eb" bg="#eff6ff" title="Profil" subtitle="Vos informations personnelles" />

              <AnimatePresence>
                <Banner type={profileMsg.type} message={profileMsg.text} />
              </AnimatePresence>

              <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Nom complet</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" isLoading={profileLoading} style={{ marginTop: "4px" }}>
                  <Save size={16} style={{ marginRight: "6px" }} />
                  Enregistrer
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card variant="default" padding="md">
              <SectionHeader icon={Lock} color="#ef4444" bg="#fee2e2" title="Mot de passe" subtitle="Modifiez votre mot de passe" />

              <AnimatePresence>
                <Banner type={pwdMsg.type} message={pwdMsg.text} />
              </AnimatePresence>

              <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Mot de passe actuel</label>
                  <Input
                    type={showPasswords ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Nouveau mot de passe</label>
                  <Input
                    type={showPasswords ? "text" : "password"}
                    value={passwords.next}
                    onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Confirmer le nouveau mot de passe</label>
                  <Input
                    type={showPasswords ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#6b7280", fontSize: "13px", cursor: "pointer", padding: 0 }}
                >
                  {showPasswords ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPasswords ? "Masquer" : "Afficher"} les mots de passe
                </button>

                <Button type="submit" variant="primary" isLoading={pwdLoading} style={{ marginTop: "4px" }}>
                  <Save size={16} style={{ marginRight: "6px" }} />
                  Changer le mot de passe
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="default" padding="md">
              <SectionHeader icon={Sun} color="#f59e0b" bg="#fef3c7" title="Apparence" subtitle="Personnalisez l'affichage" />

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Row>
                  <span style={rowLabel}>
                    {prefs.theme === "light" ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#6b7280" />}
                    Thème {prefs.theme === "light" ? "clair" : "sombre"}
                  </span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {["light", "dark"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setPrefs({ ...prefs, theme: t })}
                        style={{
                          padding: "4px 12px", borderRadius: "6px",
                          border: prefs.theme === t ? "2px solid #2563eb" : "1px solid #e5e7eb",
                          background: prefs.theme === t ? "#eff6ff" : "#fff",
                          color: prefs.theme === t ? "#2563eb" : "#374151",
                          fontSize: "12px", fontWeight: "500", cursor: "pointer",
                        }}
                      >
                        {t === "light" ? "Clair" : "Sombre"}
                      </button>
                    ))}
                  </div>
                </Row>
                <Row>
                  <span style={rowLabel}>Animations</span>
                  <Toggle checked={prefs.animations} onChange={() => handlePrefToggle("animations")} />
                </Row>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card variant="default" padding="md">
              <SectionHeader icon={Bell} color="#8b5cf6" bg="#ede9fe" title="Notifications" subtitle="Gérez vos préférences" />

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Row>
                  <span style={rowLabel}>Notifications par email</span>
                  <Toggle checked={prefs.emailNotifications} onChange={() => handlePrefToggle("emailNotifications")} />
                </Row>
                <Row>
                  <span style={rowLabel}>Notifications push</span>
                  <Toggle checked={prefs.pushNotifications} onChange={() => handlePrefToggle("pushNotifications")} />
                </Row>
              </div>
            </Card>
          </motion.div>

          {isAdmin && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card variant="gradient" padding="md">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Shield size={20} color="#fff" />
                  <div>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#fff" }}>
                      Administration
                    </h3>
                    <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                      Accès rapide à la gestion du site
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <AdminLink icon={Users} label="Gérer les utilisateurs" onClick={() => navigate("/users")} />
                  <AdminLink icon={BookOpen} label="Gérer les livres" onClick={() => navigate("/books")} />
                  <AdminLink icon={Package} label="Voir les commandes" onClick={() => navigate("/orders")} />
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ marginTop: "20px" }}>
          <Card variant="default" padding="md">
            <SectionHeader icon={Trash2} color="#ef4444" bg="#fef2f2" title="Zone de danger" subtitle="Actions irréversibles" titleColor="#ef4444" />
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 16px", borderRadius: "8px", background: "#fef2f2",
              border: "1px solid #fecaca", flexWrap: "wrap", gap: "8px",
            }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500", color: "#991b1b" }}>Supprimer mon compte</div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>Cette action est irréversible</div>
              </div>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
                    console.log("Suppression du compte à implémenter");
                  }
                }}
              >
                <Trash2 size={16} style={{ marginRight: "4px" }} />
                Supprimer
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}

function SectionHeader({ icon: Icon, color, bg, title, subtitle, titleColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: titleColor || "#1f2937" }}>{title}</h3>
        <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#6b7280" }}>{subtitle}</p>
      </div>
    </div>
  );
}

function Row({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderRadius: "8px", background: "#f9fafb" }}>
      {children}
    </div>
  );
}

function AdminLink({ icon: Icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px", borderRadius: "10px", border: "none",
        background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer",
        fontSize: "14px", fontWeight: "500", width: "100%",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Icon size={16} />
        {label}
      </span>
      <ArrowRight size={14} />
    </motion.button>
  );
}

const labelStyle = { display: "block", fontSize: "13px", color: "#6b7280", marginBottom: "4px" };
const rowLabel = { fontSize: "14px", color: "#374151", display: "flex", alignItems: "center", gap: "8px" };

export default Settings;