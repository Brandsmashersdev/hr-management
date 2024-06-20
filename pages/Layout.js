import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../pages/NavBar';
import {auth} from './firebaseConfig';
import { signOut } from 'firebase/auth';

const Layout = ({ children}) => {
  const [expandedOption, setExpandedOption] = useState(null);

  const handleToggle = (option) => {
    setExpandedOption(expandedOption === option ? null : option);
  };

  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };
  const Handlelogout = async () => {
    try {
      await signOut(auth); 
      sessionStorage.removeItem('user'); 
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', minHeight: '100vh'}}>
        <nav className='sidebar'>
          <div className='HRMS'>
            <h2>HRMS</h2>
            </div>
          <ul className='sidebar-list'>
            <li className={activeItem === 1 ? 'active' : ''} onClick={() => handleClick(1)}>
              <div onClick={() => handleToggle('profile')}>
                <Image 
                src={"/img/sidbarIcons/user.png"}
                width={22}
                height={22}
                className='sidebar-icon'
                alt="Error"
                />
                Profile
              </div>
              {expandedOption === 'profile' && (
                <ul className='nested-list'>
                  <li><Link href={`/Employee-dashboard/${username}/profile`}>View profile</Link></li>
                  <li><Link href="/HR-dashboard/stats">Stats</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 2 ? 'active' : ''} onClick={() => handleClick(2)}>
              <div onClick={() => handleToggle('attendance')}>
              <Image 
                src={"/img/sidbarIcons/attendance.png"}
                width={22}
                height={22}
                alt='Error'
                className='sidebar-icon'
                />
                Attendance
              </div>
              {expandedOption === 'attendance' && (
                <ul className='nested-list'>
                  <li><Link href="/HR-dashboard/attendance-record">Attendance Records</Link></li>
                  <li><Link href="/HR-dashboard/working-hour">Working hour</Link></li>
                  <li><Link href="/HR-dashboard/leave_request">Leave Request</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 3 ? 'active' : ''} onClick={() => handleClick(3)}>
              <div onClick={() => handleToggle('payrolls')}>
              <Image 
                alt='error'
                src={"/img/sidbarIcons/salary.png"}
                width={22}
                height={22}
                className='sidebar-icon'
                />
                Payrolls
              </div>
              {expandedOption === 'payrolls' && (
                <ul className='nested-list'>
                  {/* <li><Link href="/Employee-dashboard/Payslip">Payslip</Link></li> */}
                  <li><Link href="/Employee-dashboard/Salary">Salary</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 4 ? 'active' : ''} onClick={() => handleClick(4)}>
              <div onClick={() => handleToggle('project')}>
              <Image 
                src={"/img/sidbarIcons/project.png"}
                width={22}
                height={22}
                className='sidebar-icon'
                alt='Error'
                />
                Projects
              </div>
              {expandedOption === 'project' && (
                <ul className='nested-list'>
                  <li><Link href="/HR-dashboard/current-projects">Current projects</Link></li>
                  <li><Link href="/HR-dashboard/completed-projects">Completed projects</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 5 ? 'active' : '' } >
              <div onClick={Handlelogout} className='logout'>
              <Image 
                src={"/img/sidbarIcons/logout.png"}
                width={22}
                height={22}
                className='sidebar-icon'
                alt='Error'
                />
                Logout
              </div>
            </li>

          </ul>
        </nav>

      <div style={{ flex: 1, padding: '20px', paddingTop: "4rem" }}>
        {children}
      </div>
      </div>
    </>
  );
};

export default Layout;