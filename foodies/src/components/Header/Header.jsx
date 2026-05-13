import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const images = [
  "https://tse4.mm.bing.net/th/id/OIP.b25Qt96G7aS__6XsqiGOhgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600",
  "https://thumbs.dreamstime.com/b/looking-mouthwatering-visuals-to-elevate-your-website-menu-design-captivating-food-photography-backgrounds-offer-353754786.jpg",
];

const Header = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="header">
      {images.map((img, i) => (
        <div
          key={i}
          className={`header-slide ${i === current ? 'active' : ''}`}
          style={{backgroundImage: `url(${img})`}}
        />
      ))}
      <div className="header-overlay" />
      <div className="header-content container-fluid py-5">
        <h1 className='display-5 fw-bold'>Order your favorite food here</h1>
        <p className='col-md-8 fs-4'>Discover the best food and drinks in Punjab</p>
        <Link to="/explore" className='btn btn-primary'>Explore</Link>
      </div>
    </div>
  )
}

export default Header;