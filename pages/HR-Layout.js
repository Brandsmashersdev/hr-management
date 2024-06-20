import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../pages/NavBar';
import { useRouter } from 'next/router';


const Layout = ({ children }) => {
  const [expandedOption, setExpandedOption] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = (option) => {
    setExpandedOption(expandedOption === option ? null : option);
  };

  const [activeItem, setActiveItem] = useState(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const handleClick = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };
  const router = useRouter();
  const handleLogout = async () => {
        await fetch('/api/logout', {
            method: 'POST',
        });

        router.push('/login');
    };

  return (
    <>
      {/* <Navbar /> */}
      <div className="navbar">
      <div>
      {/* logo */}
      <h3>HR Dashboard</h3>
      </div>
      
      <div className="menu-icon" onClick={handleSidebarToggle}>
          &#9776;
        </div>

     </div>


      <div style={{ display: 'flex', minHeight: '100vh'}}>
        <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
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
                  <li><Link href="/HR-dashboard/Profile">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                  View profile</Link></li>
                  <li><Link href="/HR-dashboard/stats">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                    Stats</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 2 ? 'active' : ''} onClick={() => handleClick(2)}>
              <div onClick={() => handleToggle('employees')}>
              <Image 
                src={"/img/sidbarIcons/employee.png"}
                width={22}
                height={22}
                className='sidebar-icon'
                />
                Employees
              </div>
              {expandedOption === 'employees' && (
                <ul className='nested-list'>
                  <li><Link href="/HR-dashboard/Employees">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                    All employees</Link></li>
                  <li><Link href="/HR-dashboard/AddEmployee">   
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                  Add Employee</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 3 ? 'active' : ''} onClick={() => handleClick(3)}>
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
                  <li><Link href="/HR-dashboard/EmployeeAttendance">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                  Attendance Records</Link></li>
                  <li><Link href="/HR-dashboard/working-hour">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                    Working hour</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 4 ? 'active' : ''} onClick={() => handleClick(4)}>
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
                  <li><Link href="/HR-dashboard/Payslip">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                    Payslip</Link></li>
                  <li><Link href="/HR-dashboard/Salary">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                    Salary</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 5 ? 'active' : ''} onClick={() => handleClick(5)}>
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
                  <li><Link href="/HR-dashboard/Current-projects">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                    Current projects</Link></li>
                  <li><Link href="/HR-dashboard/CompletedProjects">
                  <Image 
                    src={"/img/sidbarIcons/right.png"}
                    width={15}
                    height={15}
                    className='sidebar-icon'
                    style={{filter:"none"}}
                  />
                    Completed projects</Link></li>
                </ul>
              )}
            </li>
            <li className={activeItem === 7 ? 'active' : ''} onClick={() => handleClick(7)}>
              <div onClick={() => handleToggle('logout')}>
              <Image 
                src={"/img/sidbarIcons/logout.png"}
                width={22}
                height={22}
                className='sidebar-icon'
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