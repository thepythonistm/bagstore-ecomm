import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateId } from '../../utils/helpers';
import Modal from '../../components/common/Modal';

export default function AdminFAQ() {
  const { faqs, addFaq, updateFaq, deleteFaq } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  const openAddModal = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingFaq) {
      updateFaq({ ...editingFaq, ...formData });
    } else {
      addFaq({
        id: generateId('F'),
        ...formData,
        order: faqs.length + 1,
        isActive: true,
      });
    }

    setIsModalOpen(false);
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Ajouter une FAQ
        </button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>Ordre</th>
              <th>Question</th>
              <th>Réponse</th>
              <th style={{ width: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td>{faq.order}</td>
                <td style={{ fontWeight: 500 }}>{faq.question}</td>
                <td style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {faq.answer}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openEditModal(faq)}
                      style={{ color: 'var(--text-muted)', padding: '4px', background: 'none', border: 'none' }}
                      title="Modifier"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Supprimer cette FAQ ?')) {
                          deleteFaq(faq.id);
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

        {faqs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: 'var(--text-muted)' }}>Aucune FAQ</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="admin-modal-title">
          {editingFaq ? 'Modifier' : 'Ajouter'} une FAQ
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Question</label>
            <input
              type="text"
              className="form-input"
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Réponse</label>
            <textarea
              className="form-input"
              rows={5}
              value={formData.answer}
              onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
              required
              style={{ resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {editingFaq ? 'Enregistrer' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
