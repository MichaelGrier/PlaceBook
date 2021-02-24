import React from 'react';

import './Footer.css';

const Footer = (props) => {
  return (
    <footer className="footer">
      <p className="footer-text">{props.children}</p>
    </footer>
  );
};

export default Footer;
