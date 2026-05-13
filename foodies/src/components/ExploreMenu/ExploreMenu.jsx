import { useRef, useEffect, useState } from 'react';
import { categories } from '../../assets/assets';
import './ExploreMenu.css';

const ExploreMenu = ({category, setCategory}) => {
  const menuRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const intervalRef = useRef(null);

  const scrollLeft = () => {
    if(menuRef.current){
      menuRef.current.scrollBy({left: -200, behavior:'smooth'});
    }
  }

  const scrollRight = () => {
    if(menuRef.current){
      menuRef.current.scrollBy({left: 200, behavior:'smooth'});
    }
  }

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      if(menuRef.current){
        const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
        if(scrollLeft + clientWidth >= scrollWidth) {
          menuRef.current.scrollTo({left: 0, behavior: 'smooth'});
        } else {
          menuRef.current.scrollBy({left: 150, behavior: 'smooth'});
        }
      }
    }, 2000);
  }

  const stopAutoScroll = () => {
    if(intervalRef.current){
      clearInterval(intervalRef.current);
    }
  }

  useEffect(() => {
    if(!isSelected){
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [isSelected]);

  const handleCategoryClick = (item) => {
    setCategory(prev => prev === item.category ? 'All' : item.category);
    setIsSelected(true);
    stopAutoScroll();
  }

  return (
    <div className="explore-menu position-relative">
      <h1 className="d-flex align-items-center justify-content-between">Explore Our Menu
        <div className="d-flex">
          <i className='bi bi-arrow-left-circle scroll-icon' onClick={scrollLeft}></i>
          <i className='bi bi-arrow-right-circle scroll-icon' onClick={scrollRight}></i>
        </div>
      </h1>
      <p>Explore curated lists of dishes from top categories</p>
      <div className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list" ref={menuRef}>
        {categories.map((item, index) => (
          <div key={index} className="text-center explore-menu-list-item"
            onClick={() => handleCategoryClick(item)}>
            <img src={item.icon} alt=""
              className={item.category === category ? 'rounded-circle active' : 'rounded-circle'}
              height={128} width={128}/>
            <p className="mt-2 fw-bold">{item.category}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu;