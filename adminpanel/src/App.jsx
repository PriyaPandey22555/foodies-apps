
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListFood from './pages/ListFood/ListFood';
import Sidebar from './components/Sidebar/Sidebar';
import Menubar from './components/Menubar/Menubar';
import AddFood from './pages/AddFood/AddFood';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
   const [SidebarVisible, setSidebarVisible] = useState(true);
   const toggleSidebar = () =>{
    setSidebarVisible(!SidebarVisible);
   }
  return (
    <div className="d-flex" id="wrapper">
            {/* <!-- Sidebar--> */}
            
            <Sidebar  SidebarVisible={SidebarVisible}/>
            {/* <!-- Page content wrapper--> */}
            <div id="page-content-wrapper">
                {/* <!-- Top navigation--> */}
                 <Menubar toggleSidebar={toggleSidebar} />
                 <ToastContainer />
                {/* <!-- Page content--> */}
                <div className="container-fluid">
                     <Routes>
                        <Route   path='/add' element={<AddFood />} />
                        <Route   path='/list' element={<ListFood />} />
                        <Route   path='/orders' element={<Orders />} />
                        
                       <Route path='/' element={<Dashboard />} />
                     </Routes>
                </div>
            </div>
        </div>
  )
}

export default App;