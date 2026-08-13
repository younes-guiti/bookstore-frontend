
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import SearchBar from "../components/ui/SearchBar";
import Table from "../components/ui/Table";
import Loader from "../components/common/Loader";
import { userService } from "../services/userService";
import { useAuthContext } from "../context/AuthContext";
import {
  Edit, Trash2, Eye, User, CheckCircle, XCircle, Clock,
} from "lucide-react";

function Users() {
  const { user: currentUser } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.getAll();
      setUsers(res.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userService.updateRole(userId, newRole);
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors du changement de rôle");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Supprimer "${name}" ?`)) return;
    try {
      await userService.delete(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    const colors = {
      admin: { bg: "#dbeafe", color: "#1e40af", label: "Admin" },
      user: { bg: "#dcfce7", color: "#166534", label: "Utilisateur" },
    };
    return colors[role] || colors.user;
  };

  const columns = [
    {
      key: "name",
      title: "Utilisateur",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: "12px", fontWeight: "600", flexShrink: 0,
          }}>
            {row.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: "500", color: "#1f2937" }}>{row.name}</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      title: "Rôle",
      render: (row) => {
        const role = getRoleColor(row.role);
        // ⚙️ Seul un admin peut changer le rôle des autres, via un select
        if (isAdmin && row.id !== currentUser.id) {
          return (
            <select
              value={row.role}
              onChange={(e) => handleRoleChange(row.id, e.target.value)}
              style={{
                padding: "4px 10px", borderRadius: "8px", border: "1px solid #e5e7eb",
                fontSize: "12px", cursor: "pointer",
              }}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          );
        }
        return (
          <span style={{
            padding: "4px 12px", borderRadius: "20px", fontSize: "12px",
            fontWeight: "500", background: role.bg, color: role.color,
          }}>
            {role.label}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      title: "Inscription",
      render: (row) => (
        <span style={{ color: "#6b7280" }}>
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString("fr-FR") : "-"}
        </span>
      ),
    },
    
    ...(isAdmin ? [{
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={() => { setSelectedUser(row); setShowModal(true); }}
            style={{ padding: "6px", border: "none", background: "transparent", color: "#6b7280", cursor: "pointer" }}>
            <Eye size={16} />
          </button>
          {row.id !== currentUser.id && (
            <button onClick={() => handleDelete(row.id, row.name)}
              style={{ padding: "6px", border: "none", background: "transparent", color: "#ef4444", cursor: "pointer" }}>
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ),
    }] : []),
  ];

  if (loading) {
    return <MainLayout><Loader fullScreen text="Chargement des utilisateurs..." /></MainLayout>;
  }

  if (error) {
    return (
      <MainLayout>
        <Card>
          <h3 style={{ color: "#ef4444" }}>❌ Erreur</h3>
          <p>{error}</p>
          <Button onClick={loadUsers}>Réessayer</Button>
        </Card>
      </MainLayout>
    );
  }

  const stats = [
    { title: "Total utilisateurs", value: users.length, icon: User, color: "#2563eb" },
    { title: "Admins", value: users.filter(u => u.role === "admin").length, icon: CheckCircle, color: "#22c55e" },
    { title: "Utilisateurs", value: users.filter(u => u.role === "user").length, icon: Clock, color: "#f59e0b" },
  ];

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
            👥 Utilisateurs
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280", margin: "4px 0 0 0" }}>
            {isAdmin ? "Gérez les comptes utilisateurs" : "Liste des membres"}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "24px" }}>
          {stats.map((stat) => (
            <Card key={stat.title} variant="default" padding="sm">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: stat.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <stat.icon size={20} color={stat.color} />
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937" }}>{stat.value}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{stat.title}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            onClear={() => setSearchTerm("")}
          />
        </div>

        <Card variant="default" padding="none">
          <div style={{ padding: "16px" }}>
            <Table
              columns={columns}
              data={filteredUsers}
              emptyMessage="Aucun utilisateur trouvé"
            />
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", zIndex: 999 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              style={{ background: "#fff", padding: "32px", borderRadius: "16px", maxWidth: "420px", width: "100%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ margin: "0 0 8px 0" }}>{selectedUser.name}</h2>
              <p style={{ color: "#6b7280", marginBottom: "20px" }}>{selectedUser.email}</p>
              <Button variant="outline" onClick={() => setShowModal(false)} fullWidth>Fermer</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}

export default Users;