import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFoods: 0,
    totalOrders: 0,
    delivered: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [categoryCount, setCategoryCount] = useState({});

  const fetchStats = async () => {
    try {
      const [foods, orders, delivered, revenue, categories, allOrders] = await Promise.all([
        axios.get('http://localhost:8080/api/foods/count'),
        axios.get('http://localhost:8080/api/orders/count'),
        axios.get('http://localhost:8080/api/orders/delivered/count'),
        axios.get('http://localhost:8080/api/orders/revenue'),
        axios.get('http://localhost:8080/api/foods/category/count'),
        axios.get('http://localhost:8080/api/orders/all'),
      ]);
      setStats({
        totalFoods: foods.data,
        totalOrders: orders.data,
        delivered: delivered.data,
        revenue: revenue.data.toFixed(2),
      });
      setCategoryCount(categories.data);
      setRecentOrders(allOrders.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const floatingFoods = [
    {emoji: '📊', top: '12px', left: '10%', fontSize: '28px', delay: '0s'},
    {emoji: '🍕', top: '8px', left: '28%', fontSize: '22px', delay: '0.4s'},
    {emoji: '🛵', top: '14px', right: '28%', fontSize: '26px', delay: '0.8s'},
    {emoji: '📦', top: '10px', right: '10%', fontSize: '24px', delay: '1.2s'},
    {emoji: '💰', bottom: '12px', left: '18%', fontSize: '20px', delay: '0.6s'},
    {emoji: '🍔', bottom: '10px', right: '18%', fontSize: '22px', delay: '1s'},
    {emoji: '✅', bottom: '14px', left: '42%', fontSize: '18px', delay: '1.4s'},
  ];

  const getStatusStyle = (status) => {
    if (status?.trim() === 'Delivered') return {background: '#eaf3de', color: '#3b6d11', border: '0.5px solid #97c459'};
    if (status === 'Out for delivery') return {background: '#e6f1fb', color: '#185fa5', border: '0.5px solid #85b7eb'};
    return {background: '#fff3e0', color: '#854f0b', border: '0.5px solid #fac775'};
  };

  const statCards = [
    {icon: '🍽️', label: 'Total Foods', value: stats.totalFoods, bg: '#fff0f0'},
    {icon: '📦', label: 'Total Orders', value: stats.totalOrders, bg: '#e6f1fb'},
    {icon: '✅', label: 'Delivered', value: stats.delivered, bg: '#eaf3de'},
    {icon: '💰', label: 'Revenue', value: `₹${stats.revenue}`, bg: '#fff3e0'},
  ];

  const maxCategoryCount = Math.max(...Object.values(categoryCount), 1);

  return (
    <div style={{fontFamily: "'DM Sans', sans-serif", padding: '2rem 1rem', minHeight: '100vh', background: '#f1f1f1'}}>
      <div style={{maxWidth: '900px', margin: '0 auto'}}>

        {/* Animated Header */}
        <div style={{background: 'linear-gradient(135deg, #c1121f 0%, #e63946 60%, #ff6b6b 100%)', padding: '2rem', borderRadius: '20px', position: 'relative', overflow: 'hidden', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '1.5rem'}}>
          {floatingFoods.map((item, i) => (
            <span key={i} style={{
              position: 'absolute',
              top: item.top || 'auto', bottom: item.bottom || 'auto',
              left: item.left || 'auto', right: item.right || 'auto',
              fontSize: item.fontSize,
              animation: 'floatFood 3s ease-in-out infinite',
              animationDelay: item.delay
            }}>{item.emoji}</span>
          ))}
          <div style={{position: 'relative', zIndex: 2}}>
            <h2 style={{fontSize: '28px', fontWeight: '700', color: 'white', margin: '0', fontFamily: 'Georgia, serif'}}>Admin Dashboard 📊</h2>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '6px 0 0'}}>Welcome back! Here's what's happening today.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '1.5rem'}}>
          {statCards.map((card, i) => (
            <div key={i} style={{background: 'white', borderRadius: '12px', border: '0.5px solid #e9ecef', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
              <div style={{width: '36px', height: '36px', borderRadius: '8px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '10px'}}>{card.icon}</div>
              <div style={{fontSize: '11px', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px'}}>{card.label}</div>
              <div style={{fontSize: '22px', fontWeight: '700', color: '#1a1a1a'}}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>

          {/* Recent Orders */}
          <div style={{background: 'white', borderRadius: '12px', border: '0.5px solid #e9ecef', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
            <div style={{fontSize: '13px', fontWeight: '500', color: '#1a1a1a', marginBottom: '12px'}}>Recent Orders</div>
            {recentOrders.map((order, i) => (
              <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < recentOrders.length - 1 ? '0.5px solid #e9ecef' : 'none'}}>
                <div>
                  <div style={{fontSize: '12px', color: '#1a1a1a', fontWeight: '500'}}>
                    {order.orderedItems?.[0]?.name} {order.orderedItems?.length > 1 ? `+${order.orderedItems.length - 1} more` : ''}
                  </div>
                  <div style={{fontSize: '11px', color: '#6c757d'}}>{order.userAddress?.split(',')[0]}</div>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: '12px', fontWeight: '500', color: '#1a1a1a'}}>₹{order.amount?.toFixed(2)}</div>
                  <span style={{display: 'inline-block', padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '500', ...getStatusStyle(order.orderStatus)}}>{order.orderStatus}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Category Count */}
          <div style={{background: 'white', borderRadius: '12px', border: '0.5px solid #e9ecef', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
            <div style={{fontSize: '13px', fontWeight: '500', color: '#1a1a1a', marginBottom: '12px'}}>Food by Category</div>
            {Object.entries(categoryCount).map(([cat, count], i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                <div style={{fontSize: '12px', color: '#6c757d', width: '70px'}}>{cat}</div>
                <div style={{flex: 1, height: '6px', background: '#f1f1f1', borderRadius: '10px', overflow: 'hidden'}}>
                  <div style={{height: '100%', borderRadius: '10px', background: '#e63946', width: `${(count / maxCategoryCount) * 100}%`}}></div>
                </div>
                <div style={{fontSize: '11px', color: '#6c757d', width: '24px', textAlign: 'right'}}>{count}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;