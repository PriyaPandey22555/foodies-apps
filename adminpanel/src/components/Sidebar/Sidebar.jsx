import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = ({ SidebarVisible }) => {
  return (
    <div
      className={`${SidebarVisible ? "" : "d-none"}`}
      id="sidebar-wrapper"
      style={{
        background: "white",
        borderRight: "0.5px solid #e9ecef",
        minHeight: "100vh",
      }}
    >
      {/* Logo Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #c1121f, #e63946)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={assets.logo}
          alt=""
          height={40}
          width={40}
          style={{ borderRadius: "8px" }}
        />
        <span style={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
          Foodies
        </span>
      </div>

      {/* Links */}
      <div className="list-group list-group-flush" style={{ marginTop: "8px" }}>
        <Link
          className="list-group-item list-group-item-action p-3"
          to="/"
          style={{
            border: "none",
            borderLeft: "3px solid transparent",
            color: "#2d2d2d",
            fontWeight: "500",
          }}
        >
          <i
            className="bi bi-speedometer2 me-2"
            style={{ color: "#e63946" }}
          ></i>{" "}
          Dashboard
        </Link>
        <Link
          className="list-group-item list-group-item-action p-3"
          to="/add"
          style={{
            border: "none",
            borderLeft: "3px solid transparent",
            color: "#2d2d2d",
            fontWeight: "500",
          }}
        >
          <i
            className="bi bi-plus-circle me-2"
            style={{ color: "#e63946" }}
          ></i>{" "}
          Add Food
        </Link>
        <Link
          className="list-group-item list-group-item-action p-3"
          to="/list"
          style={{
            border: "none",
            borderLeft: "3px solid transparent",
            color: "#2d2d2d",
            fontWeight: "500",
          }}
        >
          <i className="bi bi-list-ul me-2" style={{ color: "#e63946" }}></i>{" "}
          List Food
        </Link>
        <Link
          className="list-group-item list-group-item-action p-3"
          to="/orders"
          style={{
            border: "none",
            borderLeft: "3px solid transparent",
            color: "#2d2d2d",
            fontWeight: "500",
          }}
        >
          <i className="bi bi-cart me-2" style={{ color: "#e63946" }}></i>{" "}
          Orders
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
