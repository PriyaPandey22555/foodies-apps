import React from 'react';

const Menubar = ({toggleSidebar}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" >
      <div className="container-fluid">
        <button className="btn" id="sidebarToggle" onClick={toggleSidebar}
          style={{background: 'linear-gradient(135deg, #c1121f, #e63946)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '8px'}}>
          <i className="bi bi-list"></i>
        </button>
      </div>
    </nav>
  )
}

export default Menubar;