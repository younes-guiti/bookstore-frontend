import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { authService } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setError("Email invalide");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      
      setError("Une erreur est survenue. Réessayez.");
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
        <Link
          to="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#6b7280",
            textDecoration: "none",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          <ArrowLeft size={16} />
          Retour à la connexion
        </Link>

        {!sent ? (
          <>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", margin: "0 0 8px 0" }}>
              Mot de passe oublié
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 24px 0" }}>
              Entrez votre email, nous vous enverrons un lien de réinitialisation.
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              icon={Mail}
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
              {loading ? "Envoi en cours..." : "Envoyer le lien"}
            </Button>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📧</div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937", margin: "0 0 8px 0" }}>
              Email envoyé !
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Si un compte existe avec cet email, un lien de réinitialisation vient d'être envoyé. Vérifiez votre boîte de réception (et vos spams).
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ForgotPassword;