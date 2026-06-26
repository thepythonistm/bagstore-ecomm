import { useState } from 'react';
import { Pencil, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';
import Modal from '../../components/common/Modal';

export default function AdminProducts() {
  const { products, updateProduct } = useApp();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    price: 0,
    discountPrice: 0,
    category: '',
    stock: 0,
    isActive: true,
  });

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.slug,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      price: product.price,
      discountPrice: product.discountPrice,
      category: product.category,
      stock: product.stock,
      isActive: product.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct({
      ...editingProduct,
      ...formData,
      updatedAt: new Date().toISOString(),
    });
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleActive = (product) => {
    updateProduct({
      ...product,
      isActive: !product.isActive,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div>
      <div className="admin-table-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '18px', color: 'var(--deep-charcoal)' }}>
            Liste des Produits
          </h2>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Titre</th>
              <th>Prix</th>
              <th>Prix Réduit</th>
              <th>Stock</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.images.find(img => img.isFeatured)?.url || product.images[0]?.url}
                    alt={product.title}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                </td>
                <td style={{ fontWeight: 500 }}>{product.title}</td>
                <td style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>{formatPrice(product.price)}</td>
                <td style={{ fontWeight: 600, color: 'var(--terracotta)' }}>{formatPrice(product.discountPrice)}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-badge ${product.isActive ? 'status-confirme' : 'status-annule'}`}>
                    {product.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleActive(product)}
                      style={{ color: 'var(--text-muted)', padding: '4px', background: 'none', border: 'none' }}
                      title={product.isActive ? 'Désactiver' : 'Activer'}
                    >
                      {product.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => openEditModal(product)}
                      style={{ color: 'var(--text-muted)', padding: '4px', background: 'none', border: 'none' }}
                      title="Modifier"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}>
        <h2 className="admin-modal-title">Modifier le Produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Titre</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description courte</label>
            <input
              type="text"
              className="form-input"
              value={formData.shortDescription}
              onChange={(e) => handleChange('shortDescription', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description complète</label>
            <textarea
              className="form-input"
              rows={4}
              value={formData.fullDescription}
              onChange={(e) => handleChange('fullDescription', e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Prix (DH)</label>
              <input
                type="number"
                className="form-input"
                value={formData.price}
                onChange={(e) => handleChange('price', Number(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Prix réduit (DH)</label>
              <input
                type="number"
                className="form-input"
                value={formData.discountPrice}
                onChange={(e) => handleChange('discountPrice', Number(e.target.value))}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Catégorie</label>
              <input
                type="text"
                className="form-input"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-input"
                value={formData.stock}
                onChange={(e) => handleChange('stock', Number(e.target.value))}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => { setIsModalOpen(false); setEditingProduct(null); }}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
