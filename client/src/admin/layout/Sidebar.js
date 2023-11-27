import { Link } from 'react-router-dom';
import { useState } from 'react';

function Sidebar(props) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleProjects = () => {
    setIsProductsOpen(!isProductsOpen);
  }

  return (
    <div className="w-25 bg-light shadow-lg  h-auto">
      <div className="text-white text-xl font-semibold py-3 px-6 mb-3 uppercase">Admin Panel</div>
      <ul className="text-dark">
        <li className="py-2 px-6">
          <Link to="/admin/dashboard" className="text-dark">Dashboard</Link>
        </li>
        <li className="py-2 px-6">
          <div className="d-flex align-items-center justify-content-between cursor-pointer" onClick={toggleProjects}>
            <span className="d-block">Projects</span>
            <i className={`fas fa-chevron-down ${isProductsOpen ? 'custom-rotate' : ''}`} />
          </div>
          <ul className={`text-light ml-2 ${isProductsOpen ? 'd-block' : 'd-none'}`}>
            <li className="py-2">
              <Link to="/admin/products" className="d-block">View All Products</Link>
            </li>
            <li className="py-2">
              <Link to="/admin/product/new" className="d-block">Create New product</Link>
            </li>
          </ul>
        </li>
       
      </ul>
    </div>
  );
}

export default Sidebar;
