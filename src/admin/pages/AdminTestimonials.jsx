import { useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateId } from '../../utils/helpers';
import Modal from '../../components/common/Modal';

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    rating: 5,
    review: '',
  });

  const openAddModal = () => {
    setEditingTestimonial(null);
    setFormData({ name: '', photo: '', rating: 5, review: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      photo: testimonial.photo,
      rating: testimonial.rating,
      review: testimonial.review,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTestimonial) {
      updateTestimonial({
        ...editingTestimonial,
        ...formData,
      });
    } else {
      addTestimonial({
        id: generateId('T'),
        ...formData,
        date: 'Il y a 1 jour',
        isActive: true,
      });
    }

    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({ name: '', photo: '', rating: 5, review: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Ajouter un témoignage
        </button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Nom</th>
              <th>Note</th>
              <th>Avis</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td>
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </td>
                <td style={{ fontWeight: 500 }}>{testimonial.name}</td>
                <td>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        fill={star <= testimonial.rating ? '#D4A853' : 'none'}
                        color="#D4A853"
                      />
                    ))}
                  </div>
                </td>
                <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {testimonial.review}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openEditModal(testimonial)}
                      style={{ color: 'var(--text-muted)', padding: '4px', background: 'none', border: 'none' }}
                      title="Modifier"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Supprimer ce témoignage ?')) {
                          deleteTestimonial(testimonial.id);
                        }
                      }}
                      style={{ color: 'var(--terracotta)', padding: '4px', background: 'none', border: 'none' }}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {testimonials.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: 'var(--text-muted)' }}>Aucun témoignage</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="admin-modal-title">
          {editingTestimonial ? 'Modifier' : 'Ajouter'} un témoignage
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Photo (URL)</label>
            <input
              type="text"
              className="form-input"
              value={formData.photo}
              onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
              placeholder="/images/customer-1.jpg"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Note (1-5)</label>
            <input
              type="number"
              className="form-input"
              min={1}
              max={5}
              value={formData.rating}
              onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Avis</label>
            <textarea
              className="form-input"
              rows={4}
              value={formData.review}
              onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
              required
              style={{ resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {editingTestimonial ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
