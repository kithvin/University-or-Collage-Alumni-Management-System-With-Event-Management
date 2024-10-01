import './header.scss';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaBars, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      {' '}
      {/* Add container class here */}
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar data-cy="navbar" dark expand="md" fixed="top" className="!bg-gray-900">
          <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
          <Brand />
          <Collapse isOpen={menuOpen} navbar>
            <Nav id="header-tabs" className="ms-auto" navbar style={{ fontSize: '18px' }}>
              {!props.isAuthenticated && <Home />}

              {props.isAuthenticated && <EntitiesMenu />}
              {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
              <AccountMenu isAuthenticated={props.isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
    //
    // //     <div id="app-header">
    // //       <LoadingBar className="loading-bar" />
    // //       <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar">
    // //         <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
    // //         <Brand />
    // //         <Collapse isOpen={menuOpen} navbar>
    // //           <Nav id="header-tabs" className="ms-auto" navbar>
    // //             <Home />
    // //             {props.isAuthenticated && <EntitiesMenu />}
    // //             {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
    // //             <AccountMenu isAuthenticated={props.isAuthenticated} />
    // //           </Nav>
    // //         </Collapse>
    // //       </Navbar>
    //
    // <div id="app-header">
    // <Navbar data-cy="navbar" dark expand="md" fixed="top" className="jh-navbar !bg-gray-900 !p-6">
    //       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
    //         {/* Sidebar Toggle Icon */}
    //         <div className="text-white cursor-pointer" onClick={toggleSidebar}>
    //           <FaBars className="text-2xl" />
    //         </div>
    //
    //         {/* Centered Text and Icon */}
    //         <div className="relative flex h-16 items-center justify-between">
    //           <FaCalendarAlt className="text-white text-2xl mr-4" />
    //           <div className="text-white text-xl">
    //             Alumni Management with Event Management
    //           </div>
    //            <div className="text-white text-xl ms-auto">
    //               <Home />
    //           </div>
    //            <div className="text-white text-xl ms-auto">
    //               {props.isAuthenticated && <EntitiesMenu />}
    //            </div>
    //             <div className="text-white text-xl ms-auto">
    //               {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
    //             </div>
    //             <div className="text-white text-xl ms-auto">
    //                <AccountMenu isAuthenticated={props.isAuthenticated} />
    //             </div>
    //
    //         </div>
    //       </div>
    //
    //       {/* Sidebar */}
    //       {isSidebarOpen && (
    //         <>
    //           {/* Sidebar Content */}
    //           <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 shadow-lg z-50">
    //             <div className="p-4 text-white">
    //               <br />
    //               <div className="flex justify-between items-center">
    //                 <h2 className="text-xl font-bold">AMSEM</h2>
    //                 <FaTimes className="text-2xl cursor-pointer" onClick={toggleSidebar} />
    //               </div>
    //               <br />
    //               <ul className="space-y-4 mt-4">
    //                 {/* Add your existing sidebar links */}
    //                 {/* Example */}
    //                 <li>
    //                   <Link to="/VolunteerOPadmin" className="hover:text-gray-400">
    //                     Volunteer Opportunity (Admin)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/VolunteerOPuser" className="hover:text-gray-400">
    //                     Volunteer Opportunity (User)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/AdminNews" className="hover:text-gray-400">
    //                     News and Updates (Admin)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/UserNews" className="hover:text-gray-400">
    //                     News and Updates (User)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/Adminevent" className="hover:text-gray-400">
    //                     Event Management (Admin)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/Userevent" className="hover:text-gray-400">
    //                     Event Management (User)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/UpcomingProgramme" className="hover:text-gray-400">
    //                     Monitor Programme
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/Jobadmin" className="hover:text-gray-400">
    //                     Job Board (Admin)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/JobUser" className="hover:text-gray-400">
    //                     Job Board (User)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/AlumniReport" className="hover:text-gray-400">
    //                     Alumni Report
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/Donationadmin" className="hover:text-gray-400">
    //                     Alumni Donation (Admin)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/Donationuser" className="hover:text-gray-400">
    //                     Alumni Donation (User)
    //                   </Link>
    //                 </li>
    //                 <li>
    //                   <Link to="/Profile" className="hover:text-gray-400">
    //                     Profile
    //                   </Link>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //
    //           {/* Overlay to close sidebar when clicking outside */}
    //           <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>
    //         </>
    //       )}
    //  </Navbar>
    //
    // </div>
  );
};

export default Header;
