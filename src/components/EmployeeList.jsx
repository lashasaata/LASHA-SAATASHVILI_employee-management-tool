import React from 'react';

function EmployeeList({ employees }) {
  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div>
      {employees.map((emp, index) => (
        <div key={index} className="employee-card">
          <p><strong>Name:</strong> {emp.name}</p>
          <p><strong>Department:</strong> {emp.department}</p>
          <p><strong>Role:</strong> {emp.role}</p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;