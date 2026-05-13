import React from 'react';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';
import './FoodItem.css';

const FoodItem = ({name, description, id, imageUrl, price}) => {
  const {increaseQty, decreaseQty, quantities} = useContext(StoreContext);
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div className="food-card card">
        <Link to={`/food/${id}`}>
          <img src={imageUrl} className="card-img-top food-card-img" alt="Product Image"/>
        </Link>
        <div className="card-body food-card-body">
          <h6 className="card-title food-card-title">{name}</h6>
          <p className="card-text food-card-desc">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="food-card-price">₹{price}</span>
            <span className="food-card-stars">
              ★★★★½ <small>(4.5)</small>
            </span>
          </div>
        </div>
        <div className="card-footer food-card-footer">
          <Link className="btn btn-sm food-btn-view" to={`/food/${id}`}>View</Link>
          {quantities[id] > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-sm food-btn-minus" onClick={() => decreaseQty(id)}>−</button>
              <span className="fw-bold">{quantities[id]}</span>
              <button className="btn btn-sm food-btn-add" onClick={() => increaseQty(id)}>+</button>
            </div>
          ) : (
            <button className="btn btn-sm food-btn-add" onClick={() => increaseQty(id)}>+ Add</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodItem;