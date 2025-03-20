import React, { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import AddEmployeeForm from "./components/AddEmployeeForm";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const savedEmployees = localStorage.getItem("employees");

    if (savedEmployees) {
      // If localStorage has data, use it as the primary source
      setEmployees(JSON.parse(savedEmployees));
      setDataLoaded(true);
    } else {
      // If no localStorage data, fetch from the JSON file
      fetch("/employees.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setEmployees(jsonData);
          // Store initial data in localStorage
          localStorage.setItem("employees", JSON.stringify(jsonData));
          setDataLoaded(true);
        })
        .catch((error) => {
          console.error("Error loading employees:", error);
          setDataLoaded(true); // Set to true even on error to prevent infinite loading state
        });
    }
  }, []);

  // Updates localStorage whenever employees change
  useEffect(() => {
    if (dataLoaded && employees.length > 0) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees, dataLoaded]);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setMode("list");
  };

  const handleSearch = () => {
    const foundEmployee = employees.find(
      (emp) => emp.name.toLowerCase() === searchTerm.toLowerCase()
    );
    setSearchResult(foundEmployee);
  };

  const sortedEmployees = [...employees].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredEmployees = employees.filter((emp) =>
    emp.department.toLowerCase().includes(filterDepartment.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        <h1>Employee Management Tool</h1>
        <div className="controls">
          <button onClick={() => setMode("list")}>List</button>
          <button onClick={() => setMode("sort")}>Sort</button>
          <button onClick={() => setMode("filter")}>
            Filter by Department
          </button>
          <button onClick={() => setMode("search")}>Search</button>
          <button onClick={() => setMode("add")}>Add New Employee</button>
        </div>
      </header>
      <main>
        {mode === "list" && (
          <div className="employee-list">
            <EmployeeList employees={employees} />
          </div>
        )}
        {mode === "sort" && (
          <div className="employee-list">
            <EmployeeList employees={sortedEmployees} />
          </div>
        )}
        {mode === "filter" && (
          <div className="filter-section">
            <input
              type="text"
              placeholder="Enter department"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            />
            <div className="employee-list">
              <EmployeeList employees={filteredEmployees} />
            </div>
          </div>
        )}
        {mode === "search" && (
          <div className="search-section">
            <input
              type="text"
              placeholder="Enter name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searchResult !== null ? (
              <EmployeeDetails employee={searchResult} />
            ) : (
              ""
            )}
          </div>
        )}
        {mode === "add" && <AddEmployeeForm onAdd={handleAddEmployee} />}
      </main>
    </div>
  );
}

export default App;
