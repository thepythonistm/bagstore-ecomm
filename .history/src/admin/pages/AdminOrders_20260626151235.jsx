import { useState } from 'react';
import { Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';

const statusFilters = [
  { value: 'all', label: 'Tous' },
  { value: 'nouveau', label: 'Nouveau' },
  { value: 'contacte', label: 'Contacté' },
  { value: 'confirme', label: 'Confirmé' },
  { value: 'livre', label: 'Livré' },
  { value: 'annule', label: 'Annulé' },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'nouveau': return 'status-nouveau';
    case 'contacte': return 'status-contacte';
    case 'confirme': return 'status-confirme';
    case 'livre': return 'status-livre';
    case 'annule': return 'status-annule';
    default: return 'status-nouveau';
  }
};

const getStatusLabel = (status) => {
  const labels = {
    nouveau: 'Nouveau',
    contacte: 'Contacté',
    confirme: 'Confirmé',
    livre: 'Livré',
    annule: 'Annulé',
  };
  return labels[status] || status;
};

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch =
      search === '' ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {statusFilters.map((sf) => (
            <button
              key={sf.value}
              onClick={() => setFilter(sf.value)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: filter === sf.value ? 600 : 400,
                backgroundColor: filter === sf.value ? 'var(--terracotta)' : 'var(--white)',
                color: filter === sf.value ? 'var(--white)' : 'var(--deep-charcoal)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: filter === sf.value ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {sf.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', maxWidth: '300px', width: '100%' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
        </div>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Produit</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{order.id}</td>
                <td style={{ fontWeight: 500 }}>{order.customerName}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{order.productName}</td>
                <td style={{ fontWeight: 600 }}>{formatPrice(order.productPrice)}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      backgroundColor: 'transparent',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                    className={getStatusClass(order.status)}
                  >
                    {statusFilters.filter(s => s.value !== 'all').map((sf) => (
                      <option key={sf.value} value={sf.value}>
                        {sf.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              Aucune commande trouvée
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
