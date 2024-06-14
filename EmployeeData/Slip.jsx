
import React from 'react';

const Slip  = ({ employee }) => {
    if (!employee) return null;

    return (
       
        <div className="container">
        <div className="box" style={{display: 'flex', flexDirection: 'column'}}>
            <h2 className="company-color">Company Name</h2>
            <div className="line1"></div>
            
            <h2>Salary Slip</h2>
            <div className="line2"></div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            

            <div style={{textAlign: 'left'}}>
                    <h3>Employee ID:</h3>
                    <h3>Employee Name:</h3>
                    <h3>Date:</h3>
                </div>

                <div style={{textAlign: 'left'}}    >
                   
                    <h3>Working Days: </h3>
                    <h3>No. of Leaves: </h3>
                    <h3>Total Salary: </h3>

                </div>
                </div>
               




    <table className="table-styling">
    <thead>
        <tr>
            <th>Earnings</th>
            <th>Amount</th>
            <th>Deductions</th>
            <th>Amount</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Basic Earnings</td>
            <td>$1000</td>
            <td>Deduction </td>
            <td>$50</td>
        </tr>
        <tr>
            <td>Overtime Pay</td>
            <td>$200</td>
            <td>Deduction </td>
            <td>$30</td>
        </tr>
        <tr>
            <td colspan="2"><strong>Total Earnings</strong></td>
            <td colspan="2"><strong>Total Deductions</strong></td>
        </tr>
      
        <tr>
            <td colspan="4"><strong>Net Amount</strong></td>

        </tr>
    </tbody>
</table>

  <span> <button style ={{}}> Download</button></span>

  </div>           
  </div>
    );
}
export default Slip;