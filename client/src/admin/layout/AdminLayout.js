import React, { Children } from 'react';

import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import { Helmet } from 'react-helmet';

function AdminLayout({
  children,
  title,
  description,
  keywords,
  author
}) {
  return (
    <div className="container-fluid">
      <Helmet>
        <meta charSet='utf-8'/>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      
        <Header />
        <div className="d-flex justify-content-between">
          <Sidebar />
          <main className="col-md-9 col-lg-10 px-4 py-4" style={{minHeight: '70vh'}}>{children}</main>
        </div>
        <Footer />
      
    </div>
  );
}

AdminLayout.defaultProps = {
  title: "Mern Ecommerce",
  description: "A Fully Functional Ecommerce Website",
  keywords: "Freelancer, Web-developer, Full-Stack developer",
  author: "Admin"
}

export default AdminLayout;
