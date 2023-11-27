import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-light">
          &copy; {new Date().getFullYear()} All Right Reserved Shopee
        </p>
      </div>
    </footer>
  );
};

export default Footer;
