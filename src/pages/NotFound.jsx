

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import Button from "../components/common/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #fce7f3 100%)",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.08)",
            filter: "blur(80px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(124, 58, 237, 0.08)",
            filter: "blur(80px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "24px",
          padding: "48px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
          border: "1px solid rgba(255,255,255,0.2)",
          position: "relative",
          zIndex: 1,
        }}
      >
       
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.1, 
            type: "spring", 
            damping: 15,
            stiffness: 200,
          }}
          style={{
            fontSize: "80px",
            marginBottom: "16px",
            display: "inline-block",
          }}
        >
          🔍
        </motion.div>

      
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          style={{
            fontSize: "72px",
            fontWeight: "800",
            margin: "0",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          404
        </motion.h1>

       
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1f2937",
            margin: "12px 0 8px 0",
          }}
        >
          Page non trouvée
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{
            fontSize: "16px",
            color: "#6b7280",
            margin: "0 0 28px 0",
            lineHeight: 1.6,
          }}
        >
          Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
        </motion.p>

       
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
         
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate(-1)}
            style={{
              maxWidth: "300px",
            }}
          >
            <ArrowLeft size={18} style={{ marginRight: "8px" }} />
            Retourner en arrière
          </Button>

         
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate("/")}
            style={{
              maxWidth: "300px",
            }}
          >
            <Home size={18} style={{ marginRight: "8px" }} />
            Accueil
          </Button>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            marginTop: "24px",
            padding: "16px",
            borderRadius: "12px",
            background: "#f3f4f6",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#6b7280",
              margin: "0 0 8px 0",
              fontWeight: "500",
            }}
          >
            💡 Suggestions :
          </p>
          <ul
            style={{
              margin: 0,
              padding: "0 0 0 20px",
              fontSize: "13px",
              color: "#6b7280",
              listStyle: "none",
            }}
          >
            <li style={{ marginBottom: "4px" }}>
              • Vérifiez l'URL dans la barre d'adresse
            </li>
            <li style={{ marginBottom: "4px" }}>
              • Retournez à la page d'accueil
            </li>
            <li>
              • Utilisez le menu de navigation
            </li>
          </ul>
        </motion.div>
      </motion.div>

      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

export default NotFound;