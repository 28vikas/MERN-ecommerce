import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../../utils/auth';
import { toast } from 'react-hot-toast';


const Header = () => {
  
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("User Logout");
      removeAuthToken();
      toast.success("Logout Successfully!", {
        position: 'top-right',
      });
      navigate('/admin/login');
    } catch (error) {
      console.log('Failed to log out:', error.message);
      toast.error("Oops Something went wrong", {error});
    }
  };
  
  

  return (
    <header className="bg-light shadow-lg px-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex items-center">
          <Link to="/">
            <img className='img-fluid' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBzrXRlNAVUW-WZ-C6kSlZCUbFtE-1h2h2iCYM5xScFjJahZ9I9fITKYanVaWa8KMUoYc&usqp=CAU'
             alt="Logo" style={{height: '100px', width:'100px', borderRadius: '50%'}}/>
          </Link>
        </div>
        <div className="">
          <div>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-solid"
            >
              <span className="sr-only">Admin</span>
              <img
                className="img-fluid rounded-circle"
                src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                alt="User profile"
                style={{height: '10px', width: '10px' }}
              />
            </button>
          </div>
          {showProfileDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-circle shadow-lg">
              <div className="py-1 rounded-circle bg-light shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-100 text-left"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
