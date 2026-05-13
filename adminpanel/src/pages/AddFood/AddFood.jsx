import {useState} from 'react'
import {assets} from '../../assets/assets';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';

const AddFood = () => {
  const [image, setImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Biryani');
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Biryani'
  });

  const categories = ['Biryani','Burger','Pizza','Rolls','Noodles','Salad','Cake','Ice Cream'];

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({...data, [name]: value}));
  }

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setData((data) => ({...data, category: cat}));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error('Please select an image.');
      return;
    }
    try {
      await addFood(data, image);
      toast.success('Food added successfully');
      setData({name: '', description: '', category: 'Biryani', price: ''});
      setImage(null);
      setActiveCategory('Biryani');
    } catch (error) {
      toast.error('Error adding Food.');
    }
  }

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
      <div style={{background: 'white', borderRadius: '20px', border: '0.5px solid #e9ecef', overflow: 'hidden', maxWidth: '560px', margin: '0 auto', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>

        {/* Animated Header */}
        <div style={{background: 'linear-gradient(135deg, #c1121f 0%, #e63946 60%, #ff6b6b 100%)', padding: '2rem', position: 'relative', overflow: 'hidden', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>

          {floatingFoods.map((item, i) => (
            <span key={i} style={{
              position: 'absolute',
              top: item.top || 'auto',
              bottom: item.bottom || 'auto',
              left: item.left || 'auto',
              right: item.right || 'auto',
              fontSize: item.fontSize,
              animation: 'floatFood 3s ease-in-out infinite',
              animationDelay: item.delay
            }}>{item.emoji}</span>
          ))}

          <div style={{position: 'relative', zIndex: 2}}>
            <h2 style={{fontSize: '28px', fontWeight: '700', color: 'white', margin: '0', fontFamily: 'Georgia, serif'}}>Add Your Dish ✨</h2>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '6px 0 0'}}>Fill in the details to add a delicious item to the menu</p>
          </div>
        </div>

        {/* Body */}
        <div style={{padding: '1.5rem 2rem 2rem'}}>

          {/* Image Upload */}
          <label htmlFor="image" style={{display: 'block', border: '2px dashed #dee2e6', borderRadius: '14px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', marginBottom: '1.5rem', background: '#f8f9fa'}}>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" style={{height: '100px', borderRadius: '10px', objectFit: 'cover'}} />
            ) : (
              <>
                <div style={{fontSize: '32px', marginBottom: '8px'}}>🍽️</div>
                <div style={{fontSize: '13px', color: '#6c757d'}}>Drop image here or <span style={{color: '#e63946', fontWeight: '500'}}>browse</span></div>
                <div style={{fontSize: '11px', color: '#adb5bd', marginTop: '4px'}}>PNG, JPG up to 5MB</div>
              </>
            )}
          </label>
          <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />

          {/* Name */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{fontSize: '12px', fontWeight: '500', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block'}}>Dish Name</label>
            <input type="text" name="name" placeholder="e.g. Chicken Biryani" value={data.name} onChange={onChangeHandler} required
              style={{width: '100%', padding: '10px 14px', border: '0.5px solid #dee2e6', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', outline: 'none'}} />
          </div>

          {/* Description */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{fontSize: '12px', fontWeight: '500', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block'}}>Description</label>
            <textarea name="description" placeholder="Describe the dish..." value={data.description} onChange={onChangeHandler} required rows={3}
              style={{width: '100%', padding: '10px 14px', border: '0.5px solid #dee2e6', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', outline: 'none', resize: 'vertical'}} />
          </div>

          {/* Category Tags */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{fontSize: '12px', fontWeight: '500', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block'}}>Category</label>
            <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              {categories.map(cat => (
                <span key={cat} onClick={() => handleCategory(cat)}
                  style={{padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', cursor: 'pointer',
                    background: activeCategory === cat ? '#e63946' : '#f8f9fa',
                    color: activeCategory === cat ? 'white' : '#6c757d',
                    border: activeCategory === cat ? '0.5px solid #e63946' : '0.5px solid #dee2e6'}}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{fontSize: '12px', fontWeight: '500', color: '#6c757d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'block'}}>Price</label>
            <div style={{position: 'relative'}}>
              <span style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d', fontSize: '14px'}}>₹</span>
              <input type="number" name="price" placeholder="200" value={data.price} onChange={onChangeHandler}
                style={{width: '100%', padding: '10px 14px 10px 28px', border: '0.5px solid #dee2e6', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box', outline: 'none'}} />
            </div>
          </div>

          {/* Submit Button */}
          <button type="button" onClick={onSubmitHandler}
            style={{width: '100%', padding: '13px', background: 'linear-gradient(135deg, #c1121f, #e63946)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer'}}>
            Save Dish
          </button>

        </div>
      </div>
    </div>
  )
}

export default AddFood;