import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer fixed bottom-0 left-0 right-0 w-full bg-gray-900 text-white mt-16">
    <footer className="container mx-auto text-sm py-6">
      <div className="flex flex-col items-center justify-center">
        <p className="text-center">&copy; Copyright 2024, Alumni Management with Event Management. All Rights Reserved</p>
      </div>
    </footer>
  </div>

  //   <div className="bg-gray-900 p-6 text-white mt-12">
  //     <div className="container mx-auto text-center">
  //       <div className="flex justify-center space-x-6">
  //         {/* Social Icons */}
  //         {/* <FaFacebookF className="text-xl cursor-pointer hover:text-gray-400" />
  //             <FaTwitter className="text-xl cursor-pointer hover:text-gray-400" />
  //             <FaLinkedinIn className="text-xl cursor-pointer hover:text-gray-400" /> */}
  //       </div>
  //       <p>&copy; 2024 Alumni Management with Event Management.</p>
  //       <p>Godakawela, Sri Lanka</p>
  //     </div>
  //   </div>
);

export default Footer;
