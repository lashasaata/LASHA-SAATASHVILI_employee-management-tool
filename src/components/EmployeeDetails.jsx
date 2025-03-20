import React from "react";

function EmployeeDetails({ employee }) {
  return (
    <div className="employee-details">
      {employee == undefined ? (
        <p>No match found.</p>
      ) : (
        <div className="employee-card">
          <p>
            <strong>Name:</strong> {employee.name}
          </p>
          <p>
            <strong>Department:</strong> {employee.department}
          </p>
          <p>
            <strong>Role:</strong> {employee.role}
          </p>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetails;
