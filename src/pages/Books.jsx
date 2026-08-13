import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Table from '../components/ui/Table';
import SearchBar from '../components/ui/SearchBar';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import { bookService } from '../services/bookService';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { useCartContext } from '../context/CartContext';

function Books() {
  const { addToCart } = useCartContext();
  const { user } = useAuthContext();
const isAdmin = user?.role === 'admin';
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    year: '',
    pages: '',
    status: 'available',
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await bookService.getAll();
      setBooks(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer "${title}" ?`)) return;
    try {
      await bookService.delete(id);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = () => {
    setFormData({ title: '', author: '', description: '', year: '', pages: '', status: 'available' });
    setFormError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      setFormError('Titre et auteur sont obligatoires');
      return;
    }
    try {
      setSaving(true);
      setFormError('');
      await bookService.create({
        ...formData,
        year: formData.year ? Number(formData.year) : null,
        pages: formData.pages ? Number(formData.pages) : null,
      });
      setShowModal(false);
      await loadBooks(); 
    } catch (err) {
      setFormError(err.response?.data?.message || "Erreur lors de l'ajout");
    } finally {
      setSaving(false);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'title', title: 'Titre', sortable: true },
    { key: 'author', title: 'Auteur', sortable: true },
    { key: 'year', title: 'Année', sortable: true },
    {
      key: 'status',
      title: 'Statut',
      render: (row) => (
        <span style={{
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '500',
          background: row.status === 'available' ? '#dcfce7' : '#fef3c7',
          color: row.status === 'available' ? '#166534' : '#92400e',
        }}>
          {row.status === 'available' ? 'Disponible' : 'Emprunté'}
        </span>
      )
    },
    {
  key: 'price',
  title: 'Prix',
  render: (row) => (
    <span style={{ fontWeight: '600', color: '#1f2937' }}>
      {parseFloat(row.price || 0).toFixed(2)} €
    </span>
  )
},
    {
  key: 'actions',
  title: 'Actions',
  render: (row) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button
        onClick={() => console.log('Voir', row)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb' }}
      >
        <Eye size={16} />
      </button>

    
      <button
        onClick={() => addToCart(row)}
        title="Ajouter au panier"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#22c55e' }}
      >
        <ShoppingCart size={16} />
      </button>

      {isAdmin && (
        <>
          <button
            onClick={() => console.log('Éditer', row)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f59e0b' }}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.id, row.title)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
          >
            <Trash2 size={16} />
          </button>
        </>
      )}
    </div>
  )
}
  ];

  if (loading) {
    return (
      <MainLayout>
        <Loader fullScreen text="Chargement des livres..." />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Card>
          <h3 style={{ color: '#ef4444' }}>❌ Erreur</h3>
          <p>{error}</p>
          <Button onClick={loadBooks}>Réessayer</Button>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: 0 }}>📚 Livres</h1>
            <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>
              {filteredBooks.length} livre{filteredBooks.length > 1 ? 's' : ''}
            </p>
          </div>

          
          {isAdmin && (
  <Button
    variant="primary"
    onClick={handleOpenModal}
  >
    <Plus size={16} style={{ marginRight: '4px' }} />
    Ajouter
  </Button>
)}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un livre..."
            onClear={() => setSearchTerm('')}
          />
        </div>

        <Card variant="default" padding="none">
          <div style={{ padding: '16px' }}>
            <Table
              columns={columns}
              data={filteredBooks}
              emptyMessage={searchTerm ? 'Aucun livre ne correspond à la recherche' : 'Aucun livre dans la bibliothèque'}
            />
          </div>
        </Card>
      </motion.div>

      
      <Modal isOpen={showModal} title="Ajouter un livre" onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit} noFooter>
          <Input
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Le Petit Prince"
            required
          />
          <Input
            label="Auteur"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Ex: Antoine de Saint-Exupéry"
            required
          />
          <Input
            label="Année"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            placeholder="Ex: 1943"
          />
          <Input
            label="Nombre de pages"
            name="pages"
            type="number"
            value={formData.pages}
            onChange={handleChange}
            placeholder="Ex: 96"
          />

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>

          {formError && (
            <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>
              ⚠️ {formError}
            </p>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                padding: '8px 20px', borderRadius: '8px', border: '1px solid #e5e7eb',
                background: '#f9fafb', cursor: 'pointer', fontWeight: '500', fontSize: '14px', color: '#374151',
              }}
            >
              Annuler
            </button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Ajout...' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}

export default Books;