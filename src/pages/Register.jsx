
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { authService } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!name) {
      setError("Le nom est requis");
      return false;
    }
    if (!email || !email.includes("@")) {
      setError("Email invalide");
      return false;
    }
    if (!password || password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await authService.register({ name, email, password });
      const { token, user } = response.data.data;
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #fce7f3 100%)",
        padding: "16px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "40px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              boxShadow: "0 8px 24px rgba(37, 99, 235, 0.3)",
            }}
          >
            🚀
          </div>
        </div>

        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1f2937",
            textAlign: "center",
            margin: "0 0 8px 0",
          }}
        >
          Créer un compte
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#6b7280",
            textAlign: "center",
            margin: "0 0 28px 0",
          }}
        >
          Inscrivez-vous pour commencer
        </p>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              fontSize: "14px",
              marginBottom: "16px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <Input
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          label="Nom complet"
          icon={User}
          disabled={loading}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          label="Email"
          icon={Mail}
          disabled={loading}
        />

        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          label="Mot de passe"
          icon={Lock}
          disabled={loading}
        />

        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          label="Confirmer le mot de passe"
          icon={Lock}
          disabled={loading}
        />

        <div style={{ marginTop: "8px" }}>
          <Button
            onClick={handleRegister}
            isLoading={loading}
            disabled={loading}
            fullWidth
            size="lg"
            variant="primary"
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Déjà un compte ?{" "}
          <Link
            to="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Se connecter
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;