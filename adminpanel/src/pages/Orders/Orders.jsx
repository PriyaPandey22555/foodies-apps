import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:8080/api/orders/all');
    setData(response.data);
  }

  const updateStatus = async (event, orderId) => {
    const response = await axios.patch(`http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`);
    if (response.status === 200) {
      await fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const floatingFoods = [
    {emoji: '📦', top: '12px', left: '10%', fontSize: '28px', delay: '0s'},
    {emoji: '🛵', top: '8px', left: '28%', fontSize: '22px', delay: '0.4s'},
    {emoji: '🍕', top: '14px', right: '28%', fontSize: '26px', delay: '0.8s'},
    {emoji: '🍔', top: '10px', right: '10%', fontSize: '24px', delay: '1.2s'},
    {emoji: '✅', bottom: '12px', left: '18%', fontSize: '20px', delay: '0.6s'},
    {emoji: '🍜', bottom: '10px', right: '18%', fontSize: '22px', delay: '1s'},
    {emoji: '🛍️', bottom: '14px', left: '42%', fontSize: '18px', delay: '1.4s'},
  ];

  const getStatusStyle = (status) => {
    if (status?.trim() === 'Delivered') return {background: '#eaf3de', color: '#3b6d11', border: '0.5px solid #97c459'};
    if (status === 'Out for delivery') return {background: '#e6f1fb', color: '#185fa5', border: '0.5px solid #85b7eb'};
    return {background: '#fff3e0', color: '#854f0b', border: '0.5px solid #fac775'};
  }

  return (
    <div style={{fontFamily: "'DM Sans', sans-serif", padding: '2rem 1rem', minHeight: '100vh', background: '#f1f1f1'}}>
      <div style={{background: 'white', borderRadius: '20px', border: '0.5px solid #e9ecef', overflow: 'hidden', maxWidth: '900px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>

        {/* Animated Header */}
        <div style={{background: 'linear-gradient(135deg, #c1121f 0%, #e63946 60%, #ff6b6b 100%)', padding: '2rem', position: 'relative', overflow: 'hidden', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
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
            <h2 style={{fontSize: '28px', fontWeight: '700', color: 'white', margin: '0', fontFamily: 'Georgia, serif'}}>Orders 🛵</h2>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '6px 0 0'}}>Track and manage all customer orders</p>
          </div>
        </div>

        {/* Orders List */}
        <div style={{padding: '1.5rem 2rem'}}>
          {data.map((order, index) => (
            <div key={index} style={{background: 'white', border: '0.5px solid #e9ecef', borderRadius: '12px', padding: '14px 16px', marginBottom: '10px', display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: '14px', alignItems: 'center'}}>
              
              {/* Parcel Icon */}
              <div style={{width: '44px', height: '44px', borderRadius: '8px', background: '#fff8e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'}}>📦</div>

              {/* Order Info */}
              <div>
                <div style={{fontSize: '13px', fontWeight: '500', color: '#1a1a1a', marginBottom: '3px'}}>
                  {order.orderedItems?.map((item, i) => (
                    i === order.orderedItems.length - 1 ? item.name + ' x' + item.quantity : item.name + ' x' + item.quantity + ', '
                  ))}
                </div>
                <div style={{fontSize: '12px', color: '#6c757d', marginBottom: '6px'}}>{order.userAddress}</div>
                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                  <span style={{fontSize: '14px', fontWeight: '500', color: '#1a1a1a'}}>₹{order.amount.toFixed(2)}</span>
                  <span style={{fontSize: '12px', color: '#6c757d'}}>Items: {order.orderedItems?.length}</span>
                  <span style={{display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '500', ...getStatusStyle(order.orderStatus)}}>{order.orderStatus}</span>
                </div>
              </div>

              {/* Status Dropdown */}
              <select onChange={(e) => updateStatus(e, order.id)} value={order.orderStatus}
                style={{padding: '8px 12px', borderRadius: '8px', border: '0.5px solid #dee2e6', fontSize: '12px', background: 'white', cursor: 'pointer', outline: 'none'}}>
                <option value="Food Preparing">Food Preparing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders;