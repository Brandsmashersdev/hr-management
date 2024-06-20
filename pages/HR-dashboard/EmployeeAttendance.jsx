import { useEffect, useState } from 'react';
import Layout from '../HR-Layout'; 
import { db } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const EmployeeAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [holidays, setHolidays] = useState([1, 8, 15]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDateHeaders = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const headers = [];
    for (let day = 1; day <= totalDays; day++) {
      headers.push(<th key={day} className="day-column">{day}</th>);
    }
    return headers;
  };

  useEffect(() => {
    const fetchWorkingHours = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'WorkingHour'));
        const employeeData = [];

        querySnapshot.forEach(doc => {
          const data = doc.data();
          employeeData.push({
            id: data.employeeId,
            name: data.employeeName,
            hours: data.hours,
            leaveDays: data.leaveDays,
          });
        });

        setEmployees(employeeData);
      } catch (error) {
        console.error("Error fetching working hours: ", error);
      }
    };

    fetchWorkingHours();
  }, []);

  console.log(employees.hours)

  return (
    <Layout>
      <div>
        <div className="Attendance-styling">Attendance List</div>
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th className="style">Employee ID</th>
                <th className="style">Employee Name</th>
                {generateDateHeaders()}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  {Array.from({ length: daysInMonth(currentMonth, currentYear) }).map((_, index) => {
                    const day = index + 1;
                    let attendanceMark;

                    if (holidays.includes(day)) {
                      attendanceMark = <span className="holiday">H</span>;
                    // } else if (employee.leaveDays.includes(day)) {
                    //   attendanceMark = <span className="leave">L</span>;
                    } else {
                      const hoursWorked = employees.hours; // Assuming hours are stored for each day
                      attendanceMark = hoursWorked >= 4.5 ? <span className="present">P</span> : <span className="absent">A</span>;
                    }
                    return <td key={index}>{attendanceMark}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeAttendance;
