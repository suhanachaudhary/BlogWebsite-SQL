
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{textAlign:"center",fontSize:"16px",backgroundColor:"#b9e7e7"}}>
      <h3>Blogger</h3>
      <p style={{textAlign:"center"}}>© {new Date().getFullYear()} Blogger. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
