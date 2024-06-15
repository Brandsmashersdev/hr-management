import React from "react";
import Layout from "../HR-Layout";

const Salary = () => {
  return (
    <Layout>

      <div className="salary-table-adjusting">
        <table className="salary-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>No. of Leaves</th>
              <th>No. of Working Days</th>
              <th>Salary</th>
              <th>Slip</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>2024-06-01</td>
              <td>2</td>
              <td>20</td>
              <td>3000</td>
              <td><button className="button">Slip</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>2024-06-01</td>
              <td>1</td>
              <td>21</td>
              <td>3200</td>
              <td><button className="button">Slip</button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Alice Johnson</td>
              <td>2024-06-01</td>
              <td>3</td>
              <td>19</td>
              <td>2800</td>
              <td><button className="button">Slip</button></td>
            </tr>
          </tbody>
        </table>
      </div>

    </Layout>
  );
}
export default Salary;