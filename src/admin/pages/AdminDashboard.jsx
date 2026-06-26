import { TrendingUp, ShoppingBag, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../utils/helpers';

export default function AdminDashboard() {
  const { getStats, orders } = useApp();
  const stats = getStats();

  const statCards = [
    {
      label: 'Total Commandes',
      value: stats.totalOrders,
      icon: ShoppingBag,
      trend: '+12%',
    },
    {
      label: "Aujourd'hui",
      value: stats.todayOrders,
      icon: Clock,
      trend: null,
    },
    {
      label: 'Cette Semaine',
      value: stats.weekOrders,
      icon: TrendingUp,
      trend: '+8%',
    },
    {
      label: 'Ce Mois',
      value: stats.monthOrders,
      icon: TrendingUp,
      trend: '+15%',
    },
  ];

  const recentOrders = orders.slice(0, 5);

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

  return (
    <div>
      <div className="admin-stats-grid">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="admin-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <Icon size={24} style={{ color: 'var(--terracotta)' }} />
                {stat.trend && (
                  <span className="admin-stat-trend">
                    <TrendingUp size={14} />
                    {stat.trend}
                  </span>
                )}
              </div>
              <div className="admin-stat-value">{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="admin-table-card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '18px',
              color: 'var(--deep-charcoal)',
            }}
          >
            Commandes Récentes
          </h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Produit</th>
              <th>Prix</th>
              <th>Statut</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '13px' }}>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.phone}</td>
                <td>{order.productName}</td>
                <td style={{ fontWeight: 600 }}>{formatPrice(order.productPrice)}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
