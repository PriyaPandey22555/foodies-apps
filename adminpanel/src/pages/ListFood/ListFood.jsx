import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ListFood.css';
import { deleteFood, getFoodList } from '../../services/foodService';

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error('Error while reading the foods.');
    }
  }

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success('Food removed.');
        await fetchList();
      } else {
        toast.error('Error occured while removing the food.');
      }
    } catch (error) {
      toast.error('Error occured while removing the food.');
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const floatingFoods = [
    {emoji: '🍕', top: '12px', left: '10%', fontSize: '28px', delay: '0s'},
    {emoji: '🍔', top: '8px', left: '28%', fontSize: '22px', delay: '0.4s'},
    {emoji: '🍜', top: '14px', right: '28%', fontSize: '26px', delay: '0.8s'},
    {emoji: '🍱', top: '10px', right: '10%', fontSize: '24px', delay: '1.2s'},
    {emoji: '🍰', bottom: '12px', left: '18%', fontSize: '20px', delay: '0.6s'},
    {emoji: '🥗', bottom: '10px', right: '18%', fontSize: '22px', delay: '1s'},
    {emoji: '🍣', bottom: '14px', left: '42%', fontSize: '18px', delay: '1.4s'},
  ];

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
            <h2 style={{fontSize: '28px', fontWeight: '700', color: 'white', margin: '0', fontFamily: 'Georgia, serif'}}>Food List 🍽️</h2>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '6px 0 0'}}>Manage all your delicious dishes here</p>
          </div>
        </div>

        {/* Table */}
        <div style={{padding: '1.5rem 2rem'}}>
          {/* Header Row */}
          <div style={{display: 'grid', gridTemplateColumns: '60px 1fr 130px 100px 60px', gap: '12px', padding: '10px 16px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '8px'}}>
            {['Image', 'Name', 'Category', 'Price', 'Action'].map(h => (
              <span key={h} style={{fontSize: '11px', fontWeight: '500', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em'}}>{h}</span>
            ))}
          </div>

          {/* Food Rows */}
          {list.map((item, index) => (
            <div key={index} style={{display: 'grid', gridTemplateColumns: '60px 1fr 130px 100px 60px', gap: '12px', padding: '12px 16px', background: 'white', border: '0.5px solid #e9ecef', borderRadius: '10px', marginBottom: '6px', alignItems: 'center'}}>
              <img src={item.imageUrl} alt="" style={{width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover'}} />
              <span style={{fontSize: '14px', fontWeight: '500', color: '#1a1a1a'}}>{item.name}</span>
              <span style={{display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', background: '#fff0f0', color: '#a32d2d', border: '0.5px solid #f09595'}}>{item.category}</span>
              <span style={{fontSize: '14px', fontWeight: '500', color: '#1a1a1a'}}>₹{item.price}.00</span>
              <div onClick={() => removeFood(item.id)}
                style={{width: '28px', height: '28px', borderRadius: '50%', background: '#fff0f0', border: '0.5px solid #f09595', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#a32d2d', fontSize: '14px'}}>
                ✕
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListFood;