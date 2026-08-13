

import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Camera,
  Edit,
  Save,
  X,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
function Profile() {
  
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
  name: user?.name || "",
  email: user?.email || "",
  phone: "",
  location: "",
  bio: "",
});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  
function getMembershipDuration(createdAt) {
  if (!createdAt) return "—";
  const created = new Date(createdAt);
  const now = new Date();
  const days = Math.floor((now - created) / (1000 * 60 * 60 * 24));

  if (days < 1) return "Aujourd'hui";
  if (days < 30) return `${days} jour${days > 1 ? "s" : ""}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mois`;
  const years = Math.floor(months / 12);
  return `${years} an${years > 1 ? "s" : ""}`;
}


const stats = [
  { title: "Membre depuis", value: getMembershipDuration(user?.createdAt), icon: Calendar, color: "#22c55e" },
];
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess("Profil mis à jour avec succès !");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Erreur", error);
    } finally {
      setLoading(false);
    }
  };

 
  const handleCancel = () => {
  setIsEditing(false);
  setFormData({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "",
  });
};

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
       
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#1f2937",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              👤 Mon profil
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "15px",
                color: "#6b7280",
                margin: "4px 0 0 0",
              }}
            >
              Gérez vos informations personnelles
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X size={16} style={{ marginRight: "4px" }} />
                  Annuler
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSave}
                  isLoading={loading}
                >
                  <Save size={16} style={{ marginRight: "4px" }} />
                  Sauvegarder
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="primary"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} style={{ marginRight: "4px" }} />
                Modifier
              </Button>
            )}
          </motion.div>
        </motion.div>

       
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#166534",
              fontSize: "14px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle size={18} />
            {success}
          </motion.div>
        )}

        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="gradient" padding="md">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
               
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    position: "relative",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                      color: "#fff",
                      boxShadow: "0 8px 32px rgba(37, 99, 235, 0.3)",
                      border: "4px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {formData.name.charAt(0)}
                  </div>
                  <button
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "4px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#ffffff",
                      color: "#374151",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f3f4f6";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    onClick={() => console.log("Changer avatar")}
                  >
                    <Camera size={16} />
                  </button>
                </motion.div>

                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#ffffff",
                    margin: "0 0 4px 0",
                  }}
                >
                  {formData.name}
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    margin: "0 0 16px 0",
                  }}
                >
                  {formData.email}
                </p>

               
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.15)",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "500",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <CheckCircle size={14} />
                  Membre vérifié
                </div>
              </div>
            </Card>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card variant="default" padding="md">
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 16px 0",
                }}
              >
                📊 Statistiques
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "12px",
                }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    style={{
                      padding: "14px",
                      borderRadius: "10px",
                      background: "#f9fafb",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f3f4f6";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f9fafb";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "4px",
                      }}
                    >
                      <stat.icon size={20} color={stat.color} />
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#1f2937",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      {stat.title}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{
            marginTop: "20px",
          }}
        >
          <Card variant="default" padding="md">
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                margin: "0 0 20px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <User size={20} color="#2563eb" />
              Informations personnelles
              {isEditing && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#2563eb",
                    fontWeight: "500",
                    marginLeft: "8px",
                    background: "#eff6ff",
                    padding: "2px 10px",
                    borderRadius: "12px",
                  }}
                >
                  Édition en cours
                </span>
              )}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "16px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  label="Nom complet"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={User}
                  disabled={!isEditing}
                  placeholder="Votre nom"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  disabled={!isEditing}
                  placeholder="votre@email.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Input
                  label="Téléphone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                  disabled={!isEditing}
                  placeholder="+33 6 12 34 56 78"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
              >
                <Input
                  label="Localisation"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  icon={MapPin}
                  disabled={!isEditing}
                  placeholder="Ville, Pays"
                />
              </motion.div>
            </div>

           
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                marginTop: "16px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Biographie
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Parlez-nous un peu de vous..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: isEditing ? "2px solid #2563eb" : "1px solid #e5e7eb",
                  fontSize: "14px",
                  color: "#1f2937",
                  background: isEditing ? "#ffffff" : "#f9fafb",
                  transition: "all 0.2s ease",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "80px",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "4px",
                  fontSize: "12px",
                  color: "#9ca3af",
                }}
              >
                {formData.bio.length} caractères
              </div>
            </motion.div>
          </Card>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          style={{
            marginTop: "20px",
          }}
        >
          <Card variant="default" padding="md">
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                margin: "0 0 16px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={20} color="#ef4444" />
              Sécurité
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "#f9fafb",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#1f2937",
                    }}
                  >
                    Mot de passe
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0 0",
                      fontSize: "13px",
                      color: "#6b7280",
                    }}
                  >
                    Modifier votre mot de passe
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => console.log("Changer mot de passe")}
                >
                  Changer
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "#f9fafb",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#1f2937",
                    }}
                  >
                    Authentification à deux facteurs
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0 0",
                      fontSize: "13px",
                      color: "#6b7280",
                    }}
                  >
                    Sécuriser votre compte
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => console.log("Activer 2FA")}
                >
                  Activer
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}

export default Profile;