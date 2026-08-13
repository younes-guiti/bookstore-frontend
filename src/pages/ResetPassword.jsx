import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { authService } from "../services/authService";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!password || password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Lien invalide ou expiré");
    } finally {
      setLoading(false);
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
        {!success ? (
          <>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", margin: "0 0 8px 0" }}>
              Nouveau mot de passe
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px 0" }}>
              Choisissez un nouveau mot de passe pour votre compte.
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
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Nouveau mot de passe"
              icon={Lock}
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirmer le mot de passe"
              icon={Lock}
              disabled={loading}
            />

            <Button
              onClick={handleSubmit}
              isLoading={loading}
              disabled={loading}
              fullWidth
              size="lg"
              variant="primary"
            >
              {loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
            </Button>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937", margin: "0 0 8px 0" }}>
              Mot de passe réinitialisé !
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Redirection vers la page de connexion...
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ResetPassword;