import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="bg-gray-900 p-6 text-white mt-12">
    <div className="container mx-auto text-center">
      <div className="flex justify-center space-x-6">
        {/* Social Icons */}
        {/* <FaFacebookF className="text-xl cursor-pointer hover:text-gray-400" />
            <FaTwitter className="text-xl cursor-pointer hover:text-gray-400" />
            <FaLinkedinIn className="text-xl cursor-pointer hover:text-gray-400" /> */}
      </div>
      <p>&copy; 2024 Alumni Management with Event Management.</p>
      <p>Godakawela, Sri Lanka</p>
    </div>
  </div>
);

export default Footer;
